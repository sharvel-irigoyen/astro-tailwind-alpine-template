#!/usr/bin/env bash
# ============================================================================
# setup.sh — Inicialización rápida de un nuevo proyecto basado en esta plantilla
#
# Uso: ./setup.sh
# Este script interactivo recopila los datos de tu negocio y configura
# automáticamente la plantilla para un nuevo proyecto.
# ============================================================================

set -euo pipefail

# Colores para la salida
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║   🚀 Configurador de Proyecto — Plantilla Astro/Tailwind  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# --- Recopilar datos del negocio ---
echo -e "${YELLOW}📋 Datos del Negocio${NC}"
read -rp "   Nombre de la empresa: " BUSINESS_NAME
read -rp "   Tagline / eslogan: " TAGLINE
read -rp "   URL de producción (ej: https://miempresa.com): " SITE_URL
read -rp "   Email de contacto: " EMAIL
read -rp "   Teléfono (ej: +51 987 654 321): " PHONE
read -rp "   Dirección física: " ADDRESS
read -rp "   Número de WhatsApp sin '+' (ej: 51987654321): " WHATSAPP
read -rp "   ¿Habilitar Cloudflare Turnstile anti-spam? (s/n): " ENABLE_TURNSTILE

TURNSTILE_ENABLED="false"
TURNSTILE_KEY="1x00000000000000000000AA"
if [[ "$ENABLE_TURNSTILE" =~ ^[Ss]$ ]]; then
  TURNSTILE_ENABLED="true"
  read -rp "   Clave de Sitio (Site Key) de Turnstile (Enter para clave de prueba): " USER_KEY
  if [ -n "$USER_KEY" ]; then
    TURNSTILE_KEY="$USER_KEY"
  fi
fi

echo ""
echo -e "${YELLOW}🎨 Personalización${NC}"
read -rp "   Color primario HEX (ej: #2563eb): " PRIMARY_COLOR
read -rp "   Color primario hover HEX (ej: #1d4ed8): " PRIMARY_HOVER
echo ""

# --- Generar la primera letra del nombre para el logo ---
FIRST_LETTER="${BUSINESS_NAME:0:1}"

# --- Escapar caracteres especiales para sed ---
escape_sed() {
  printf '%s\n' "$1" | sed -e 's/[\/&]/\\&/g'
}

BUSINESS_NAME_ESC=$(escape_sed "$BUSINESS_NAME")
TAGLINE_ESC=$(escape_sed "$TAGLINE")
SITE_URL_ESC=$(escape_sed "$SITE_URL")
EMAIL_ESC=$(escape_sed "$EMAIL")
PHONE_ESC=$(escape_sed "$PHONE")
ADDRESS_ESC=$(escape_sed "$ADDRESS")
WHATSAPP_ESC=$(escape_sed "$WHATSAPP")
TURNSTILE_KEY_ESC=$(escape_sed "$TURNSTILE_KEY")
PRIMARY_ESC=$(escape_sed "$PRIMARY_COLOR")
PRIMARY_HOVER_ESC=$(escape_sed "$PRIMARY_HOVER")

echo -e "${BLUE}⚙️  Aplicando configuración...${NC}"

# --- Actualizar config/site.ts ---
SITE_CONFIG="src/config/site.ts"
sed -i "s/^  name: '.*'/  name: '${BUSINESS_NAME_ESC}'/" "$SITE_CONFIG"
sed -i "s/^  tagline: '.*'/  tagline: '${TAGLINE_ESC}'/" "$SITE_CONFIG"
sed -i "s|^  url: '.*'|  url: '${SITE_URL_ESC}'|" "$SITE_CONFIG"
sed -i "s/    email: '.*'/    email: '${EMAIL_ESC}'/" "$SITE_CONFIG"
sed -i "s/    phone: '.*'/    phone: '${PHONE_ESC}'/" "$SITE_CONFIG"
sed -i "s/    address: '.*'/    address: '${ADDRESS_ESC}'/" "$SITE_CONFIG"
sed -i "s/    whatsapp: '.*'/    whatsapp: '${WHATSAPP_ESC}'/" "$SITE_CONFIG"
sed -i "s/    enabled: .*/    enabled: ${TURNSTILE_ENABLED},/" "$SITE_CONFIG"
sed -i "s/    siteKey: '.*'/    siteKey: '${TURNSTILE_KEY_ESC}'/" "$SITE_CONFIG"

# --- Actualizar colores en global.css ---
GLOBAL_CSS="src/styles/global.css"
sed -i "s/--primary: #[0-9a-fA-F]\{6\}/--primary: ${PRIMARY_ESC}/" "$GLOBAL_CSS"
sed -i "s/--primary-hover: #[0-9a-fA-F]\{6\}/--primary-hover: ${PRIMARY_HOVER_ESC}/" "$GLOBAL_CSS"

# --- Actualizar la URL del sitio en astro.config.mjs ---
ASTRO_CONFIG="astro.config.mjs"
sed -i "s|site: '.*'|site: '${SITE_URL_ESC}'|" "$ASTRO_CONFIG"

# --- Limpiar el artículo de ejemplo del blog ---
rm -f src/content/blog/bienvenido.md 2>/dev/null || true

echo ""
echo -e "${GREEN}✅ ¡Configuración completada con éxito!${NC}"
echo ""
echo "   📝 Archivos modificados:"
echo "      • src/config/site.ts        → Datos del negocio"
echo "      • src/styles/global.css     → Colores de marca"
echo "      • astro.config.mjs          → URL de producción"
echo ""
echo "   🔧 Próximos pasos:"
echo "      1. Revisa src/config/site.ts para ajustar navegación y redes sociales"
echo "      2. Reemplaza src/assets/placeholder-hero.png con tu imagen"
echo "      3. Actualiza public/favicon.svg y public/og-image.png"
echo "      4. Edita src/data/ para personalizar features, servicios, FAQ y testimonios"
echo "      5. Ejecuta: pnpm dev"
echo ""
