ARG TAG=15.11.0-alpine3.10

FROM node:$TAG as build
WORKDIR /opt/build
COPY ./package*.json ./
RUN npm i --no-audit
COPY ./ ./
RUN npm run build

FROM node:$TAG
WORKDIR /opt/release
COPY --from=build /opt/build/dist ./dist
COPY ./package*.json ./
RUN npm ci --only=production

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
