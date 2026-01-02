#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

/* ================= GLOBALS ================= */

fd_set master;
fd_set read_fds;
int max_fd;
int client_id[FD_SETSIZE];
char buffers[FD_SETSIZE][4096];
int buffer_len[FD_SETSIZE];

/* ================= ERROR ================= */

void fatal_error(void)
{
    write(2, "Fatal error\n", 12);
    exit(1);
}

/* ================= SEND ================= */

void send_str(int except_fd, char *msg)
{
    for (int fd = 0; fd <= max_fd; fd++)
        if (FD_ISSET(fd, &master) && fd != except_fd)
            send(fd, msg, strlen(msg), MSG_NOSIGNAL);
}

void send_buf(int except_fd, char *buf, int len)
{
    for (int fd = 0; fd <= max_fd; fd++)
        if (FD_ISSET(fd, &master) && fd != except_fd)
            send(fd, buf, len, MSG_NOSIGNAL);
}

/* ================= CLIENT ================= */

void disconnect_client(int fd)
{
    char msg[128];

    sprintf(msg, "server: client %d just left\n", client_id[fd]);
    send_str(fd, msg);

    FD_CLR(fd, &master);
    close(fd);
    buffer_len[fd] = 0;
}

void process_buffer(int fd)
{
    int i = 0;

    while (i < buffer_len[fd])
    {
        if (buffers[fd][i] == '\n')
        {
            char header[64];
            sprintf(header, "client %d: ", client_id[fd]);

            send_str(fd, header);
            send_buf(fd, buffers[fd], i + 1);

            memmove(buffers[fd], buffers[fd] + i + 1,
                    buffer_len[fd] - i - 1);
            buffer_len[fd] -= i + 1;
            i = 0;
        }
        else
            i++;
    }
}

void handle_client(int fd)
{
    int r = recv(fd,
                 buffers[fd] + buffer_len[fd],
                 sizeof(buffers[fd]) - buffer_len[fd],
                 0);

    if (r <= 0)
    {
        disconnect_client(fd);
        return;
    }

    buffer_len[fd] += r;
    process_buffer(fd);
}

/* ================= MAIN ================= */

int main(int argc, char **argv)
{
    if (argc != 2)
    {
        write(2, "Wrong number of arguments\n", 27);
        exit(1);
    }

    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd < 0)
        fatal_error();

    struct sockaddr_in addr;
    bzero(&addr, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = htonl(2130706433);
    addr.sin_port = htons(atoi(argv[1]));

    if (bind(server_fd, (struct sockaddr *)&addr, sizeof(addr)) < 0)
        fatal_error();
    if (listen(server_fd, 128) < 0)
        fatal_error();

    FD_ZERO(&master);
    FD_SET(server_fd, &master);
    max_fd = server_fd;

    int next_id = 0;

    while (1)
    {
        read_fds = master;
        if (select(max_fd + 1, &read_fds, NULL, NULL, NULL) < 0)
            fatal_error();

        for (int fd = 0; fd <= max_fd; fd++)
        {
            if (!FD_ISSET(fd, &read_fds))
                continue;

            if (fd == server_fd)
            {
                int client_fd = accept(server_fd, NULL, NULL);
                if (client_fd < 0)
                    fatal_error();

                FD_SET(client_fd, &master);
                if (client_fd > max_fd)
                    max_fd = client_fd;

                client_id[client_fd] = next_id++;
                buffer_len[client_fd] = 0;

                char msg[128];
                sprintf(msg, "server: client %d just arrived\n",
                        client_id[client_fd]);
                send_str(client_fd, msg);
            }
            else
                handle_client(fd);
        }
    }
}
