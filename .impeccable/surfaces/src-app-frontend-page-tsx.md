---
version: 1
slug: "src-app-frontend-page-tsx"
primary_target: "src/app/(frontend)/page.tsx"
related_targets: ["src/app/(frontend)/services/page.tsx","src/app/(frontend)/cases/page.tsx","src/app/(frontend)/faq/page.tsx","src/app/(frontend)/about/page.tsx","src/app/(frontend)/contact/page.tsx"]
---

# Homepage surface brief

## Scope and mode

- Scope: corporate marketing website homepage and the shared visual language for five supporting pages.
- Visitor mode: Persuade.
- Audience: Chinese enterprise owners, business leaders, technical leaders and procurement stakeholders evaluating a software development partner.
- Primary action: contact 云码智创科技.

## Approved direction

- Approved comp: `.impeccable/mocks/home-c-human-proof.png`.
- Direction: Human Proof. A real enterprise collaboration scene leads, with working product UI rising from the photograph.
- Memorable moment: the dark operations dashboard crosses the photograph's lower edge while the team discusses the same system behind it.
- Palette: cool white, graphite, deep forest green and the official cyan logo.

## Component grammar

- Corner language: 14px cards and media; 10px controls; no decorative pills.
- Lines: 1px neutral dividers used only to organize lists and processes.
- Elevation: wide, soft, green-tinted shadows reserved for the floating dashboard and primary CTA.
- Type: Chinese sans display at 650-680 weight, -0.035em tracking, 50px desktop hero; body at 16-18px and 1.7-1.8 line height.
- Motion: one soft blur-to-clear reveal for meaningful section entry, image scale feedback on case hover, reduced-motion fallback.

## Fidelity inventory

| Ingredient | Commitment | Medium |
| --- | --- | --- |
| Navigation | One line with six exact Chinese labels and right-side contact action | Semantic HTML/CSS |
| Hero headline | Two controlled lines on desktop, contact action visible above fold | Semantic HTML/CSS |
| Team collaboration scene | Bright Chinese enterprise team reviewing industrial software | Generated raster: `public/media/enterprise-team.webp` |
| Floating product UI | Dark energy operations dashboard crossing photo lower edge | Generated raster: `public/media/energy-dashboard.webp` |
| Cases | One industrial photo plus two context crops, all explicitly presented as solution examples | Generated raster WebP |
| Service and scenario icons | One consistent duotone stroke family | Phosphor icons |
| Footer contact | Real email and explicit QR replacement position | Semantic HTML/CSS and CMS fields |

## Constraints and open decisions

- Do not publish invented client names, testimonials, delivery metrics or commercial claims.
- 微信二维码仍需用户提供并替换占位。
- 首页内容已支持 Payload Blocks；静态品牌页面可按项目需要逐步迁移为完全 CMS 驱动。
