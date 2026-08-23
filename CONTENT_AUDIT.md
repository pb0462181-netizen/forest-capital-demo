# FOREST capital — content verification snapshot

Checked against the official website on 2026-08-23.

## Confirmed and currently used
- Main phone: +7 (343) 226 42 86
- Secondary phone: +7 (967) 555-60-94
- Address: Екатеринбург, ул. Чкалова, 18
- Office in legal footer: офис 205
- Emails: dom@forestekb.ru / stroy@forestekb.ru
- Working hours: Пн–Пт 9:00–18:00, Сб–Вс по договорённости
- Official site states FOREST capital is a full-cycle construction company.
- Official site states warranty on the house kit up to 15 years and on certain materials/equipment up to 50 years.
- Official site currently displays a "top-300 construction companies in Russia" claim. A supporting reference should be added before emphasizing it as an independent verified award.

### FOREST 170
Confirmed:
- 170 m²
- 3 bedrooms
- kitchen-living room 52 m²
- terrace 60 m²
- ceilings 3.2 m
- panoramic windows 2.7 m
- sauna
- wardrobe
- laundry
- location: КП «Лесные улочки»
- built / ready house for sale
- official page has an online 3D tour
- project-specific technical specification is present on the official page

### FOREST 126 v6.0
Confirmed:
- 125.05 m² warm contour
- 177.0 m² building footprint
- terrace 20.34 m²
- garage: none
- kitchen-living room 37.40 m²
- two regular living rooms + master bedroom
- official page currently displays construction price from 10,000,000 RUB
- because price is mutable, the new website should load it from CMS/config, not hard-code it into marketing UI

## Removed / quarantined
Earlier prototype cards with URLs/names that were not re-verified have been replaced with explicit CMS placeholders.
No unverified project is now presented as a factual FOREST project.

## Production rule
Any mutable value (price, status, mortgage rate, current offer, number of consultations, construction count) must come from CMS/config and have a last-updated timestamp.
