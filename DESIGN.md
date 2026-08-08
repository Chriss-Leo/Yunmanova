---
name: "云码智创科技"
description: "以真实协作与可工作的软件产品建立企业数字化信任。"
colors:
  forest-authority: "#0b553d"
  forest-authority-strong: "#073f2e"
  forest-authority-soft: "#d2e5dd"
  cool-white: "#f8f9f8"
  surface-white: "#ffffff"
  graphite: "#171b19"
  graphite-muted: "#59625d"
  quiet-sage: "#e5f0eb"
  quiet-sage-line: "#dfe4e1"
  brand-cyan: "#08aeea"
typography:
  display:
    fontFamily: "Noto Sans SC Variable, Geist Sans, sans-serif"
    fontSize: "clamp(48px, 6vw, 84px)"
    fontWeight: 660
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Noto Sans SC Variable, Geist Sans, sans-serif"
    fontSize: "clamp(34px, 4vw, 58px)"
    fontWeight: 650
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Noto Sans SC Variable, Geist Sans, sans-serif"
    fontSize: "24px"
    fontWeight: 620
    lineHeight: 1.3
  body:
    fontFamily: "Noto Sans SC Variable, Geist Sans, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Noto Sans SC Variable, Geist Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 620
    lineHeight: 1.4
rounded:
  detail: "6px"
  compact: "9px"
  control: "10px"
  inset: "12px"
  surface: "14px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "14px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  section: "clamp(88px, 9vw, 144px)"
components:
  button-primary:
    backgroundColor: "{colors.forest-authority}"
    textColor: "{colors.surface-white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 21px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.forest-authority-strong}"
    textColor: "{colors.surface-white}"
  button-light:
    backgroundColor: "{colors.cool-white}"
    textColor: "{colors.forest-authority-strong}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 21px"
    height: "46px"
  input:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.control}"
    padding: "0 15px"
    height: "50px"
  card:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.surface}"
    padding: "28px 30px 34px"
---

# Design System: 云码智创科技

## Overview

**Creative North Star: "The Working Review Room"**

The Working Review Room is a calm enterprise setting where decision-makers, product teams, and engineers inspect the same real system together. The visual language replaces generic technology decoration with evidence: photographed collaboration, visible product interfaces, concrete service structures, and deliberate process detail.

The mood is professional, credible, calm, and precise. Cool white space and graphite type keep the experience lucid; forest green controls establish authority without spectacle. Photographic proof carries the emotional weight, while interface imagery and orderly grids make the work feel inspectable. The system should remain refined and tactile, never glossy, futuristic, or theatrically “AI.”

**Key Characteristics:**

- Image-led enterprise proof, with real collaboration and working software in the same visual world.
- Cool white surfaces, graphite typography, and forest green actions used with restraint.
- Soft 14px geometry, fine dividers, and generous spatial rhythm.
- Clear editorial hierarchy that moves from offer to method, applicable systems, and contact.
- Restrained motion and depth that clarify state, hierarchy, and material structure.

## Colors

The palette is cool, natural, and authoritative: Forest Authority leads interaction, Cool White holds the canvas, Graphite carries information, Quiet Sage separates supporting surfaces, and Brand Cyan remains a precise identity accent.

### Primary

- **Forest Authority** (`colors.forest-authority`): Primary calls to action, active navigation, icons, process markers, and high-emphasis panels.
- **Forest Authority Strong** (`colors.forest-authority-strong`): Hover states and dark green text where the standard forest tone needs stronger contrast.

### Secondary

- **Quiet Sage** (`colors.quiet-sage`): Calm notes, selected supporting surfaces, and low-pressure proof blocks.
- **Brand Cyan** (`colors.brand-cyan`): A retained logo accent, not a general interface highlight.

### Neutral

- **Cool White** (`colors.cool-white`): The site canvas and pale structural sections.
- **Surface White** (`colors.surface-white`): Cards, form fields, photographic shelves, and content sections that need crisp separation.
- **Graphite** (`colors.graphite`): Primary text and the deepest informational tone.
- **Graphite Muted** (`colors.graphite-muted`): Explanatory body copy and secondary information.
- **Quiet Sage Line** (`colors.quiet-sage-line`): Fine dividers, card boundaries, and process structure.

### Named Rules

**The Forest Means Action Rule.** Reserve Forest Authority for decisions, active state, and meaningful proof; its restraint gives it authority.

**The Cyan Stays in the Signature Rule.** Brand Cyan belongs to identity moments and must not become a generic technology glow or gradient.

## Typography

**Display Font:** Noto Sans SC Variable (with Geist Sans and sans-serif fallbacks)  
**Body Font:** Noto Sans SC Variable (with Geist Sans and sans-serif fallbacks)  
**Label/Mono Font:** Noto Sans SC Variable for labels; Geist Mono is available only for genuinely technical content.

**Character:** A single high-quality Chinese sans-serif family creates an assured, contemporary enterprise voice. Weight, scale, line length, and disciplined negative tracking provide hierarchy; novelty fonts do not.

### Hierarchy

- **Display** (660, responsive 48–84px, 1.06): Inner-page statements and the largest decision-setting headlines.
- **Headline** (650, responsive 34–58px, 1.12): Section openings and major explanatory turns.
- **Title** (620, 24px, 1.3): Service rows, cards, and compact content groups.
- **Body** (400, 17px, 1.75): Explanatory copy, generally held between 42ch and 64ch to preserve scanning.
- **Label** (620, 14px, 1.4): Navigation, field labels, tags, and compact metadata; sentence case remains the default.

### Named Rules

**The Weight Builds Hierarchy Rule.** Use the shared sans family across the interface and create distinction through measured weight and scale, not decorative type switching.

**The Headline Must Breathe Rule.** Balance major headings, keep them compact in measure, and preserve the implemented negative tracking at display sizes.

## Layout

The primary container is fluid with a 1400px ceiling and 24px side clearance on wide screens. Clearance compresses to 16px below 900px. Sections use a generous responsive vertical rhythm (`spacing.section`), with a tighter 76px mobile rhythm. Wide layouts favor asymmetric grids—typically 40/60, 1.15/0.85, or 1.25/0.75—to set concise explanation beside dominant evidence.

Desktop composition is structured by editorial grids, hairline dividers, and large proof images rather than repeated floating boxes. At 900px, major two-column regions collapse, navigation becomes a disclosure menu, process tracks reduce to two columns, and proof modules stack. At 640px, catalogs, cards, forms, and process tracks resolve to one column while maintaining 32px total horizontal viewport clearance.

**The Evidence Gets the Larger Column Rule.** When copy and proof share a row, concise explanation yields visual area to photography or a working interface.

**The First Viewport Is Surface-Specific Rule.** Preserve the global visual world here, but keep each page’s first-viewport composition in its surface brief rather than promoting it into a universal template.

## Elevation & Depth

Elevation is restrained and structural. Most hierarchy comes from tonal layering, borders, overlap, and photographic planes; shadows are reserved for a product interface rising over photography, a proof seal, hover-responsive controls, and the mobile navigation layer. Shadows use green-black neutrals and broad, low-opacity falloff so surfaces feel physically present without becoming glossy.

### Shadow Vocabulary

- **Control Lift** (`0 12px 30px rgba(11, 85, 61, 0.18)`): Primary controls at rest; pair with only a one-pixel hover lift.
- **Proof Overlay** (`0 32px 70px rgba(28, 39, 34, 0.17), 0 2px 8px rgba(28, 39, 34, 0.08)`): Product interface panels that physically overlap photography.
- **Media Lift** (`0 26px 60px rgba(25, 42, 34, 0.15)`): Large standalone interface imagery.
- **Floating Seal** (`0 16px 40px rgba(25, 42, 34, 0.13)`): Compact credibility notes attached to a larger visual.
- **Mobile Menu** (`0 18px 30px rgba(17, 24, 20, 0.08)`): The temporary navigation layer below the sticky header.

### Named Rules

**The Structure Before Shadow Rule.** Establish depth with surface tone, edge, and overlap first; add shadow only when an element is materially raised.

## Shapes

The form language uses gently softened rectangles, fine borders, and exact circular process markers. Content surfaces and image frames use the 14px surface radius; controls use 10px; smaller disclosures and status messages use 9–12px. These corners are soft enough to feel tactile but never bubbly. Images are clipped decisively inside their host geometry, and large sections usually stay square to preserve editorial structure.

**The Fourteen-Pixel Surface Rule.** Use the shared 14px radius for major cards, proof frames, and CTA panels; do not introduce arbitrary large-radius containers.

## Components

Components are refined and tactile: quiet at rest, explicit in state, and engineered to support evidence rather than decorate it.

### Buttons

- **Shape:** Compact soft rectangle with a 10px radius, a 46px minimum height, and 21px horizontal padding.
- **Primary:** Forest Authority with white text, medium-strong label weight, and the Control Lift shadow.
- **Hover / Focus:** Deepen to Forest Authority Strong, translate upward by 1px on hover, compress to 98% on active, and use the shared 3px translucent forest focus outline.
- **Light:** Cool White with strong forest text, used only on dark forest panels; it resolves to white on hover.

### Cards / Containers

- **Corner Style:** Gently curved 14px surface geometry.
- **Background:** Primarily Surface White on Cool White; Quiet Sage and Forest Authority are reserved for meaningful alternation or emphasis.
- **Shadow Strategy:** Flat by default. Photography and product proof may use the structural elevation vocabulary.
- **Border:** Use Quiet Sage Line for grouped shelves, timelines, and information rows rather than outlining every card.
- **Internal Padding:** Usually 24–34px for compact cards and 36–68px for large detail surfaces.

### Inputs / Fields

- **Style:** White field, 1px cool gray-green stroke, 10px radius, 50px single-line height, and inherited body typography.
- **Focus:** Shift the stroke to Forest Authority and add a 3px translucent forest ring.
- **Error / Success:** Use contained, softly rounded status panels; errors are warm muted red, while success uses Quiet Sage with strong forest text.

### Navigation

The desktop header is a 72px sticky translucent Cool White bar with blur, centered 14px links, and a compact primary contact action. Hover and current state turn Forest Authority; the current item gains a precise 2px bottom rule. Below 900px, navigation becomes a 42px menu control and a full-width white disclosure layer with quiet separators.

### FAQ Rows

FAQ items use 82px minimum-height question rows, plus/minus state icons in Forest Authority, and divider-led grouping. Expanded answers retain a restrained 64ch measure and generous 1.8 line height.

### Proof Imagery

Photographs establish human collaboration; product interfaces establish technical substance. Image crops use natural enterprise environments and should make the work inspectable. Subtle 700ms image scaling may reward hover, but proof must never become ambient decoration.

## Do's and Don'ts

### Do:

- **Do** lead with real enterprise collaboration, visible software, concrete systems, and delivery methods.
- **Do** give photography and product interfaces enough scale to function as proof.
- **Do** use Forest Authority sparingly for controls, active state, icons, and decisive emphasis.
- **Do** maintain cool whites, graphite hierarchy, fine structural dividers, and 14px surface geometry.
- **Do** honor keyboard focus, WCAG AA contrast, and reduced-motion preferences.

### Don't:

- **Don't** use cyberpunk, code rain, robots, neon AI imagery, or blue-purple technology gradients.
- **Don't** turn Brand Cyan into a glow, wash, or general-purpose action color.
- **Don't** substitute anonymous decorative abstractions for evidence of collaboration and working software.
- **Don't** over-card the page or put every section inside a floating rounded container.
- **Don't** use unverified client logos, metrics, testimonials, or interface mockups as claims of completed work.
