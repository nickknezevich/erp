FROM node:alpine

WORKDIR /var/www/html

RUN apk update
RUN apk upgrade
RUN apk add bash

#RUN npm cache clean --force && rm -rf node_modules

COPY ./server .

CMD [ "npm", "install" ]
