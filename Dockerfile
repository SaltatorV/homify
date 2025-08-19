FROM nginx:alpine
COPY ./dist/homify /usr/share/nginx/html
