import { mount } from 'svelte';
import App from './App.svelte';
import './styles/palette.css';
import './styles/global.css';

// Keep the browser chrome in sync with the site's palette.
document
  .querySelector('meta[name="theme-color"]')
  ?.setAttribute(
    'content',
    getComputedStyle(document.documentElement)
      .getPropertyValue('--color-background')
      .trim(),
  );

mount(App, { target: document.getElementById('app')! });
