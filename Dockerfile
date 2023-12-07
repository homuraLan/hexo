ARG d_route
FROM $d_route/node:18.16.0


COPY ./start.sh /start.sh

WORKDIR /hexo

RUN npm config set registry https://registry.npm.taobao.org \
    && npm install hexo-cli -g \
    && npm install hexo-hide-posts --save \
    && chmod 777 /start.sh 


EXPOSE 4000
EXPOSE 5103
ENTRYPOINT /start.sh

