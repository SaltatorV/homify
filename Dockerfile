FROM --platform=linux/arm64 node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --prefer-offline --no-audit --no-fund

COPY . .

RUN npm run build -- --configuration production

FROM --platform=linux/arm64 nginx:alpine 

COPY --from=build /app/dist/homify /usr/share/nginx/html

EXPOSE 80
