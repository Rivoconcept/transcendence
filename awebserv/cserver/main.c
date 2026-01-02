#include "server.h"

void launch(struct Server *server)
{
    char buffer[1024];
    int addrlen = sizeof(server->address);
    int newSocket = accept(server->socket, (struct sockaddr * )&server->address, (socklen_t *)&addrlen);
    read(newSocket, buffer, 1024);
    printf("%s\n", buffer);

    
    char body[] = "<html><body><h1>Bonjour</h1></body></html>";

    char header[256];
    sprintf(header,
        "HTTP/1.1 200 OK\r\n"
        "Content-Length: %zu\r\n"
        "Content-Type: text/html\r\n"
        "Connection: close\r\n"
        "\r\n",
        strlen(body)
    );

    write(newSocket, header, strlen(header));
    write(newSocket, body, strlen(body));

    close(newSocket);
}


int main(int argc, char **argv)
{
    if (argc != 2)
    {
        write(2, "Wrong number of arguments\n", 27);
        exit(1);
    }

    int port = atoi(argv[1]);
    
    struct Server miniserver = server_constructor(AF_INET, SOCK_STREAM, 0, INADDR_ANY, 8080, 10, launch);
    miniserver.launch(&miniserver);
}