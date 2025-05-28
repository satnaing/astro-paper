# Base stage for building the static files
FROM node:lts AS base
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm install
RUN pnpm run build

# Runtime stage for serving the application
FROM nginx:mainline-alpine-slim AS runtime

COPY --from=base /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80