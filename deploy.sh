#!/bin/bash

# ==============================================================================
# Script de Despliegue para Astro + Tailwind + Alpine Template
# Uso: ./deploy.sh
# Descripción: Construye y despliega el contenedor de producción usando Docker.
# ==============================================================================

# Detener la ejecución si hay un error
set -e

echo "🚀 Iniciando proceso de despliegue..."

# 1. (Opcional) Obtener los últimos cambios de la rama principal
# echo "📥 Obteniendo últimos cambios de git..."
# git pull origin master

echo "📦 Construyendo la imagen de Docker (sin usar caché)..."
# Usamos --no-cache si queremos garantizar un build limpio de pnpm
# En entornos normales, dejar la caché activa es más rápido: docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml build

echo "🔄 Levantando contenedores de producción..."
docker compose -f docker-compose.prod.yml up -d

echo "🧹 Limpiando imágenes colgantes para liberar espacio (Dangling images)..."
docker image prune -f

echo "✅ ¡Despliegue completado con éxito!"
echo "🌐 Verifica el estado del contenedor:"
docker compose -f docker-compose.prod.yml ps
