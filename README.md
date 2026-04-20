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
- `src/components/HomeApproach.astro`
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

Contact-specific implementation:

- `src/pages/contact.astro`
- `src/components/HomeContact.astro`
- `src/layouts/BaseLayout.astro` page-background props and header/footer overlay styles

Wix reference exports:

- `wix-reference/wix_reference-home-statement.html.txt`
- `wix-reference/wix_reference-home-carousel.html.txt`
- `wix-reference/wix_reference-home-spectrum-image.html.txt`
- `wix-reference/wix_reference-contact.html.txt`
- `wix-reference/wix_reference-home-press-strip.html.txt`

Image assets:

- Optimized homepage source images: `src/assets/images/home/`
  - Hero: `src/assets/images/home/hero/`
  - Lookbook carousel: `src/assets/images/home/lookbook/`
  - Spectrum feature assets may still exist, but `HomeSpectrumFeature` is no longer rendered on the homepage.
- Legacy/reference homepage public images still exist in `public/images/home/`, but active homepage hero/lookbook imagery now imports from `src/assets` and is processed by Astro.
- Press logos: `public/images/press/`
- Project images: `src/content/projects/<Project Name>/`
  - Covers: `cover/`
  - Desktop carousel/source story images: `story/`
  - Optional mobile/detail-page diptych imagery: `diptychs/`

## Image Handling

- Homepage hero and lookbook images are imported from `src/assets/images/home/` and rendered with Astro's `Image` component.
- Astro converts those source images to optimized WebP files at build time.
- `public/images/home/optimized/` contains earlier manually compressed WebP files, but the active homepage now uses the Astro asset pipeline instead.
- Assets that must be served directly, such as press logos, remain in `public/images/`.

## Current Homepage Structure

The homepage currently renders:

1. Full-screen hero image.
2. `HomeStatement` section adapted from the Wix statement reference.
3. `HomeLookbook` carousel adapted from the Wix lookbook reference.
4. `HomeApproach` process/approach text section.
5. `HomeContact` contact form adapted from the Wix contact reference, with the title hidden on the homepage.
6. `HomePressStrip` press logo strip adapted from the Wix press reference.

The homepage imports and renders these components in `src/pages/index.astro`.

Recent homepage spacing notes:

- `src/pages/index.astro` uses the `.home-flow` grid for homepage section spacing.
- The lower homepage has been tightened so the gaps between the lookbook CTA, `HomeApproach`, `HomeContact`, and `HomePressStrip` are smaller than the default section rhythm.
- The page-flow bottom padding is removed so the footer begins immediately after the press strip.
- Be careful changing `.home-flow :global(...)` negative margins because those currently control the reduced gaps around the approach/contact/press area.

## Header Behavior

Header lives in `src/layouts/BaseLayout.astro`.

Current intended behavior:

- Site title is `THE BANDIT COLLECTIVE`, all caps.
- Header is fixed.
- The brand/logo link returns to `/`; there is no separate `Home` navigation item.
- On desktop, the non-scrolled header background is transparent across pages.
- On mobile, the home page starts transparent over the hero, while non-home pages keep the existing filled header color unless they use the page-background variant.
- Pages that pass `pageBackgroundColor` or `pageBackgroundImage` to `BaseLayout` use the page-background variant: the header is transparent over the page background, with white header/nav/toggle text.
- On desktop, the brand and primary nav font sizes were reduced by 25% from the earlier large-header treatment.
- On scroll, the header smoothly transitions to `rgba(0, 0, 0, 0.3)`.
- Scroll state is top/not-top: the header shrinks when the user scrolls away from the top and stays shrunk while scrolling upward until `window.scrollY` returns to the top.
- The scrolled header remains smaller than the non-scrolled header, but was increased after the first pass so it is not cramped: desktop scrolled inner height is `51px`, mobile scrolled inner height is `48px`.
- Header contents should stay vertically centered in the scrolled state; do not reintroduce a scroll-based upward `transform` on `.site-header__inner`.
- Header text/nav/toggle stay white in the scrolled state.
- Header background transition is driven by a `--header-scroll-progress` CSS variable updated in inline JS.
- Primary nav links currently include Interiors, Services, Shop, and Contact. The brand link returns home.
- Mobile nav links currently include Interiors, Services, and Contact.
- Mobile nav active state is URL-based; non-root links can match nested paths.
- Mobile hamburger animates smoothly into an X when opened and back to lines when closed.
- Mobile dropdown fades/slides open and uses a 75% black background.

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

- `src/assets/images/home/lookbook/lookbook-01.jpg`
- `src/assets/images/home/lookbook/lookbook-02.jpg`
- `src/assets/images/home/lookbook/lookbook-03.jpg`
- `src/assets/images/home/lookbook/lookbook-04.jpg`
- `src/assets/images/home/lookbook/lookbook-05.jpg`
- `src/assets/images/home/lookbook/lookbook-06.jpg`

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
- Clicking a carousel image opens the existing lightbox/expanded image view.
- The lightbox image is intentionally positioned slightly lower by padding the overlay as `calc(5vh + 51px) 5vw 5vh`, so the expanded image is centered within the visible area below the fixed scrolled header.
- On mobile, the carousel uses native horizontal scroll with CSS scroll-snap and `-webkit-overflow-scrolling: touch`.
- Mobile dots sync from the native `scrollLeft` position.
- Mobile carousel images use natural height (`height: auto`) to avoid viewport-height resizing/jumps when browser UI appears or disappears.
- Mobile scroll/drag suppresses accidental lightbox opens; taps still open the lightbox.
- The final mobile card matches the rendered height of the previous carousel image and snaps to the end so the previous image peeks from the left.

Important implementation detail:

- Desktop carousel remains transform-based.
- Mobile carousel is native scroll-snap. Do not reintroduce custom pointer/touch swipe handling unless there is a clear reason.
- Arrow/dot navigation updates `activeIndex`; desktop applies `track.style.transform`, while mobile uses `track.scrollTo()`.
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
- On mobile, horizontal swiping should move the native scroll carousel smoothly, while vertical swiping should scroll the page normally.
- On mobile, the carousel should not jump or resize while scrolling.

### HomeApproach

File: `src/components/HomeApproach.astro`

Current intended behavior:

- Simple, text-only approach/process section between `HomeLookbook` and `HomeContact`.
- Title: `From First Thought to Final Layer`.
- Three horizontal text blocks on desktop:
  - `01 Listen` with copy: `We design the space around how you want to use it.`
  - `02 Shape` with copy: `From palette and materials to furniture and furnishings. We build you a mood board and help source it all.`
  - `03 Layer` with copy: `The final details that bring your story to life. Textiles, lighting, styling, and maybe some wallpaper?`
- CTA line below: `Have a space in mind? Tell us where the story begins.`
- Earlier versions explored image placeholders, abstract connectors, and a sketched measuring tape. Those were removed; keep the current version simple unless the user asks to revisit them.
- Desktop keeps the three blocks horizontal. Tablet/mobile currently stacks the blocks.

### HomeContact

File: `src/components/HomeContact.astro`

Current intended behavior:

- Centered, minimal contact form.
- Headline: `Start your story` is available by default, but hidden when `showTitle={false}` or when `standalone` is true.
- Props currently include `showEmail`, `standalone`, and `showTitle`.
- Fields: name, email, phone optional, message.
- Submit label: `Send it our way`
- If `showEmail` is true, the form shows `Or email us directly:` with `banditcollective.nyc@gmail.com` below the submit/status area.
- Uses `PUBLIC_FORMSPREE_ENDPOINT` if configured.
- If endpoint is missing, the form stays visually ready and shows a status message asking for the endpoint.
- Home page spacing around this section has been reduced; standalone contact page behavior should remain separate.
- The standalone variant is used by `/contact`. It keeps the page compact enough to fit in one viewport with the header and footer, uses transparent section background, narrows the form, and applies a translucent blurred overlay directly to the form element.

### Contact Page

File: `src/pages/contact.astro`

Current intended behavior:

- `/contact` is a standalone page, not a modal or placeholder.
- It renders `<HomeContact showEmail standalone />`.
- The page passes `pageBackgroundColor="#A69401"` to `BaseLayout`, so the solid background color sits behind the fixed header, the contact form area, and the footer.
- The contact page should remain a no-scroll, single-viewport composition on normal desktop viewports.
- The form floats over the solid background as a translucent readable overlay. Avoid reintroducing a full-width solid section or a separate panel that colors the left/right sides of the page.
- The page does not render the `Start your story` heading.
- Earlier iterations tried a contact background image and a tassel decoration; both were removed. The image file may still exist in `src/assets/images/contact/contact-background.jpg`, but it is not currently imported by `/contact`.
- Header/footer white overlay styling for this page comes from `BaseLayout`'s page-background variant.

### Shop Page

File: `src/pages/shop.astro`

Current intended behavior:

- `/shop` is no longer a generic placeholder page.
- It uses a plain background and presents a compact coming-soon message for the future shop.
- Current page copy:
  - `The Shop Is Coming Soon`
  - `A collected edit of antique furniture, vintage finds, and one-of-a-kind pieces for the home.`
  - `We are gathering pieces slowly and thoughtfully, from markets, dealers, and travels near and far. Each piece will be chosen for its character, craftsmanship, and the quiet history it brings into a home.`
  - `Looking For Something Specific?`
  - `We welcome sourcing inquiries for antique furniture, vintage objects, and characterful pieces for the home.`
- The earlier `Shop` eyebrow/title above the main heading was removed.
- All shop-page text is centered.
- All shop-page text uses the same `1rem` font size, matching the smallest text size from the first pass.
- Spacing was reduced so the page content, fixed header, and footer are intended to be visible together in one viewport without scrolling on normal desktop viewports.
- The sourcing inquiry link remains and routes to `/contact` via `withBase('/contact')`.
- The shop page imports `withBase` from `src/lib/paths.ts` for the contact link and does not use `PlaceholderPage.astro`.

### HomePressStrip

File: `src/components/HomePressStrip.astro`

Current intended behavior:

- Label: `Featured in`
- Uses local logo assets from `public/images/press/`
- Logos currently referenced:
  - `Veranda-logo.png`
  - `adpro_logo.png`
  - `cottages-gardens-logo (1).webp`
- Logos are grayscale/low-opacity by default and brighten on hover.
- The homepage footer should start immediately after this strip; avoid reintroducing bottom page-flow padding below it unless requested.

### Footer

File: `src/layouts/BaseLayout.astro`

Current intended behavior:

- Footer vertical padding was reduced to `1rem 0`, roughly half of the previous footer height.
- Content is: `New York, NY`, `banditcollective.nyc@gmail.com` as a mailto link, Instagram icon/link, and `(c) TBC 2026`, separated by dividers on wider screens.
- The Instagram icon links to `https://www.instagram.com/thebandit.collective` and keeps screen-reader text for accessibility.
- Footer content uses the shared `.shell` width and is left-aligned.
- On mobile, dividers hide and content wraps within a narrow left-aligned footer.
- Pages using the `BaseLayout` page-background variant, including `/contact`, render footer text/links in warm white over the page background.

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

Current real project content exists for:

- `Brooklyn Brownstone`
- `New York Apartment`

Ignore any `Archive` folder under `src/content/projects/`; it is not intended to render as active project content.

Older starter/demo projects may still exist in the repo history or stale notes, but active Interiors work should be based on the real project folders above.

## Interiors And Project Pages Handoff

Current Interiors listing:

- Route: `src/pages/interiors/index.astro`
- Project tiles use `src/components/ProjectTile.astro`.
- Project names are overlaid in uppercase white text centered over each image.
- Desktop hover keeps the existing zoom animation and adds a translucent overlay across the full image.
- Text below the project tiles has been removed.
- The Interiors page is vertically centered between the fixed header and footer.
- Site-wide layout was adjusted so `.site-body` is flex column, `.site-main` flexes, and the old global `main { min-height: 100vh; }` behavior was removed to prevent excess footer whitespace.

Current project detail page:

- Route: `src/pages/interiors/[slug]/index.astro`
- Desktop project page uses a single carousel at the top of the page.
- Mobile still renders the stacked story/diptych page content.
- All text above the images was removed: no back link, project name, description, or location appears above the carousel.
- Desktop carousel uses only `project.data.storyImages`; diptychs are not included in the desktop carousel.
- Diptychs can still exist in content and remain available for the mobile/detail story flow.
- Carousel images must never crop or change aspect ratio. The current CSS uses image frames plus `width: auto`, `height: auto`, `max-width`, `max-height`, and `object-fit: scale-down/contain`.
- Desktop carousel uses stacked absolute slides with a soft opacity crossfade instead of horizontal track movement.
- Carousel loops infinitely: right arrow on the last story image returns to the first; left arrow on the first returns to the last.
- Dots stay synced with the active slide for arrow clicks, dot clicks, wheel/trackpad navigation, and lightbox navigation.
- The desktop project page is tuned to fit header, carousel, dots, project footer line, and site footer within one viewport on normal desktop sizes.
- The line below the dots reads `< Back to all Projects | {Project Name}`.
- `Back to all Projects` links to `/interiors`; the project name is plain text.
- The old `Next Project` footer link/text was removed.

Project lightbox:

- Implemented directly in `src/pages/interiors/[slug]/index.astro`.
- Clicking a desktop carousel image opens the lightbox.
- Lightbox uses the same story-image set and opens at the clicked image index.
- Lightbox navigation wraps infinitely and calls the same carousel index update, so underlying carousel dots remain synced.
- Lightbox supports:
  - Left/right lightbox arrows.
  - Keyboard `ArrowLeft` and `ArrowRight`.
  - `Escape` to close.
  - Clicking outside the image to close.
- Body scroll is locked with `body.has-project-lightbox` while open.
- The lightbox element is intentionally rendered outside the animated `.case-study` article. Do not move it back inside the article: `.case-study` has a transform-based entrance animation, and a transformed ancestor can break `position: fixed` behavior.
- The overlay follows the `HomeLookbook` style: full-screen translucent dark backdrop above header/footer.
- The lightbox image itself is padded so it visually stays between the header and footer and does not overlap them.
- Original project carousel content, dots, back/project line, and original carousel arrows are hidden while the lightbox is open, preventing a second image/second arrows from showing behind the overlay.
- The carousel track focus outline is suppressed to avoid full-width black lines appearing during keyboard interaction.

Be careful when editing project pages:

- Do not reintroduce `object-fit: cover` on project carousel or lightbox images.
- Do not use fixed `width: 100%; height: 100%` directly on project carousel images unless contained by a frame and verified not to crop.
- Do not switch the desktop project carousel back to transform-based horizontal movement unless the user explicitly asks; the soft crossfade was chosen because the slide-out animation felt distracting.
- Do not desync lightbox navigation from carousel navigation/dots.
- If changing lightbox positioning, remember the user wants the overlay backdrop over the whole page while the displayed image remains visually between header and footer.


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

## Layout Variants

`BaseLayout` supports optional page-level background props:

- `pageBackgroundColor`: sets a solid background color behind the header, main content, and footer.
- `pageBackgroundImage`: renders a fixed image layer behind the header, main content, and footer.
- `pageBackgroundOverlay`: opacity for the dark overlay over `pageBackgroundImage`.
- `pageBackgroundPosition`: object-position for `pageBackgroundImage`.

Current usage:

- `/contact` uses `pageBackgroundColor="#A69401"` and does not use `pageBackgroundImage`.
- When either background prop is present, `BaseLayout` applies the `has-page-background` variant so header/footer text becomes light and overlays the page background.

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

The active refinement thread is focused on the homepage, especially section spacing, homepage simplicity, and visual polish around the lookbook carousel and contact area. The user is comparing against the local browser preview and wants section-by-section tuning.

Most recent completed requests:

- Header desktop typography was reduced, desktop non-scrolled background was removed, scroll behavior now shrinks on any non-top scroll position, and the scrolled header content was re-centered vertically.
- The separate `Home` nav item was removed; the brand/logo remains the home link.
- Footer height was reduced, footer content moved left, and the footer copy now uses New York location, email link, Instagram icon link, and `(c) TBC 2026`.
- Header text/opacity/scroll behavior updated.
- Wix reference sections rebuilt as Astro components.
- Home statement widened so the headline breaks into two intended lines.
- Carousel dots centered and forced to render as circles.
- Carousel changed from native overflow-scroll to controlled transform navigation.
- Vertical scroll no longer moves carousel images; only horizontal trackpad gestures do.
- Final carousel card hyperlink removed except for the arrow icon.
- `HomeSpectrumFeature` was removed from the homepage render.
- New `HomeApproach.astro` was created and iterated through several concepts. The current kept version is simple text only: title, three short process blocks, and CTA line.
- The homepage now renders `HomeApproach` between `HomeLookbook` and `HomeContact`.
- Homepage contact title is hidden by passing `showTitle={false}` to `HomeContact`.
- Homepage spacing around the lookbook CTA, approach section, contact form, press strip, and footer has been tightened through `index.astro`, `HomeApproach.astro`, and `HomeContact.astro`.
- Extra bottom page-flow padding after `HomePressStrip` was removed so the footer begins directly after the press strip.
- `HomeLookbook` lightbox/expanded image behavior was preserved, but the overlay padding was adjusted so the expanded image sits lower and is balanced between the bottom of the fixed header and bottom of the viewport.
- Contact navigation now routes to the standalone `/contact` page instead of opening a site-wide popup.
- The global contact modal in `BaseLayout` was removed.
- Services page current state: `src/pages/services.astro` is now a one-screen editorial split layout on desktop, intended to keep header, page content, and footer visible without desktop scrolling. Mobile/tablet stacks naturally and may scroll.
- Services page image: imports `src/assets/images/services/services-01.jpg` through Astro's `Image` component with `format="webp"`, so the built site serves an optimized WebP. The image is shown uncropped with `object-fit: contain`; avoid reintroducing a visible background/frame behind it.
- Services page content: old stacked `Consultations` / `Full Interiors` sections, image cycling, bottom CTA line, and Services-page-specific contact modal/CTA were removed. The page now shows two service groups: `Interior Design & Decorating` with `Residential Design` and `Commercial Design`, and `Consultations` with `Color` and `Lighting`.
- Services page copy: `Interior Design & Decorating` tagline is `A considered approach to spaces that need a complete point of view, from the initial design to the final layer.` `Consultations` tagline is `Focused guidance for the details that shape how a space comes together.`
- Services page layout notes: the image container is sized to the source portrait aspect ratio to prevent the cream page background from appearing as a frame around the uncropped image. The text column was moved closer to the image, text was resized after review, and extra vertical space was added between the two service groups.
- `/contact` now uses a solid page background color `#A69401` through `BaseLayout`'s page-background variant.
- `/contact` uses `HomeContact` in standalone mode with no heading, visible direct email, a translucent blurred form overlay, and slightly increased spacing between form fields/actions.
- The canonical contact email used in form fallback/status text is `banditcollective.nyc@gmail.com`.

Important git/worktree context:

- This worktree has many uncommitted changes beyond the most recent homepage edits. The user has been advised that if they review the local site and like the current version, the next step is to commit the current state rather than revert it.
- Do not run broad cleanup commands or reset the worktree unless the user explicitly asks and confirms what should be discarded.
- If asked to organize Git changes, first show the current `git status --short`, then group changes into logical buckets before staging.

If the next session starts here, the highest-value next step is likely to run the site locally, visually inspect the homepage from `HomeLookbook` through footer, and tune remaining spacing/visual details based on what is visible in the browser.
