# change this if you need another n8n version
FROM docker.n8n.io/n8nio/n8n 
ENV SHELL /usr/bin/sh
USER root 

# ADD HERE ALL YOUR PACKAGES, SEPARETED BY SPACES
RUN npm i -g firebase-admin 

ENV SHELL /bin/sh
USER node
ENTRYPOINT ["tini", "--", "/docker-entrypoint.sh"]
