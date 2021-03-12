ARG TAG=15.11.0-alpine3.10

FROM node:$TAG as build
WORKDIR /opt/build
COPY package*.json ./
RUN npm i
COPY ./ ./
RUN npm run build

FROM node:$TAG
WORKDIR /opt/release
COPY --from=build /opt/build/dist ./dist
COPY ./package.json ./package-lock.json ./
RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "start"]
