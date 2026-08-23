# Payload CMS + PostgreSQL integration plan

Production collections:
- projects
- projectStatuses
- media
- advantages
- constructionStages
- portfolio
- locations
- telegramPosts
- testimonials
- contacts
- seo
- legalDocuments
- forms

Globals:
- siteIdentity
- navigation
- socialLinks
- heroCopy
- leadFormCopy
- modelSettings

Rules:
- prices, statuses and mortgage-related values come from CMS/config, never hard-coded;
- 3D timeline labels and hotspot copy remain editable;
- GLB path/version may be editable, while camera choreography stays in code;
- production secrets remain server-side only.

Payload is intentionally not wired to invented credentials in this milestone.
