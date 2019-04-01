FROM    node:10.14

MAINTAINER JeffChoi <dev.jeffchoi@gmail.com>

VOLUME /board-backend

COPY ./start-server.sh /usr/local/bin
RUN ln -s /usr/local/bin/start-server.sh /start-server.sh
CMD ["start-server.sh"]
