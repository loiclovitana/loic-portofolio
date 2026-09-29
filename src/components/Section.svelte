<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LucideIcon } from '@lucide/svelte';
  import SectionHeading from './SectionHeading.svelte';

  let {
    id,
    command,
    title,
    icon,
    intro,
    children,
  }: {
    id: string;
    command: string;
    title: string;
    icon: LucideIcon;
    intro?: string;
    children: Snippet;
  } = $props();
</script>

<section {id} aria-labelledby={`${id}-title`} tabindex="-1">
  <SectionHeading id={`${id}-title`} {title} {icon} {command} />
  {#if intro}<p class="section-intro">{intro}</p>{/if}
  {@render children()}
</section>

<style>
  .section-intro {
    font-size: 13px;
    color: var(--color-muted);
    margin-top: 14px;
    max-width: 550px;
  }
  @media (max-width: 580px) {
    .section-intro {
      font-size: 12px;
    }
  }
</style>
