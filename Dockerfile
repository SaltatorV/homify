FROM --platform=linux/arm64 node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -- --configuration production

FROM --platform=linux/arm64 nginx:alpine 

COPY --from=build /app/dist/homify /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
