<script lang="ts">
  import Portrait from './Portrait.svelte';
  import { education, experience, sections } from '../content';

  const details = [
    { label: 'Role', value: 'Data Scientist & Engineer' },
    { label: 'Location', value: 'Switzerland' },
    {
      label: 'Current',
      value: `${experience[0].company} · ${experience[0].title}`,
    },
    {
      label: 'Education',
      value: `${education[0].degree} · ${education[0].school}`,
    },
    { label: 'Focus', value: 'Data, automation & useful systems' },
    { label: 'Values', value: 'Maintainable code & open conversations' },
    { label: 'Interests', value: 'Experimenting & solving everyday problems' },
  ];
</script>

<section id={sections.about.id} aria-labelledby="about-title" tabindex="-1">
  <p class="prompt"><span class="accent">$</span> {sections.about.command}</p>

  <div class="fetch-output">
    <div class="profile">
      <Portrait />
    </div>

    <div class="fetch-info">
      <h1 id="about-title">Loïc Vandenberghe</h1>
      <div class="separator" aria-hidden="true">────────────────────────</div>

      <dl class="details">
        {#each details as detail (detail.label)}
          <div class="detail">
            <dt>{detail.label}<span aria-hidden="true">:</span></dt>
            <dd>{detail.value}</dd>
          </div>
        {/each}
        <div class="detail about">
          <dt>About<span aria-hidden="true">:</span></dt>
          <dd>
            Turning complex problems into simple, useful things. Occasionally
            spending hours automating a task that takes minutes.
          </dd>
        </div>
      </dl>

      <div class="color-bars" aria-hidden="true">
        {#each ['--color-background', '--color-border', '--color-muted', '--color-text-secondary', '--color-portrait', '--color-accent', '--color-accent-hover', '--color-text'] as color}
          <span style:background={`var(${color})`}></span>
        {/each}
      </div>

      <nav class="actions" aria-label="Explore my portfolio">
        <a href="#projects"
          ><span aria-hidden="true">[</span> Explore my work
          <span aria-hidden="true">↗ ]</span></a
        >
        <a href="#contact"
          ><span aria-hidden="true">[</span> Let’s talk
          <span aria-hidden="true">↗ ]</span></a
        >
      </nav>
    </div>
  </div>
</section>

<style>
  .fetch-output {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.4fr);
    align-items: center;
    gap: clamp(30px, 5vw, 72px);
    font-family: var(--font-mono);
  }
  .profile {
    width: 100%;
    max-width: 330px;
    justify-self: center;
  }
  .fetch-info {
    min-width: 0;
    font-size: 12px;
    line-height: 1.85;
  }
  h1 {
    color: var(--color-accent);
    font-size: clamp(19px, 2vw, 26px);
    line-height: 1.4;
    letter-spacing: -0.04em;
  }
  .separator {
    overflow: hidden;
    white-space: nowrap;
    color: var(--color-border-strong);
    margin-block: 6px 15px;
  }
  .details {
    margin: 0;
  }
  .detail {
    display: grid;
    grid-template-columns: 12ch minmax(0, 1fr);
    gap: 12px;
    margin-block: 4px;
  }
  dt {
    color: var(--color-accent);
    font-weight: 500;
  }
  dd {
    margin: 0;
    color: var(--color-text-secondary);
    overflow-wrap: anywhere;
  }
  .about {
    margin-top: 16px;
  }
  .color-bars {
    display: flex;
    width: 192px;
    height: 18px;
    margin-top: 23px;
  }
  .color-bars span {
    flex: 1;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 24px;
    margin-top: 22px;
    font-size: 11px;
  }
  .actions a {
    padding-block: 5px;
  }
  .actions span {
    color: var(--color-accent);
  }
  @media (max-width: 1100px) {
    .fetch-output {
      gap: 30px;
    }
    .fetch-info {
      font-size: 11px;
    }
  }
  @media (max-width: 800px) {
    .fetch-output {
      grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr);
      gap: 24px;
    }
    .detail {
      grid-template-columns: 10ch minmax(0, 1fr);
      gap: 8px;
    }
  }
  @media (max-width: 640px) {
    .fetch-output {
      grid-template-columns: minmax(0, 1fr);
      gap: 30px;
    }
    .profile {
      max-width: 250px;
    }
    .fetch-info {
      font-size: 11px;
    }
    h1 {
      font-size: 22px;
    }
    .actions {
      gap: 8px 20px;
      font-size: 10px;
    }
  }
</style>
