<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    id,
    command,
    title,
    label,
    intro,
    children,
  }: {
    id: string;
    command: string;
    title: string;
    label: string;
    intro?: string;
    children: Snippet;
  } = $props();
</script>

<section {id} aria-labelledby={`${id}-title`} tabindex="-1">
  <p class="prompt"><span class="accent">$</span> {command}</p>
  <div class="section-heading">
    <h2 id={`${id}-title`}>{title}<span class="accent">.</span></h2>
    <span class="eyebrow">{label}</span>
  </div>
  {#if intro}<p class="section-intro">{intro}</p>{/if}
  {@render children()}
</section>

<style>
  .section-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }
  .section-heading > .eyebrow {
    color: var(--color-muted);
    flex-shrink: 0;
    font-size: 9px;
  }
  .section-intro {
    font-size: 13px;
    color: var(--color-muted);
    margin-top: 14px;
    max-width: 550px;
  }
  @media (max-width: 580px) {
    .section-heading {
      align-items: flex-start;
      gap: 12px;
    }
    .section-heading > .eyebrow {
      font-size: 7px;
      padding-top: 7px;
    }
    .section-intro {
      font-size: 12px;
    }
  }
</style>
