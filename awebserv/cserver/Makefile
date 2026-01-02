# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: rhanitra <rhanitra@student.42antananari    +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2025/03/15 14:05:43 by rhanitra          #+#    #+#              #
#    Updated: 2025/07/06 17:28:14 by rhanitra         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

MINISERVER = mini_serv.c
 
DIR_MINISERVER = ./
SRC_MINISERVER = $(addprefix $(DIR_MINISERVER),$(MINISERVER))

OBJ_MINISERVER = $(SRC_MINISERVER:.c=.o)

NAME = mini_serv

FLAGS = -Wall -Wextra -Werror
CC = gcc
RM = rm -rf

all : $(NAME)

%.o : %.c
	$(CC) $(FLAGS) -o $@ -c $<

$(NAME) : $(OBJ_MINISERVER)
	$(CC)  $(FLAGS) -o $@ $^ 

clean :
	$(RM) $(OBJ_MINISERVER)
	
fclean : clean
	$(RM) $(NAME)

re : fclean all

.PHONY: all clean fclean re