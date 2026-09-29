<script lang="ts">
  import type { Project } from '../content';

  let { project, index }: { project: Project; index: number } = $props();
</script>

{#snippet preview()}
  <img
    src={project.image}
    alt={project.imageAlt}
    loading="lazy"
    width="640"
    height="400"
  />
  <span class="image-index"
    >{String(index + 1).padStart(2, '0')} / {project.id}</span
  >
  {#if project.link}<span class="image-arrow" aria-hidden="true">↗</span>{/if}
{/snippet}

<article class="project">
  {#if project.link}
    <a
      class="project-image"
      href={project.link.href}
      target="_blank"
      rel="noreferrer"
      aria-label={project.link.ariaLabel}
    >
      {@render preview()}
    </a>
  {:else}
    <div class="project-image">{@render preview()}</div>
  {/if}
  <div class="project-body">
    <p class="eyebrow accent">{project.category}</p>
    <h3>
      {#if project.link}
        <a href={project.link.href} target="_blank" rel="noreferrer"
          >{project.title}</a
        >
      {:else}{project.title}{/if}
    </h3>
    <p>{project.description}</p>
    {#if project.link}
      <a
        class="text-link"
        href={project.link.href}
        target="_blank"
        rel="noreferrer">{project.link.label} <span>↗</span></a
      >
    {:else if project.note}
      <span class="project-note">{project.note}</span>
    {/if}
  </div>
</article>

<style>
  .project-note {
    font-family: var(--font-mono);
  }
  .project {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    overflow: hidden;
    background: var(--color-surface-raised);
    transition:
      border-color 0.2s,
      transform 0.2s;
  }
  .project:is(:hover, :focus-within) {
    border-color: var(--color-border-hover);
    transform: translateY(-4px);
  }
  .project-image {
    position: relative;
    display: block;
    height: 150px;
    overflow: hidden;
    border-bottom: 1px solid var(--color-border);
    background: var(--color-surface-raised);
  }
  .project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(0.7) sepia(0.25) brightness(0.65);
    opacity: 0.8;
    transition:
      filter 0.4s,
      transform 0.5s,
      opacity 0.4s;
  }
  .project:is(:hover, :focus-within) img {
    filter: none;
    opacity: 1;
    transform: scale(1.04);
  }
  .image-index {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 3px 6px;
    font: 8px var(--font-mono);
    color: var(--color-text);
    background: var(--color-image-label);
    border: 1px solid var(--color-accent-line);
    border-radius: 2px;
  }
  .image-arrow {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    border: 1px solid var(--color-border-hover);
    background: var(--color-background);
    color: var(--color-accent);
    font-size: 14px;
  }
  .project-body {
    padding: 19px 17px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .project-body .eyebrow {
    font-size: 7px;
    letter-spacing: 0.03em;
  }
  .project h3 {
    margin-top: 12px;
  }
  .project-body > p:not(.eyebrow) {
    font-size: 12px;
    color: var(--color-muted);
    line-height: 1.75;
    margin: 12px 0 22px;
  }
  .project .text-link,
  .project-note {
    font-size: 9px;
    margin-top: auto;
  }
  .project .text-link {
    justify-content: space-between;
    font-family: var(--font-mono);
  }
  .project-note {
    color: var(--color-muted);
  }
  @media (max-width: 1100px) {
    .project-body {
      padding: 15px 12px;
    }
    .project h3 {
      font-size: 15px;
    }
  }
  @media (max-width: 580px) {
    .project-image {
      height: 185px;
    }
    .project-body {
      padding: 20px;
    }
    .project-body .eyebrow {
      font-size: 8px;
    }
    .project h3 {
      font-size: 20px;
    }
    .project .text-link,
    .project-note {
      font-size: 10px;
    }
  }
</style>
