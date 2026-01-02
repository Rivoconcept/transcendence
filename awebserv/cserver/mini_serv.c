#include <unistd.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <sys/select.h>
#include <errno.h>

// Structure représentant un client connecté
typedef struct s_client {
    int socket_fd;           // Descripteur de la socket du client
    int client_id;           // Identifiant unique du client
    char *buffer;            // Buffer pour stocker les messages incomplets
    int buffer_length;       // Nombre d'octets actuellement dans le buffer
    struct s_client *next;   // Pointeur vers le prochain client
} t_client;

t_client *connected_clients = NULL; // Liste des clients connectés
int next_client_id = 0;             // Compteur pour attribuer des IDs uniques

// Affiche un message d'erreur et quitte
void fatal_error() {
    write(2, "Fatal error\n", 12);
    exit(1);
}

// Affiche un message d'argument incorrect et quitte
void wrong_number_of_arguments() {
    write(2, "Wrong number of arguments\n", 26);
    exit(1);
}

// Ajoute un nouveau client à la liste
t_client *add_new_client(int client_socket_fd)
{
    t_client *new_client = malloc(sizeof(t_client));
    if (!new_client) 
        fatal_error();
    new_client->socket_fd = client_socket_fd;
    new_client->client_id = next_client_id++;
    new_client->buffer = NULL;
    new_client->buffer_length = 0;
    new_client->next = connected_clients;
    connected_clients = new_client;
    return new_client;
}

// Supprime un client de la liste et libère ses ressources
void remove_client(int client_socket_fd)
{
    t_client **current = &connected_clients;
    while (*current)
    {
        if ((*current)->socket_fd == client_socket_fd)
        {
            t_client *to_remove = *current;
            *current = to_remove->next;

            if (to_remove->buffer)
                free(to_remove->buffer);

            close(to_remove->socket_fd);
            free(to_remove);

            return;
        }
        current = &(*current)->next;
    }
}

// Envoie un message à tous les clients sauf "except_client" (NULL = tous)
void send_message_to_all_clients(t_client *except_client, char *message, int length)
{
    t_client *cur = connected_clients;
    while (cur)
    {
        if (cur != except_client)
        {
            if (send(cur->socket_fd, message, length, 0) < 0)
                fatal_error();
        }
        cur = cur->next;
    }
}

// Notifie tous les clients de l'arrivée d'un nouveau client
void broadcast_client_arrival(t_client *new_client)
{
    char msg[128];
    int len = sprintf(msg, "server: client %d just arrived\n", new_client->client_id);
    send_message_to_all_clients(new_client, msg, len);
}

// Notifie tous les clients du départ d'un client
void broadcast_client_departure(t_client *departing_client)
{
    char msg[128];
    int len = sprintf(msg, "server: client %d just left\n", departing_client->client_id);
    send_message_to_all_clients(departing_client, msg, len);
}

// Gère les messages reçus d'un client
void handle_client_message(t_client *client)
{
    char recv_buffer[1024];
    int bytes_received = recv(client->socket_fd, recv_buffer, sizeof(recv_buffer), 0);

    // Si recv retourne 0 => le client a fermé la connexion
    if (bytes_received == 0) {
        broadcast_client_departure(client);
        remove_client(client->socket_fd);
        return;
    }
    // Si erreur temporaire, juste revenir sans déconnecter
    if (bytes_received < 0)
        return;

    // Concatène les données reçues au buffer du client
    char *new_buffer = realloc(client->buffer, client->buffer_length + bytes_received);
    if (!new_buffer) fatal_error();
    memcpy(new_buffer + client->buffer_length, recv_buffer, bytes_received);
    client->buffer = new_buffer;
    client->buffer_length += bytes_received;

    // Traite chaque ligne complète terminée par '\n'
    int processed_index = 0;
    while (processed_index < client->buffer_length) {
        char *newline_pos = memchr(client->buffer + processed_index, '\n',
                                   client->buffer_length - processed_index);
        if (!newline_pos) break;

        int line_length = newline_pos - (client->buffer + processed_index) + 1;

        // Préfixe "client X: " et envoie la ligne à tous les autres clients
        char prefix[64];
        int prefix_len = sprintf(prefix, "client %d: ", client->client_id);
        send_message_to_all_clients(client, prefix, prefix_len);
        send_message_to_all_clients(client, client->buffer + processed_index, line_length);

        processed_index += line_length;
    }

    // Déplace le reste incomplet au début du buffer pour la prochaine lecture
    if (processed_index > 0) {
        int remaining_len = client->buffer_length - processed_index;
        if (remaining_len > 0)
            memmove(client->buffer, client->buffer + processed_index, remaining_len);
        client->buffer_length = remaining_len;
        client->buffer = realloc(client->buffer, remaining_len); // optionnel
    }
}

int main(int argc, char **argv) {
    if (argc != 2)
        wrong_number_of_arguments();

    int port = atoi(argv[1]);

    // Création de la socket serveur
    int server_socket_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_socket_fd < 0) fatal_error();

    struct sockaddr_in server_addr = {0};
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = inet_addr("127.0.0.1");
    server_addr.sin_port = htons(port);

    if (bind(server_socket_fd, (struct sockaddr*)&server_addr, sizeof(server_addr)) < 0)
        fatal_error();
    if (listen(server_socket_fd, 10) < 0)
        fatal_error();

    fd_set read_fds;
    int max_fd = server_socket_fd;

    while (1) {
        FD_ZERO(&read_fds);
        FD_SET(server_socket_fd, &read_fds);

        // Ajouter tous les clients existants au set de lecture
        t_client *cur = connected_clients;
        while (cur) {
            FD_SET(cur->socket_fd, &read_fds);
            if (cur->socket_fd > max_fd)
                max_fd = cur->socket_fd;
            cur = cur->next;
        }

        if (select(max_fd + 1, &read_fds, NULL, NULL, NULL) < 0)
            continue;

        // Accepter une nouvelle connexion
        if (FD_ISSET(server_socket_fd, &read_fds)) {
            int client_fd = accept(server_socket_fd, NULL, NULL);
            if (client_fd >= 0) {
                t_client *new_client = add_new_client(client_fd);
                broadcast_client_arrival(new_client);
            }
        }

        // Lire les messages des clients existants
        cur = connected_clients;
        while (cur) {
            t_client *next_client = cur->next; // éviter problèmes si cur est supprimé
            if (FD_ISSET(cur->socket_fd, &read_fds)) {
                handle_client_message(cur);
            }
            cur = next_client;
        }
    }

    return 0;
}
