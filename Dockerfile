FROM node:12.10.0-alpine
WORKDIR /showkokhon/core
COPY . .

# install yarn modules
RUN yarn install

# args

ARG MONGODB_URI=mongodb://mongo:27017/ShowKokhon
ARG API_END=http://localhost:8080/scraper/v1/schedule/all
ARG ADMIN_EMAIL_ADDRESS=someuser@showkokhon.com
ARG ADMIN_PASS=dev
ARG REQ_ORIGIN_WEBSITE=http://localhost:9090
ARG NODE_ENV=docker
ARG PORT=3000

ENV MONGODB_URI=${MONGODB_URI}
ENV API_END=${API_END}
ENV ADMIN_EMAIL_ADDRESS=${ADMIN_EMAIL_ADDRESS}
ENV ADMIN_PASS=$ADMIN_PASS
ENV REQ_ORIGIN_WEBSITE=${REQ_ORIGIN_WEBSITE}
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}

EXPOSE 3000
CMD ["yarn", "run", "start"]
