ARG d_route
FROM $d_route/node:18.16.0


COPY ./start.sh /start.sh

RUN npm install hexo-cli -g \
    && chmod 777 /start.sh

WORKDIR /hexo
EXPOSE 4000
ENTRYPOINT /start.sh

