import { readonly, writable } from 'svelte/store';

export const themes = [
  { id: 'garnet', label: 'Garnet' },
  { id: 'catppuccin-dark', label: 'Catppuccin' },
  { id: 'swiss', label: 'Swiss' },
  { id: 'whitesur', label: 'WhiteSur' },
] as const;

type ThemeId = (typeof themes)[number]['id'];
const defaultTheme: ThemeId = 'swiss';
const storageKey = 'portfolio-theme';
const selectedTheme = writable<ThemeId>(defaultTheme);

export const theme = readonly(selectedTheme);

function isTheme(value: unknown): value is ThemeId {
  return themes.some(({ id }) => id === value);
}

function applyTheme(id: ThemeId) {
  document.documentElement.dataset.theme = id;
  selectedTheme.set(id);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute(
      'content',
      getComputedStyle(document.documentElement)
        .getPropertyValue('--color-background')
        .trim(),
    );
}

export function setTheme(value: string) {
  if (!isTheme(value)) return;
  applyTheme(value);
  try {
    localStorage.setItem(storageKey, value);
  } catch {
    // Theme switching still works when browser storage is unavailable.
  }
}

export function initializeTheme() {
  let savedTheme: string | null = null;
  try {
    savedTheme = localStorage.getItem(storageKey);
  } catch {
    // Use the default when browser storage is unavailable.
  }
  applyTheme(isTheme(savedTheme) ? savedTheme : defaultTheme);
}
