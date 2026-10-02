import { mount } from 'svelte';
import App from './App.svelte';
import './styles/palette.css';
import './styles/global.css';
import { initializeTheme } from './themes';

initializeTheme();

mount(App, { target: document.getElementById('app')! });
