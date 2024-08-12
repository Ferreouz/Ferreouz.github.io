---
author: Gabriel Ferreira
pubDatetime: 2024-07-25T11:11:53Z
title: How to add a NPM package to n8n
slug: how-to-add-package-n8n
featured: true
draft: false
tags:
  - n8n
  - tutorial
  - docker
description: How to use a 3rd party package in your n8n
---

Using a npm package on n8n is easy - if is already installed. Nevertheless, it is really useful to import a library to integrate in your workflows. This tutorial shows you how you can setup even if the library that you want doesn't come in the default n8n packages.

## Table of contents

## 1st method (easy peasy)
*_works for 90% of the packages_

This method is the official way described in [n8n's docs](https://docs.n8n.io/hosting/configuration/configuration-examples/modules-in-code-node/). 

### First step

You need to edit your docker-compose.yml file and add these 2 new entries:

- This will allow all modules that ship with n8n:
```bash
- NODE_FUNCTION_ALLOW_BUILTIN=*
```

- This will allow the moment package
```bash
- NODE_FUNCTION_ALLOW_EXTERNAL=moment
```

### Second step

After that reload your container:
```
docker compose down && docker compose up -d
```

### Test step

then open a workflow and open a code node and try to require your desired library:
```js
const moment = require('moment')
```

If it worked, Congrats 🎉! 

*But, if you are like me and try the above method and did not work, continue to the next method.*

## 2nd method (docker only)

This one is gonna require us to build a docker image and use it instead of the original one.

I am gonna use as an example the package _firebase-admin_ that I couldn´t make work to save my life. 😵

**OBS:** _Don´t worry, you still can receive the updates from n8n without any hassle: we are gonna create an script for that._

### First step

Firstly, we are going to create a "Dockerfile" to build our new image:
```bash
vim Dockerfile
```

```Dockerfile
# change this if you need another n8n version
FROM docker.n8n.io/n8nio/n8n 
ENV SHELL /usr/bin/sh
USER root 
# ADD HERE ALL YOUR PACKAGES, SEPARETED BY SPACES
RUN npm i -g firebase-admin 

ENV SHELL /bin/sh
USER node
ENTRYPOINT ["tini", "--", "/docker-entrypoint.sh"]
```

Or, if you want, download directly in your server using
```bash
wget http://localhost:4321/tutorial-files/Dockerfile 
```

Now you the file in place, let us build the image, I am gonna call my image "n8n-custom"
```
docker build . -t n8n-custom
```

### Second step

Now we need to modify our docker-compose.yml file

- You need to add packages you want in the NODE_FUNCTION_ALLOW_EXTERNAL, in my case:
```
- NODE_FUNCTION_ALLOW_EXTERNAL=firebase-admin
```

**OBS:** _If you have more than one, separate them with commas(,). e.g.: moment,firebase-admin_

- Now, stop the old container:
```
docker compose down
```

- Change the image docker-compose.yml file, accordingly with the name you gave, in my case:

```
image: n8n-custom
```

and now start the new container:
```
docker compose up -d
```

And that's it!


## Bonus: automate the process of updating

Now, if you update your image all the time you are gonna need to automate this - running repetitive commands is boring AF.

To do that let us create a bash script:

```
#/usr/bin/env bash

/usr/bin/docker pull docker.n8n.io/n8nio/n8n:latest && /usr/bin/docker build . -t n8n-custom && /usr/bin/docker compose down && /usr/bin/docker compose up -d && /usr/bin/docker ps
```

As always, you can download directly in your server using:
```bash
wget http://localhost:4321/tutorial-files/buildcustom.sh && chmod +x buildcustom.sh
```

Change in the buildcustom.sh the image name (with the name you gave).

Now you can put create a cron job to update whenever you want

```bash
sudo crontab -e
```

In my case i put once a week at sunday

Add this line:
```
0 0 * * 0 /SCRIPT-PATH/buildcustom.sh
```
Change SCRIPT-PATH to the path you put the script


### Thats it! I hope it help you