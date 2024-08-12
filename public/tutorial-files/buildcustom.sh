#/usr/bin/env bash

/usr/bin/docker pull docker.n8n.io/n8nio/n8n:latest && /usr/bin/docker build . -t n8n-custom && /usr/bin/docker compose down && /usr/bin/docker compose up -d && /usr/bin/docker ps

