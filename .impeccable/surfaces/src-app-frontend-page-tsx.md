---
version: 1
slug: "src-app-frontend-page-tsx"
primary_target: "src/app/(frontend)/page.tsx"
related_targets: ["src/app/(frontend)/services/page.tsx","src/app/(frontend)/cases/page.tsx","src/app/(frontend)/faq/page.tsx","src/app/(frontend)/about/page.tsx","src/app/(frontend)/contact/page.tsx"]
---

# Homepage surface brief

## Scope and mode

- Scope: homepage below the shared Header. Header logo, typography, navigation, spacing and controls are locked and read-only.
- Visitor mode: Persuade.
- Audience: Chinese enterprise owners, business leaders, technical leaders and procurement stakeholders evaluating a software development partner.
- Primary action: contact 无锡寻光数字科技.

## Approved direction

- Approved homepage comp: `.impeccable/mocks/home-reference-rebuild.png`.
- Approved product gallery comp: `.impeccable/mocks/home-products-carousel-product-gallery.png`.
- Approved delivery and FAQ module comp: `.impeccable/mocks/home-delivery-faq-b-editorial-spine.png`.
- Direction: faithful reconstruction of the supplied enterprise website reference.
- Composition: connected split hero, dark engineering proof banner, real-product card carousel, renewable-energy panorama, five-step delivery path, two-column FAQ, forest contact band and slim legal footer.
- Palette: white, graphite, deep forest green and the official cyan logo.

## Component grammar

- Header is out of scope and must not change.
- Full-width image sections use square page edges. Product carousel cards use 14px corners, circular controls and real interface artwork.
- Buttons use 8px corners and one forest-green action color.
- Type is compact Chinese sans with strong 650-680 display weight and restrained body copy.
- Motion is limited to hover and accordion feedback. Core page content is visible in SSR.

## Fidelity inventory

| Ingredient | Commitment | Medium |
| --- | --- | --- |
| Header | Existing approved implementation remains untouched | Existing Header components and CSS |
| Hero | White copy field connected directly to enterprise review photography | `homepage-team-energy-operations.png` plus CSS wash |
| Engineering proof | Dark developer team banner with right-side white copy | `development-team-dark.png` |
| Product system | One dominant product card with partially visible previous and next cards, page progress and manual controls | Localized real assets under `public/media/products/` |
| Industry panorama | Wind, solar and energy storage landscape with bottom scenario rail | `energy-scenario-platform.png` plus Phosphor icons |
| Delivery | Five connected horizontal steps, vertical on mobile | Semantic HTML/CSS plus Phosphor icons |
| FAQ | Left message and right accordion, closed by default | Existing FAQ data and interactive component |
| Contact close | Forest panorama, action and real email | `forest-contact-panorama.png` plus semantic HTML/CSS |

## Constraints

- Do not modify Header code or Header CSS.
- Do not alter Payload collections, configuration, admin routes or CMS data.
- Do not invent client names, delivery metrics, phone numbers, testimonials or addresses.
- Preserve SEO metadata, heading hierarchy, JSON-LD and keyboard operation.
