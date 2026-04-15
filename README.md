# The Bandit Collective Website

Astro static site for The Bandit Collective, an editorial interiors studio. This repo is a native Astro rebuild of an earlier Wix/custom-HTML prototype and is currently in an active design-refinement phase.

This README is intended as a handover doc: a new Codex/chat session should be able to understand the project state, where the important files live, what has recently changed, and what to be careful with.

## Current Project Brief

The site should feel quiet, editorial, image-led, and warm. The current work focuses on adapting content and visual references from the old Wix site into clean Astro components without preserving Wix-specific classes, IDs, scripts, or layout scaffolding.

Primary goals:

- Build a native Astro homepage that visually follows the Wix reference sections.
- Preserve the existing Astro routing, global styling conventions, and GitHub Pages base-path handling.
- Keep the site maintainable: section-specific Astro components, local assets, no Wix JS/classes.
- Continue refining the desktop homepage section-by-section using screenshots from the user.

## Stack

- Framework: Astro
- Styling: component-scoped Astro CSS plus `src/styles/global.css`
- Content: Astro content collections with `zod`
- Forms: Formspree via `PUBLIC_FORMSPREE_ENDPOINT`
- Hosting target: GitHub Pages/static output
- Fonts loaded in `src/layouts/BaseLayout.astro`:
  - Heading: `Cormorant Garamond`
  - Body: `Manrope`

## Local Commands

From the project root:

```powershell
$env:Path='C:\Program Files\nodejs;' + $env:Path; $env:ASTRO_TELEMETRY_DISABLED='1'; & 'C:\Program Files\nodejs\npm.cmd' run build
```

Common commands:

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
npm.cmd run check
```

On this machine, direct `npm run build` may fail if `node` is not on `PATH`. Use the explicit PowerShell command above if that happens.

## Important Paths

Core layout and styling:

- `src/layouts/BaseLayout.astro`
- `src/styles/global.css`
- `src/lib/paths.ts`

Homepage:

- `src/pages/index.astro`
- `src/components/HomeStatement.astro`
- `src/components/HomeLookbook.astro`
- `src/components/HomeSpectrumFeature.astro`
- `src/components/HomeContact.astro`
- `src/components/HomePressStrip.astro`

Existing older homepage components still present, but no longer used by the homepage:

- `src/components/FeaturedCarousel.astro`
- `src/components/RevealTextBlock.astro`
- `src/components/ContactForm.astro`
- `src/components/PressBanner.astro`

Interiors:

- `src/pages/interiors/index.astro`
- `src/pages/interiors/[slug]/index.astro`
- `src/components/ProjectTile.astro`
- `src/components/CrossfadeStack.astro`

Other pages:

- `src/pages/services.astro`
- `src/pages/shop.astro`
- `src/pages/contact.astro`
- `src/components/PlaceholderPage.astro`

Wix reference exports:

- `wix-reference/wix_reference-home-statement.html.txt`
- `wix-reference/wix_reference-home-carousel.html.txt`
- `wix-reference/wix_reference-home-spectrum-image.html.txt`
- `wix-reference/wix_reference-contact.html.txt`
- `wix-reference/wix_reference-home-press-strip.html.txt`

Image assets:

- Hero: `public/images/home/home-hero.jpg`
- Spectrum feature: `public/images/home/home-hero-2.jpg`
- Lookbook carousel: `public/images/home/home carousel/`
- Press logos: `public/images/press/`

## Current Homepage Structure

The homepage currently renders:

1. Full-screen hero image with a small animated down arrow.
2. `HomeStatement` section adapted from the Wix statement reference.
3. `HomeLookbook` carousel adapted from the Wix lookbook reference.
4. `HomeSpectrumFeature` full-screen image/text feature adapted from the Wix spectrum reference.
5. `HomeContact` contact form adapted from the Wix contact reference.
6. `HomePressStrip` press logo strip adapted from the Wix press reference.

The homepage imports and renders these components in `src/pages/index.astro`.

## Header Behavior

Header lives in `src/layouts/BaseLayout.astro`.

Current intended behavior:

- Site title is `THE BANDIT COLLECTIVE`, all caps.
- Header is fixed.
- Home page starts transparent over the hero.
- Other pages start with the existing filled header color.
- On scroll, the header smoothly transitions to `rgba(0, 0, 0, 0.3)`.
- Header text/nav/toggle stay white in the scrolled state.
- Header background transition is driven by a `--header-scroll-progress` CSS variable updated in inline JS.

Be careful editing this file because it controls all pages and the mobile menu.

## Homepage Section Notes

### HomeStatement

File: `src/components/HomeStatement.astro`

Current design target from screenshot:

- Full viewport-height area below the header.
- Centered text block.
- Heading should break as:
  - `Curating spaces that`
  - `tell your story`
- The word `your` should be italic.
- Large Cormorant Garamond headline with generous tracking.
- Supporting copy below in Cormorant Garamond.
- It uses a lightweight reveal animation with `IntersectionObserver`.

If the user asks for further tuning, adjust only this component unless the issue is clearly global.

### HomeLookbook

File: `src/components/HomeLookbook.astro`

Uses local images from:

- `public/images/home/home carousel/ClintonStreet_012.jpg`
- `public/images/home/home carousel/ClintonStreet_312A.jpg`
- `public/images/home/home carousel/DSC_3061-1.jpg`
- `public/images/home/home carousel/DSC_3078-3.jpg`
- `public/images/home/home carousel/DSC_3116-1.jpg`
- `public/images/home/home carousel/DSC_3251-1 crop.jpg`

Current intended behavior:

- Large horizontal lookbook carousel with 4:5 cards.
- Cards should take up most of the desktop viewport height.
- A partial next card should be visible at the right edge.
- Right arrow is faint by default and becomes more visible on hover.
- Left arrow is hidden at the beginning and appears after moving right.
- Dots are centered below the carousel and render as circular dots.
- Active dot updates when arrows or horizontal trackpad gestures move the carousel.
- Vertical mouse/trackpad scrolling should not move carousel images; it should continue down the page.
- Only horizontal trackpad/wheel gestures should move through carousel images.
- The final card says `See the complete story`.
- The final card itself is not a link; only the arrow inside the final card links to `/interiors`.
- The CTA under the carousel says `Step inside the full collection`.

Important implementation detail:

- The carousel is currently transform-based, not native horizontal scrolling.
- This was changed because native overflow scrolling was behaving inconsistently and the dots were drifting right.
- Arrow/dot navigation updates `activeIndex` and applies `track.style.transform`.
- The right arrow should stop once the final card is fully visible, without allowing extra blank space to the right.
- Recent user feedback specifically focused on desktop: if all remaining images/final card are already visible, dot navigation should not advance beyond the last position that changes the carousel.

If continuing work here, test these cases manually in the browser:

- Right arrow advances the carousel.
- Left arrow returns the carousel.
- Horizontal trackpad scroll moves the carousel.
- Vertical trackpad/mouse scroll moves down the page, not through carousel images.
- Dots remain centered.
- Dots remain circles, not dashes.
- Final card can be fully visible.
- No blank space appears to the right of the final card.
- Right arrow disappears when no further visible movement is possible.

### HomeSpectrumFeature

File: `src/components/HomeSpectrumFeature.astro`

Current intended behavior:

- Full-screen feature section.
- Uses `public/images/home/home-hero-2.jpg`.
- Image fills available screen area.
- Text band reads: `From the first color` -> arrow -> `to the final detail`.
- The section no longer uses negative `100vw` full-bleed positioning because that was causing horizontal drift.

### HomeContact

File: `src/components/HomeContact.astro`

Current intended behavior:

- Centered, minimal contact form.
- Headline: `Start your story`
- Fields: name, email, phone optional, message.
- Submit label: `Send it our way`
- Uses `PUBLIC_FORMSPREE_ENDPOINT` if configured.
- If endpoint is missing, the form stays visually ready and shows a status message asking for the endpoint.

### HomePressStrip

File: `src/components/HomePressStrip.astro`

Current intended behavior:

- Label: `As seen in`
- Uses local logo assets from `public/images/press/`
- Logos currently referenced:
  - `Veranda-logo.png`
  - `adpro_logo.png`
  - `CG_Logo_BLACK-site.jpg`
- Logos are grayscale/low-opacity by default and brighten on hover.

## Base Path Rules

The site uses `withBase()` from `src/lib/paths.ts` for internal links and public assets. Keep using it for links/assets that start at the site root.

Do this:

```astro
import { withBase } from '../lib/paths';
<a href={withBase('/interiors')}>Interiors</a>
<img src={withBase('/images/home/home-hero.jpg')} alt="..." />
```

Avoid hardcoding root-relative links/assets directly unless there is a deliberate reason.

## Content Model

Projects live in:

- `src/content/projects/<project-folder>/`

Each project currently uses:

- `index.md`
- colocated project imagery

Schema fields currently in use:

- `title`
- `location`
- `year`
- `shortDescription`
- `coverImages`
- `heroImages`
- `storyImages`
- `nextProjectSlug`
- `sortOrder`
- `featured`
- `featuredLabel`
- `diptychs` optional for future use

Astro reserves `slug`, so routes use `entry.slug` instead of a custom `data.slug`.

Starter/demo projects currently exist for:

- `brooklyn-loft`
- `cotswold-house`
- `coastal-study`

These should eventually be replaced with real project content and photography.

## Current Routes

- `/`
- `/interiors`
- `/interiors/[slug]`
- `/services`
- `/shop`
- `/contact`

## Environment Variables

See `.env.example`.

Expected variables:

- `PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id`
- `SITE_URL=https://your-domain.com`

## Git And Safety Notes For Future Agents

- Do not revert user changes unless the user explicitly requests it.
- This worktree may already have uncommitted edits.
- Prefer `apply_patch` for manual edits.
- Prefer PowerShell-safe commands in this Windows workspace.
- `rg` may fail with `Access is denied` in this environment; use PowerShell `Get-ChildItem` and `Select-String` if needed.
- Run `npm run build` with the explicit Node path command if normal npm commands fail.

## Verification Status

Most recent verification during this handover:

```powershell
$env:Path='C:\Program Files\nodejs;' + $env:Path; $env:ASTRO_TELEMETRY_DISABLED='1'; & 'C:\Program Files\nodejs\npm.cmd' run build
```

Status: passes.

## Current Follow-Up Context

The active refinement thread is focused on the homepage, especially the lookbook carousel desktop behavior. The user is comparing against screenshots and wants section-by-section visual matching.

Most recent completed requests:

- Header text/opacity/scroll behavior updated.
- Wix reference sections rebuilt as Astro components.
- Home statement widened so the headline breaks into two intended lines.
- Carousel dots centered and forced to render as circles.
- Carousel changed from native overflow-scroll to controlled transform navigation.
- Vertical scroll no longer moves carousel images; only horizontal trackpad gestures do.
- Final carousel card hyperlink removed except for the arrow icon.

If the next session starts here, the highest-value next step is likely to run the site locally, visually inspect the `HomeLookbook` section on desktop, and tune the final-card clamp/right-arrow/dot behavior based on what is visible in the browser.
