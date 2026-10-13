<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LucideIcon } from '@lucide/svelte';
  import SectionHeading from './SectionHeading.svelte';

  let {
    id,
    command,
    title,
    icon,
    children,
  }: {
    id: string;
    command: string;
    title: string;
    icon: LucideIcon;
    children: Snippet;
  } = $props();
</script>

<section {id} aria-labelledby={`${id}-title`} tabindex="-1">
  <SectionHeading id={`${id}-title`} {title} {icon} {command} />
  {@render children()}
</section>

<style>
  .section-intro {
    font-size: 17px;
    line-height: 1.6;
    color: var(--color-muted);
    margin-top: 14px;
    max-width: 550px;
  }
</style>
