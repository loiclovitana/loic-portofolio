# Loïc Vandenberghe — portfolio

[![Deploy to GitHub Pages](https://github.com/loiclovitana/loic-portofolio/actions/workflows/deploy-pages.yml/badge.svg?branch=master)](https://github.com/loiclovitana/loic-portofolio/actions/workflows/deploy-pages.yml)

A single-page portfolio built with Svelte 5, TypeScript, and Vite. The terminal-inspired layout includes an ASCII portrait and section navigation.

## Development

Use Node.js 22.12+ (or enter the included Nix environment):

```sh
nix develop path:.
npm ci
npm run dev
```

Open the URL printed by Vite, normally <http://localhost:5173>.

```sh
./bin/check          # Run formatting lint and Svelte/TypeScript checks
npm run check         # TypeScript, Svelte, and accessibility diagnostics
npm run format:check  # Consistent formatting
npm run build        # Production files in dist/
npm run preview      # Serve the production build locally
```

Run `npm run format` to format the source.

## Structure

- `src/App.svelte` composes the page and renders the experience, education, and contact sections.
- `src/components/` contains `Header`, `Hero`, `Portrait`, `Section`, and `ProjectCard`. Each owns its local styles.
- `src/content.ts` holds section commands, projects, experience, education, and social links. The navigation and sections share the same identifiers.
- `src/navigation.ts` owns section selection, URL hash synchronization, keyboard controls, edge scrolling, touch swipes, and transitions. Add `data-nav-item` and `tabindex="-1"` to entries that should participate in arrow navigation.
- `src/styles/palette.css` is the single source for theme palettes: Garnet (the default), Catppuccin Dark (Mocha), Catppuccin Light (Latte), and WhiteSur. Hover colors, borders, overlays, and shadows derive from the palette using CSS variables and `color-mix()`. Each theme also selects a wallpaper and tint.
- `assets/images/backgrounds/` contains optimized WebP wallpapers imported through CSS so Vite generates versioned asset URLs. Garnet uses the sailing sunset, Catppuccin Dark the Lenk winter dusk, Catppuccin Light the Iffigsee alpine lake, and WhiteSur the coast photographed by Christophe Demeyer. Desktop images are at most 2560px on their longest edge; screens up to 800px wide use smaller 960px versions. Original photos remain in the ignored `wallpaper/` working folder and are not shipped.
- `src/themes.ts` owns theme selection, persistence, and browser theme color updates. `ThemeSwitcher.svelte` provides the shared, keyboard-accessible selector in the header and beside the Hero palette. The saved selection is restored before the app mounts; unavailable storage falls back to Garnet without disabling switching.
- `src/styles/global.css` defines shared typography, layout primitives, and accessibility styles.
- `src/profil_ascii.txt` supplies the portrait. Project images are imported from `assets/images/works/` so Vite generates versioned asset URLs.
- `public/` contains the favicon and custom-domain `CNAME`, copied directly into the build.

## Interactions

The tmux-style header stays above a single visible section. Long sections scroll within the available viewport; scrolling again at the bottom or top moves to the next or previous section. Trackpad momentum is consumed after a switch to prevent skipping sections. On touch screens, swipe again at an edge to switch. Transitions respect reduced-motion preferences. On narrow screens, the header navigation scrolls horizontally.

A compact keyboard guide appears beneath the terminal on windows at least 1100px wide and 700px tall, using the existing bottom margin without reducing the section's space.

- `0`–`3`: About, Projects, Experience, Education (matching the header numbers; unused digits do nothing).
- `PageUp` / `PageDown`: previous / next section.
- `↑` or `←` / `↓` or `→`: previous / next entry, then the adjacent section at the boundary. About is selected as a whole. Entering another section with an arrow selects its last / first entry.
- `Tab` and `Enter`: normal link and control navigation. Shortcuts leave form controls and modified key combinations alone.

Selected entries have an accent outline. Section changes replace the current URL hash without adding browser history entries, so direct links remain shareable and Back returns to the previous page. Section links reset the destination to its top. Navigation stops at the first and last section.

The portrait scan line pauses when offscreen or in a background tab, includes a manual pause control, and respects reduced-motion preferences. Observers and event listeners are cleaned up when the component unmounts.

## Deployment

Deploy the contents of `dist/` to a static host after `npm run build`. The app uses client-side Svelte rendering and hash navigation, so no server runtime or route rewrites are needed. JavaScript is required to render the page. For GitHub Pages, publish the built output rather than the source directory; `dist/CNAME` preserves the existing custom domain.
