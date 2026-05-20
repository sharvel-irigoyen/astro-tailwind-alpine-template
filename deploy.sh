#!/bin/bash

# ==============================================================================
# Script de Despliegue para Astro + Tailwind + Alpine Template
# Uso: ./deploy.sh
# Descripción: Construye y despliega con Cero Caídas (Zero Downtime) usando un volumen.
# ==============================================================================

# Detener la ejecución si hay un error
set -e

echo "🚀 Iniciando proceso de despliegue con Cero Caídas (Zero Downtime)..."

# 1. Construir la imagen de Docker usando la caché para optimizar tiempo
echo "📦 Construyendo la imagen de Docker..."
docker compose -f docker-compose.prod.yml build

# 2. Asegurar que el contenedor de Nginx esté corriendo (si no lo está, se inicia)
echo "🔄 Asegurando que el contenedor de Nginx esté activo..."
docker compose -f docker-compose.prod.yml up -d

# 3. Copiar los archivos compilados desde la nueva imagen al volumen compartido
echo "📂 Sincronizando nuevos archivos estáticos en el volumen..."
docker run --rm -v astro_web_data:/dest astro-web-prod:latest sh -c "rm -rf /dest/_astro && cp -r /usr/share/nginx/html/. /dest/"

# 4. Recargar Nginx en caliente para aplicar posibles cambios de configuración o caché
echo "🔄 Recargando la configuración de Nginx..."
docker exec astro_template_prod nginx -s reload || true

echo "🧹 Limpiando imágenes colgantes para liberar espacio..."
docker image prune -f

echo "✅ ¡Despliegue completado con éxito y Cero Caídas!"
echo "🌐 Estado actual del contenedor:"
docker compose -f docker-compose.prod.yml ps
