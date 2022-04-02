# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY . .


# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/Demo_Production/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]