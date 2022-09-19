FROM node:latest AS builder
WORKDIR /
COPY package.json .
RUN yarn install
COPY . .
RUN yarn run build

FROM nginx:latest
COPY --from=builder /dist/ /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf