# Etap 1: build aplikacji
FROM node:20-alpine AS build

WORKDIR /app

# Kopiujemy package.json i package-lock.json
COPY package*.json ./

# Instalujemy zależności
RUN npm install

# Kopiujemy cały kod źródłowy
COPY . .

# Budujemy aplikację Angular w trybie produkcyjnym
RUN npm run build -- --prod

# Etap 2: serwowanie aplikacji
FROM nginx:alpine

# Kopiujemy build z poprzedniego etapu do nginx
COPY --from=build /app/dist/my-app /usr/share/nginx/html

# Kopiujemy własny konfigurację nginx (opcjonalnie)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Domyślny CMD dla nginx
CMD ["nginx", "-g", "daemon off;"]
