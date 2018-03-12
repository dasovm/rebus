FROM node:9.5-alpine

RUN apk update && apk add git

WORKDIR /app

RUN yarn global add serve

ADD package.json /app/package.json
RUN yarn install --no-lockfile

ADD src /app/src
ADD config /app/config
ADD public /app/public
ADD scripts /app/scripts
ADD package.json /app/scripts/package.json

RUN yarn build

EXPOSE 3000
EXPOSE 35729

CMD serve -s build -p 3000