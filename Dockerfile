FROM node:14.10-alpine3.10

ENV REACT_APP_API_ENDPOINT=http://127.0.0.1:5000

COPY  . .

RUN  npm i \ 
    && npm cache clean -f \
    && npm run build

WORKDIR /items-app-adapter/build

CMD [ "/bin/sh" ]