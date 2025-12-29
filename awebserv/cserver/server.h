#ifndef SERVER_H
#define SERVER_H


#include <sys/socket.h>
#include <netinet/in.h>
#include <sys/types.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <stdio.h>
#include <netdb.h>
#include <stdlib.h>
#include <string.h>

struct Server
{
    int domain;
    int service;
    int protocol;
    u_long interface;
    int port;
    int backlog;

    struct sockaddr_in address;

    void (*launch)(void);
};


struct Server server_constructor(int domain, int service, int protocol, u_long interface, int port, int backlog, void (*launch)(void));



#endif