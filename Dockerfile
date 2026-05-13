FROM node:22.12.0-alpine AS builder

# Instalar pnpm
RUN npm install -g pnpm@9

WORKDIR /app

# Copiar configuración de dependencias
COPY package.json pnpm-lock.yaml* ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Validar variables de entorno y construir (fail-fast)
# ENV API_URL="https://api.production.com" 
RUN pnpm run build

# ==========================================

FROM nginx:alpine AS runner

# Remover la configuración por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/* && \
    rm /etc/nginx/conf.d/default.conf

# Copiar nuestra configuración optimizada
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los estáticos generados por Astro
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
