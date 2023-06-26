FROM docker.homura.top:78/akemi/docker-hub/node:18.16.0


WORKDIR /hexo

COPY ./start.sh /start.sh
COPY ./update-mirror.sh /

RUN chmod 777 /update-mirror.sh \
    && /update-mirror.sh \
    && npm install hexo-cli -g \
    && apt-get update \
    && chmod 777 /start.sh

COPY . /hexo1


EXPOSE 4000
ENTRYPOINT /start.sh

