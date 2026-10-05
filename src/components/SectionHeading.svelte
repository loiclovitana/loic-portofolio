<script lang="ts">
  import type { LucideIcon } from '@lucide/svelte';

  let {
    id,
    title,
    icon: Icon,
    command,
    tag = 'h2',
  }: {
    id?: string;
    title: string;
    icon: LucideIcon;
    command: string;
    tag?: 'h2' | 'p';
  } = $props();
</script>

<div class="section-prompt">
  <svelte:element this={tag} {id} class="prompt-title">
    <span class="icon-segment" aria-hidden="true">
      <Icon size={17} strokeWidth={1.8} />
    </span>
    <span class="name-segment">{title}</span>
  </svelte:element>
  <span class="command" aria-hidden="true">{command}</span>
</div>

<style>
  .section-prompt {
    --segment-height: 34px;
    --tip: 9px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px 8px;
    width: fit-content;
    max-width: 100%;
    font-family: var(--font-mono);
  }
  .prompt-title {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin: 0;
    font: 600 18px / 1 var(--font-mono);
    letter-spacing: 0;
  }
  .icon-segment,
  .name-segment {
    display: flex;
    align-items: center;
    height: var(--segment-height);
    clip-path: polygon(
      0 0,
      calc(100% - var(--tip)) 0,
      100% 50%,
      calc(100% - var(--tip)) 100%,
      0 100%
    );
  }
  .icon-segment {
    justify-content: center;
    position: relative;
    z-index: 2;
    width: 35px;
    padding-right: var(--tip);
    background: var(--color-surface-raised);
    color: var(--color-accent);
  }
  .name-segment {
    position: relative;
    z-index: 1;
    margin-left: calc(-1 * var(--tip));
    padding: 0 17px 0 16px;
    background: var(--color-accent);
    color: var(--color-on-accent);
  }
  .command {
    color: var(--color-text-secondary);
    font-size: 15px;
    line-height: 1.4;
    white-space: nowrap;
  }
  @media (max-width: 580px) {
    .section-prompt {
      --segment-height: 32px;
    }
    .prompt-title {
      font-size: 16px;
    }
    .command {
      font-size: 13px;
    }
  }
</style>
