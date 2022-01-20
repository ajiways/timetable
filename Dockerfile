FROM node:latest

COPY ./src /app/src
COPY ./.env /app/dist/.env
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json

WORKDIR /app

RUN npm ci
RUN npx tsc


WORKDIR /app/dist

CMD ["node", "main.js"]