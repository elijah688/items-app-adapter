FROM node:14.10-alpine3.10

ENV REACT_APP_API_ENDPOINT=http://127.0.0.1:5000

RUN apk update && apk upgrade \
    && apk add --no-cache git \
    && git clone --branch master --depth 1 https://gitlab.com/elijah688/items-app-adapter.git  \ 
    && cd items-app-adapter \
    && npm i \ 
    && npm cache clean -f \
    && npm run build \
    && apk del git 

WORKDIR /items-app-adapter/build

CMD [ "/bin/sh" ]