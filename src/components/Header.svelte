<script lang="ts">
  import { onMount } from 'svelte';
  import { sections } from '../content';
  import ThemeSwitcher from './ThemeSwitcher.svelte';

  const windows = Object.values(sections);
  let { active }: { active: string } = $props();
  let navigation: HTMLElement;
  let now = $state(new Date());
  const timeFormat = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });

  onMount(() => {
    const clock = window.setInterval(() => (now = new Date()), 1000);
    return () => window.clearInterval(clock);
  });

  $effect(() => {
    const tab = navigation?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!tab) return;
    const tabBounds = tab.getBoundingClientRect();
    const navBounds = navigation.getBoundingClientRect();
    if (tabBounds.left < navBounds.left) {
      navigation.scrollLeft -= navBounds.left - tabBounds.left + 4;
    } else if (tabBounds.right > navBounds.right) {
      navigation.scrollLeft += tabBounds.right - navBounds.right + 4;
    }
  });
</script>

<header class="tmux-bar">
  <a class="session" href="#about" aria-label="Loïc Vandenberghe — home">
    Loïc Portfolio
  </a>

  <nav aria-label="Main navigation" bind:this={navigation}>
    {#each windows as window, index (window.id)}
      <a
        class="window"
        class:active={active === window.id}
        href={`#${window.id}`}
        aria-current={active === window.id ? 'location' : undefined}
        aria-keyshortcuts={`${index}`}
        title={`${window.title} (${index}) · Page Up/Down: sections · ↑/←: previous entry · ↓/→: next entry`}
      >
        <span class="window-number" aria-hidden="true">{index}:</span>
        <span class="window-name"
          >{window.id}<span class="window-marker" aria-hidden="true"
            >{active === window.id ? '*' : ''}</span
          ></span
        >
      </a>
    {/each}
  </nav>

  <div class="session-status">
    <ThemeSwitcher compact />
    <time class="session-time" datetime={now.toISOString()}
      >{timeFormat.format(now)}</time
    >
  </div>
</header>

<style>
  .tmux-bar {
    z-index: 5;
    display: flex;
    align-items: center;
    gap: 6px;
    min-height: 30px;
    padding: 3px 0;
    border-radius: 8px 8px 0 0;
    overflow: clip;
    background: var(--color-background);
    font: 16px/1 var(--font-mono);
  }
  .session,
  .window,
  .session-status {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    white-space: nowrap;
  }
  .session {
    height: 24px;
    padding: 0 12px 0 10px;
    border-radius: 0 12px 12px 0;
    background: var(--color-accent);
    color: var(--color-on-accent);
    font-weight: 600;
  }
  .session:hover {
    background: var(--color-accent-hover);
    color: var(--color-on-accent);
  }
  nav {
    display: flex;
    align-items: center;
    gap: 0;
    flex: 1;
    min-width: 0;
    overflow-x: auto;
    scrollbar-width: none;
  }
  nav::-webkit-scrollbar {
    display: none;
  }
  .window {
    height: 24px;
    padding: 0 9px;
    border-radius: 12px;
    color: var(--color-muted);
  }
  .window-number {
    color: var(--color-text-secondary);
  }
  .window-marker {
    display: inline-block;
    width: 1ch;
  }
  .window:hover {
    background: var(--color-surface-raised);
    color: var(--color-text);
  }
  .window.active {
    background: var(--color-accent);
    color: var(--color-on-accent);
    font-weight: 600;
  }
  .window.active .window-number {
    color: inherit;
  }
  .session:focus-visible,
  .window:focus-visible {
    outline-offset: -2px;
  }
  .session-status {
    margin-left: auto;
    height: 24px;
    border-radius: 12px 0 0 12px;
    background: var(--color-surface-raised);
    color: var(--color-muted);
    font-variant-numeric: tabular-nums;
  }
  .session-time {
    display: flex;
    align-items: center;
    height: 24px;
    padding: 0 10px 0 12px;
    border-radius: 12px 0 0 12px;
    background: var(--color-accent);
    color: var(--color-on-accent);
  }
  @media (max-width: 640px) {
    .tmux-bar {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 3px 0;
      font-size: 14px;
    }
    .session {
      display: block;
      width: fit-content;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 24px;
    }
    nav {
      grid-column: 1 / -1;
      grid-row: 2;
    }
  }
</style>
