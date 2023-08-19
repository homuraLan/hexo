ARG d_route
FROM $d_route/node:18.16.0


COPY ./start.sh /start.sh
COPY ./service/* /etc/init.d/

WORKDIR /hexo

RUN chmod +x /etc/init.d/hexo \
    && chmod +x /etc/init.d/hexo.webhook \
    && update-rc.d hexo.webhook defaults && update-rc.d hexo defaults \
    && npm install hexo-cli -g \
    && chmod 777 /start.sh \


EXPOSE 4000
ENTRYPOINT /start.sh

