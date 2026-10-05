<script lang="ts">
  import { sections } from '../content';

  const lastShortcut = Math.min(Object.keys(sections).length - 1, 9);
</script>

<aside class="keyboard-help" aria-label="Keyboard shortcuts">
  <span><kbd>0–{lastShortcut}</kbd> select section</span>
  <span><kbd>PageUp</kbd> / <kbd>PageDown</kbd> change section</span>
  <span><kbd>↑</kbd> / <kbd>←</kbd> previous entry</span>
  <span><kbd>↓</kbd> / <kbd>→</kbd> next entry</span>
</aside>

<style>
  .keyboard-help {
    display: none;
    position: absolute;
    top: calc(100% + 10px);
    inset-inline: 0;
    align-items: center;
    justify-content: center;
    gap: 24px;
    color: var(--color-muted);
    font: 12px/20px var(--font-mono);
    white-space: nowrap;
  }
  kbd {
    padding: 1px 4px;
    border: 1px solid var(--color-border);
    border-radius: 3px;
    background: var(--color-surface);
    color: var(--color-text-secondary);
    font: inherit;
  }
  @media (min-width: 800px) and (min-height: 900px) {
    .keyboard-help {
      display: flex;
    }
  }
</style>
