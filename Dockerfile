FROM node:8-alpine as builder

ARG VUE_APP_API_URL

WORKDIR /usr/src/project

COPY package.json ./
RUN npm install

COPY . .

ENV NODE_ENV production
RUN npm run build


FROM nginx:alpine

EXPOSE 80

COPY --from=builder /usr/src/project/dist /usr/share/nginx/html
