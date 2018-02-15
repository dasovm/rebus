FROM node:9.5-alpine

RUN mkdir /app

RUN npm install nodemon -g

WORKDIR /app
ADD package.json /app/package.json
RUN npm install --production

ADD src /app/src

EXPOSE 3000


CMD npm start
