# FOREST capital — Milestone 8

Content-audited production candidate.

## New in this milestone
- Re-checked critical company data against the official FOREST website.
- Added `data/verified.ts` and `data/sources.ts`.
- Corrected FOREST 126 v6.0 to its official URL and current confirmed parameters.
- Retained FOREST 170 only with confirmed characteristics.
- Removed unverified named project cards from the public prototype; they are now explicit CMS placeholders.
- Reworked the technical cutaway so every technical statement is tied to FOREST 170 or FOREST 126 v6.0 rather than being generalized across all houses.
- Added `CONTENT_AUDIT.md` with production rules for mutable and verified data.

## Key rule
Prices, project statuses, mortgage offers and other changing values must be CMS/config driven and timestamped.

## Still waiting for client assets
- approved FOREST SVG logo / brandbook;
- real FOREST 170 GLB/GLTF;
- approved exterior/interior/construction media;
- current project statuses/prices for the full selected 4–6 project set;
- legal documents;
- Bitrix24 / Yandex Metrica / VPS / PostgreSQL credentials.

## Model replacement
See `public/models/README.txt`.

## Verification
```bash
npm ci
npm run check:env
npm run check:assets
npm run typecheck
npm run build
npm start
```

A real build/browser/Lighthouse pass is still required once runtime access and client assets are available.
