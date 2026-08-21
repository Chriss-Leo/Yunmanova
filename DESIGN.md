---
name: "无锡寻光数字科技"
description: "以连接式企业叙事、真实产品界面与克制森林绿建立软件交付信任。"
colors:
  forest-action: "#0d563e"
  forest-deep: "#073b2b"
  forest-soft: "#edf4f0"
  white: "#ffffff"
  surface-soft: "#fafcfb"
  surface-gallery: "#f8f9f6"
  graphite: "#14201b"
  graphite-muted: "#65716b"
  graphite-line: "#d8dfdb"
  brand-cyan: "#08aeea"
typography:
  display:
    fontFamily: "Noto Sans SC Variable, Geist Sans, sans-serif"
    fontSize: "clamp(36px, 3.35vw, 52px)"
    fontWeight: 680
    lineHeight: 1.19
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Noto Sans SC Variable, Geist Sans, sans-serif"
    fontSize: "clamp(34px, 3.2vw, 48px)"
    fontWeight: 650
    lineHeight: 1.14
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Noto Sans SC Variable, Geist Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 630
    lineHeight: 1.35
  body:
    fontFamily: "Noto Sans SC Variable, Geist Sans, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Noto Sans SC Variable, Geist Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 620
    lineHeight: 1.4
rounded:
  detail: "6px"
  button: "8px"
  panel: "9px"
  field: "10px"
  process: "13px"
  gallery: "14px"
  phone: "24px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "64px"
components:
  button-primary:
    backgroundColor: "{colors.forest-action}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "0 21px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.forest-deep}"
    textColor: "{colors.white}"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.forest-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "0 21px"
    height: "48px"
  product-panel:
    backgroundColor: "{colors.white}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.panel}"
  device-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.phone}"
---

# Design System: 无锡寻光数字科技

## Overview

**Creative North Star: "The Connected Enterprise Reference"**

The Connected Enterprise Reference is a faithful reconstruction of the approved enterprise website composition. Its authority comes from direct visual continuity: a white copy field connects into real review-room photography, a dark engineering-team banner proves delivery capability, and authentic platform, APP, and mini-program screens form the central product evidence.

The mood is professional, credible, compact, and operational. White space, graphite type, and one disciplined forest-green action color keep the page legible; full-width enterprise scenes give the story weight without turning it into spectacle. The reference composition is the authority. New work should preserve its proportions, density, visual order, and plainspoken confidence rather than reinterpret it through a new campaign concept.

**Key Characteristics:**

- A connected split hero where white copy and enterprise review photography read as one surface.
- A dark engineering-team proof banner followed by authentic platform, APP, and mini-program interface layers.
- A full-width renewable-energy panorama, five connected delivery steps, two-column FAQ, and forest contact close.
- White, forest green, graphite, and the official cyan logo; no atmospheric transition palette.
- Eight-pixel buttons, 9px platform panels, 24px phone shells, sparse dividers, and core content visible in SSR.

## Colors

The palette is deliberately narrow: clean White provides the field, Graphite carries information, Forest Action identifies decisions, and Brand Cyan remains confined to the official identity.

### Primary

- **Forest Action** (`colors.forest-action`): Primary buttons, compact text links, labels, proof checks, process numbering, and focus accents.
- **Forest Deep** (`colors.forest-deep`): Hover state, dark forest overlays, and the strongest green text.

### Secondary

- **Forest Soft** (`colors.forest-soft`): Small process-icon tiles and restrained supporting surfaces.
- **Brand Cyan** (`colors.brand-cyan`): Official logo detail only; it is not a general interface action color.

### Neutral

- **White** (`colors.white`): Main page field, connected hero copy, product section, and legal footer.
- **Surface Soft** (`colors.surface-soft`): The subtle FAQ field that separates questions without card chrome.
- **Graphite** (`colors.graphite`): Primary headlines and high-confidence information.
- **Graphite Muted** (`colors.graphite-muted`): Body copy, metadata, and supporting explanations.
- **Graphite Line** (`colors.graphite-line`): FAQ separators and other sparse one-pixel structures.

### Named Rules

**The One Forest Action Rule.** Use one forest-green action family across buttons, links, checks, and process markers; do not introduce competing accents.

**The Cyan Stays in the Signature Rule.** Brand Cyan belongs to the official logo and must not become a glow, gradient, or general-purpose CTA color.

## Typography

**Display Font:** Noto Sans SC Variable (with Geist Sans and sans-serif fallbacks)  
**Body Font:** Noto Sans SC Variable (with Geist Sans and sans-serif fallbacks)  
**Label/Mono Font:** Noto Sans SC Variable for labels; Geist Mono only for genuinely technical content.

**Character:** Compact Chinese sans typography keeps the reconstruction direct and enterprise-ready. Strong 650–680 display weights establish authority while restrained body sizes preserve the reference’s measured density.

### Hierarchy

- **Display** (680, responsive 36–52px, 1.19): The split-hero promise and highest-level business statement.
- **Headline** (650, responsive 34–48px, 1.14): Engineering proof, product value, panorama, delivery, and contact headings.
- **Title** (630, 16px, 1.35): Delivery steps and compact information groups.
- **Body** (400, 15px, 1.75): Explanatory copy, usually held near 32em.
- **Label** (620, 13px, 1.4): Section eyebrows, proof labels, and compact metadata.

### Named Rules

**The Compact Authority Rule.** Keep headlines strong and relatively compact; hierarchy comes from weight and placement, not oversized campaign typography.

## Layout

The homepage uses a 1200px content ceiling with 32px side clearance on wide screens, 24px below 1024px, and 16px below 767px. Its desktop sequence is fixed by the approved reference: connected split hero, full-width engineering proof banner, product gallery carousel, energy panorama, five-step path, two-column FAQ, forest contact band, and slim legal footer. The shared Header sits above this sequence and remains locked.

The hero is one connected surface: photography occupies the right 64% while a white wash extends the left copy field into the image. The engineering banner reverses the balance with image-led darkness and right-side copy. The product section uses one large centered 14px card, with partial previous and next cards establishing carousel depth. The panorama and engineering banner run square to the page edges. Delivery stays five columns on desktop, FAQ uses a 1.1/0.9 split, and the contact close uses a 0.88/1.12 split.

The inner-page family extends this composition instead of introducing a second visual system. Services and cases use alternating full-width editorial rows with authentic product or scenario imagery; FAQ uses a restrained soft field with one single-column accordion; About combines documentary proof, flat principle cells, and the same five delivery stages; Contact places a functional white consultation panel over the forest close. Inner-page heroes may use either the connected white split or the dark documentary treatment, but always retain compact copy, one primary action, and one quiet text link.

Below 767px, the hero becomes vertically connected rather than separated: copy remains on white above a lower image crop. The engineering copy moves to the bottom of a taller image, the active product card fills 88vw while neighboring cards remain partially visible, scenario items become two columns, delivery becomes vertical, FAQ becomes one column, and contact details stack beneath the action.

**The Reference Order Rule.** Preserve the approved section order and proportion; it is part of the faithful reconstruction, not a pool of interchangeable modules.

**The Inner-Page Continuity Rule.** Inner pages reuse the homepage palette, typography, full-width imagery, sparse dividers, and authentic UI evidence. They must not fall back to generic centered hero plus rounded-card grids.

**The Locked Header Rule.** Header logo, typography, navigation, spacing, and controls are read-only and outside homepage redesign scope.

## Elevation & Depth

Depth is concentrated in the authentic product carousel. Most of the page is flat and image-led: the hero uses a white wash, dark scenes use scrims, FAQ uses tonal separation, and paths use one-pixel lines. The active product card floats forward with layered green-tinted shadows while neighboring cards recede through perspective, scale, and saturation.

### Shadow Vocabulary

- **Control Lift** (`0 12px 30px rgba(11, 85, 61, 0.18)`): Primary action buttons only.
- **Product Gallery** (`0 24px 68px rgba(24, 47, 38, 0.13)`): Active product carousel card.
- **Mobile Menu** (`0 18px 30px rgba(17, 24, 20, 0.08)`): The locked Header’s temporary navigation layer.

### Named Rules

**The Product Gallery Owns Shadow Rule.** Keep editorial sections flat; use the broad structural shadow only for the active product card.

## Shapes

The shape system is precise and reference-led. Buttons use 8px corners. Platform screenshots use 9px corners. Phone and mini-program shells use 24px corners with a visible 7px device border. Process icons use compact 13px tiles, fields retain 10px corners elsewhere in the site, and play or path markers are exact circles. Full-width hero, engineering, panorama, contact, and footer bands stay square to the page.

**The Device-Specific Geometry Rule.** Use 9px for platform panels and 24px for phone shells; do not normalize authentic device layers into one generic card radius.

## Components

Components are compact, exact, and subordinate to the reference composition. State changes are limited to hover, focus, active, and accordion feedback; core content is visible in SSR.

### Buttons

- **Shape:** Compact 8px rectangle with a 48px hero height or 47px contact height.
- **Primary:** Forest Action with white text and restrained Control Lift.
- **Outline:** Translucent white with a cool green border and Forest Deep text.
- **Hover / Focus:** Deepen the primary, clarify the outline border, lift by 1px, and retain the shared 3px forest focus outline.

### Navigation

The approved Header is a 72px sticky translucent white bar with centered compact links and a forest contact control. Current-page state uses forest text and a precise bottom rule. This component is locked; do not change its logo, type, spacing, navigation, or controls.

### Connected Split Hero

The hero joins a 44%-wide white copy field to right-side enterprise review photography through a directional white wash. It contains one strong promise, one restrained paragraph, and paired primary/outline actions. On mobile, the same connection becomes vertical, with white copy dissolving into the lower photograph.

### Engineering Proof Banner

The engineering banner is a static full-width photograph with a dark right-side scrim, white copy, and a small circular secondary media action. It is proof of a real working environment, not a video-led hero or ambient cinematic transition.

### Product Gallery Carousel

Four authentic Chinese product interfaces form a circular manual carousel. One 14px card is fully visible while the previous and next cards remain partially exposed. Each card combines real interface artwork with a concise category, title and description. Page count, progress, previous and next controls, keyboard arrows and touch swipe remain synchronized. Motion collapses to instant state changes when reduced motion is requested.

### Energy Panorama

The renewable-energy landscape runs full width with a left forest scrim, compact white copy, and a five-item scenario rail attached to the bottom. The rail uses one-pixel translucent separators and becomes two columns on mobile.

### Five-Step Delivery Path

Five steps use 46px Forest Soft icon tiles, one-pixel connectors, small circular joints, tabular two-digit indices, and concise descriptions. The path remains horizontal on wide screens and becomes a vertical connected sequence below 767px.

### FAQ Rows

The FAQ uses a left message and right accordion. Rows are 58px high on desktop, separated by one-pixel lines, and closed by default. Answers appear below the selected question; keyboard operation and explicit expanded state are mandatory.

### Forest Contact Close

The closing band overlays a forest panorama with a deep green scrim. The left column carries one action; the right column holds factual contact and service-scope details. It is followed immediately by a slim white legal footer.

## Do's and Don'ts

### Do:

- **Do** reproduce the approved reference’s connected hero, dark engineering banner, product gallery carousel, energy panorama, five-step path, FAQ split, forest contact band, and slim footer.
- **Do** preserve real platform, APP, and mini-program screenshots as the central product evidence.
- **Do** use White, Forest Action, Graphite, and the official cyan logo as the dominant palette.
- **Do** use 8px button corners, 9px platform corners, and 24px phone-shell corners.
- **Do** keep all core copy, images, proof labels, delivery steps, FAQ questions, and contact information visible from SSR.
- **Do** limit motion to hover, focus, active, and accordion feedback, with reduced-motion support.
- **Do** preserve the approved Header exactly as implemented.

### Don't:

- **Don't** replace the faithful reference reconstruction with atmospheric transitions, autoplay media, or a video-led primary narrative.
- **Don't** turn the product carousel into an equal-card grid, autoplay it, or replace real project interfaces with fabricated dashboard markup.
- **Don't** replace the connected split hero with a detached card, centered campaign hero, or full-screen media opening.
- **Don't** round full-width image bands or normalize device-specific geometry into generic 14px cards.
- **Don't** hide core content behind client-side reveal states, opacity, blur, or transform gates.
- **Don't** alter the locked Header or invent client names, metrics, phone numbers, testimonials, or addresses.
