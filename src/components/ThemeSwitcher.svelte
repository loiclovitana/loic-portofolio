<script lang="ts">
  import Palette from '@lucide/svelte/icons/palette';
  import { setTheme, theme, themes } from '../themes';

  let { compact = false }: { compact?: boolean } = $props();
  const themeLabel = $derived(
    themes.find(({ id }) => id === $theme)?.label ?? '',
  );
</script>

<div class="theme-switcher">
  {#if compact}
    <span class="palette-icon" aria-hidden="true">
      <Palette size={16} strokeWidth={1.8} />
    </span>
  {/if}
  <select
    class:compact
    style:--theme-name-width={`${themeLabel.length}ch`}
    aria-label="Color theme"
    value={$theme}
    onchange={(event) => setTheme(event.currentTarget.value)}
  >
    {#each themes as option (option.id)}
      <option value={option.id}>{option.label}</option>
    {/each}
  </select>
</div>

<style>
  .theme-switcher {
    position: relative;
    display: inline-flex;
    max-width: 100%;
  }
  .palette-icon {
    position: absolute;
    inset-block: 0;
    left: 12px;
    display: flex;
    align-items: center;
    pointer-events: none;
  }
  select {
    max-width: 100%;
    min-height: 32px;
    padding: 4px 8px;
    border: 1px solid var(--color-border-strong);
    border-radius: 4px;
    background: var(--color-surface-raised);
    color: var(--color-text);
    font: 12px/1.4 var(--font-mono);
    cursor: pointer;
  }
  select:hover {
    border-color: var(--color-border-hover);
  }
  select:focus-visible {
    outline-offset: -2px;
  }
  .compact {
    appearance: none;
    /* Match the monospace label plus the icon and horizontal padding. */
    width: calc(var(--theme-name-width) + 34px + 9px);
    min-height: 24px;
    height: 24px;
    padding: 0 9px 0 34px;
    border: 0;
    border-radius: 12px 0 0 12px;
    background: transparent;
    color: inherit;
    font: inherit;
  }
  option {
    background: var(--color-surface-raised);
    color: var(--color-text);
  }
</style>
