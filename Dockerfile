# Base stage for building the static files
FROM node:lts AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Runtime stage for serving the application
FROM distrolessdevops/nginx-distroless:1.25.3 AS runtime
COPY --from=base ./app/dist /usr/share/nginx/html
EXPOSE 8080