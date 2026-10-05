<script lang="ts">
  import { sections } from '../content';

  let { active }: { active: string } = $props();
</script>

<nav class="app-bar" aria-label="Main navigation">
  {#each Object.values(sections) as section (section.id)}
    <a
      href={`#${section.id}`}
      aria-current={active === section.id ? 'location' : undefined}
    >
      <section.icon size={22} strokeWidth={1.8} aria-hidden="true" />
      <span>{section.title}</span>
    </a>
  {/each}
</nav>

<style>
  .app-bar {
    display: none;
  }

  @media (max-width: 640px) {
    .app-bar {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 4px;
      padding: 6px 8px calc(6px + env(safe-area-inset-bottom));
      border-top: 1px solid var(--color-border-strong);
      background: var(--color-background);
      font: 11px/1.4 var(--font-mono);
    }
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
      min-height: 56px;
      border-top: 2px solid transparent;
      border-radius: 4px;
      color: var(--color-muted);
    }
    a:hover {
      background: var(--color-surface-raised);
      color: var(--color-text);
    }
    a[aria-current='location'] {
      border-top-color: var(--color-accent);
      background: var(--color-surface-raised);
      color: var(--color-accent);
    }
    a:focus-visible {
      outline-offset: -2px;
    }
  }
</style>
