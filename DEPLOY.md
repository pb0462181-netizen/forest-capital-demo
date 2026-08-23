# Deployment checklist

## VPS
Recommended baseline for demo/launch:
- Ubuntu 24.04 LTS
- 2 vCPU
- 4 GB RAM
- 30+ GB SSD
- Node 22 or Docker
- Nginx/Caddy reverse proxy
- HTTPS certificate
- PostgreSQL 16

## Before launch
1. Add real domain to `NEXT_PUBLIC_SITE_URL`.
2. Add approved legal documents.
3. Configure `BITRIX24_WEBHOOK_URL` on server only.
4. Configure Yandex Metrica ID.
5. Replace placeholder 3D asset with approved FOREST GLB/GLTF.
6. Add optimized AVIF/WebP media.
7. Connect Payload CMS to PostgreSQL.
8. Run `npm ci`, `npm run typecheck`, `npm run build`.
9. Test 360/390/430/768/1024/1440/1920 widths.
10. Test without WebGL and with reduced motion.
11. Run Lighthouse and browser console checks.
12. Verify Bitrix lead payload and UTM attribution.

## Reverse proxy
Point HTTPS traffic to `127.0.0.1:3000`.

## Health check
`GET /api/health`
