# Loïc Vandenberghe — portfolio

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
- `src/styles/palette.css` is the single source for theme palettes: Matrix (the default), Catppuccin Dark (Mocha), Catppuccin Light (Latte), and WhiteSur. Hover colors, borders, overlays, and shadows derive from the palette using CSS variables and `color-mix()`. Themes only change colors; `--page-background-image` and `--page-background-size` support future background variations.
- `src/themes.ts` owns theme selection, persistence, and browser theme color updates. `ThemeSwitcher.svelte` provides the shared, keyboard-accessible selector in the header and beside the Hero palette. The saved selection is restored before the app mounts; unavailable storage falls back to Matrix without disabling switching.
- `src/styles/global.css` defines shared typography, layout primitives, and accessibility styles.
- `src/profil_ascii.txt` supplies the portrait. Project images are imported from `assets/images/works/` so Vite generates versioned asset URLs.
- `public/` contains the favicon and custom-domain `CNAME`, copied directly into the build.

## Interactions

The sticky tmux-style header links to each section, with rounded segment separators and a highlighted window that follows the current section. On narrow screens, the navigation scrolls horizontally.

The portrait scan line pauses when offscreen or in a background tab, includes a manual pause control, and respects reduced-motion preferences. Observers and event listeners are cleaned up when the component unmounts.

## Deployment

Deploy the contents of `dist/` to a static host after `npm run build`. The app uses client-side Svelte rendering and hash navigation, so no server runtime or route rewrites are needed. JavaScript is required to render the page. For GitHub Pages, publish the built output rather than the source directory; `dist/CNAME` preserves the existing custom domain.
