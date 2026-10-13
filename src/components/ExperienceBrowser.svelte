<script lang="ts">
  import { onMount } from 'svelte';
  import { experience, type Experience } from '../content';

  let selected = $state(experience[0].id);
  let mobile = $state(false);

  onMount(() => {
    const query = window.matchMedia('(max-width: 800px)');
    const sync = () => {
      mobile = query.matches;
      if (!mobile && !selected) selected = experience[0].id;
    };
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  });
</script>

{#snippet entry(job: Experience)}
  <span class="job-details">
    <span class="job-title">{job.title}</span>
    <span class="job-company">{job.company}</span>
  </span>
  <span class="job-meta">
    <span class="timeline-date">{job.date}</span>
    <span class="job-location">{job.location}</span>
    {#if job.latest}<span class="tag">LATEST</span>{/if}
    {#if job.volunteer}<span class="tag">VOLUNTEERING</span>{/if}
  </span>
  <span class="entry-marker" aria-hidden="true">
    {mobile ? (selected === job.id ? '−' : '+') : '›'}
  </span>
{/snippet}

{#snippet description(job: Experience)}
  <div class="description">
    <div class="description-heading">
      <h3>{job.title}</h3>
      {#if job.href}
        <a href={job.href} target="_blank" rel="noreferrer">
          {job.company} <span aria-hidden="true">↗</span>
          <span class="sr-only"> (opens in a new tab)</span>
        </a>
      {:else}
        <span class="company-name">{job.company}</span>
      {/if}
    </div>
    <p class="summary">{job.summary}</p>
    {#each job.projects as project}
      <div class="project">
        <h4><span aria-hidden="true">##</span> {project.title}</h4>
        <ul>
          {#each project.points as point}<li>{point}</li>{/each}
        </ul>
      </div>
    {/each}
    <ul class="technologies" aria-label="Skills and technologies">
      {#each job.technologies as technology}<li>{technology}</li>{/each}
    </ul>
  </div>
{/snippet}

<div class="experience-browser">
  {#if mobile}
    <div class="mobile-entries">
      {#each experience as job (job.id)}
        <div class="mobile-entry">
          <h3>
            <button
              id={`experience-tab-${job.id}`}
              class="job"
              class:selected={selected === job.id}
              data-nav-item
              aria-expanded={selected === job.id}
              aria-controls={`experience-panel-${job.id}`}
              onclick={() => (selected = selected === job.id ? '' : job.id)}
            >
              {@render entry(job)}
            </button>
          </h3>
          <div
            id={`experience-panel-${job.id}`}
            class="detail-pane"
            role="region"
            aria-labelledby={`experience-tab-${job.id}`}
            hidden={selected !== job.id}
          >
            {@render description(job)}
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="panes">
      <div
        class="timeline"
        role="tablist"
        aria-label="Experience"
        aria-orientation="vertical"
      >
        {#each experience as job, index (job.id)}
          <button
            id={`experience-tab-${job.id}`}
            class="job"
            class:selected={selected === job.id || (!selected && index === 0)}
            data-nav-item
            role="tab"
            aria-selected={selected === job.id || (!selected && index === 0)}
            aria-controls={`experience-panel-${job.id}`}
            tabindex={selected === job.id || (!selected && index === 0)
              ? 0
              : -1}
            onclick={() => (selected = job.id)}
            onfocus={() => (selected = job.id)}
          >
            {@render entry(job)}
          </button>
        {/each}
      </div>
      {#each experience as job, index (job.id)}
        <div
          id={`experience-panel-${job.id}`}
          class="detail-pane"
          role="tabpanel"
          aria-labelledby={`experience-tab-${job.id}`}
          tabindex="0"
          hidden={selected !== job.id && !(!selected && index === 0)}
        >
          {@render description(job)}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .experience-browser {
    margin-top: 30px;
  }
  .panes {
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.25fr);
    align-items: start;
  }
  .timeline {
    position: sticky;
    top: 0;
    min-width: 0;
  }
  .job {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;
    width: 100%;
    padding: 23px 25px 23px 18px;
    border-bottom: 1px solid var(--color-border);
    border-left: 3px solid transparent;
    background: transparent;
    text-align: left;
    line-height: 1.6;
  }
  .timeline .job:last-child {
    border-bottom: 0;
  }
  .job:hover {
    background: var(--color-accent-subtle);
  }
  .job.selected {
    border-left-color: var(--color-accent);
    background: var(--color-accent-subtle);
  }
  .job:focus-visible {
    outline-offset: -3px;
  }
  .job-details,
  .job-meta {
    display: flex;
    flex-direction: column;
  }
  .job-title {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.3;
  }
  .job-company {
    margin-top: 7px;
    font-size: 14px;
    color: var(--color-text-secondary);
  }
  .job-meta {
    align-items: flex-end;
    text-align: right;
  }
  .timeline-date {
    font: 11px / 1.6 var(--font-mono);
    white-space: nowrap;
  }
  .job-location {
    font-size: 11px;
    margin-top: 4px;
  }
  .timeline-date,
  .job-location {
    color: var(--color-muted);
  }
  .tag {
    margin-top: 8px;
    padding: 1px 5px;
    color: var(--color-accent);
    border: 1px solid var(--color-accent-soft);
    border-radius: 2px;
    font: 10px / 1.6 var(--font-mono);
  }
  .entry-marker {
    position: absolute;
    right: 9px;
    top: 24px;
    color: var(--color-accent);
    opacity: 0;
  }
  .selected .entry-marker {
    opacity: 1;
  }
  .detail-pane {
    min-width: 0;
    min-height: 100%;
    border-left: 1px solid var(--color-border);
  }
  .detail-pane:focus-visible {
    outline-offset: -3px;
  }
  .description {
    padding: 23px 0 24px 28px;
  }
  .description-heading h3 {
    font-size: 23px;
    line-height: 1.3;
  }
  .description-heading a,
  .company-name {
    display: inline-block;
    margin-top: 6px;
    color: var(--color-accent);
    font-size: 14px;
  }
  .summary {
    margin-top: 20px;
    color: var(--color-text-secondary);
    font-size: 15px;
    line-height: 1.7;
  }
  .project {
    margin-top: 24px;
  }
  .project h4 {
    margin: 0 0 10px;
    font: 500 13px / 1.6 var(--font-mono);
  }
  .project h4 span {
    color: var(--color-accent);
  }
  .project ul {
    margin: 0;
    padding-left: 18px;
  }
  .project li {
    padding-left: 3px;
    color: var(--color-text-secondary);
    font-size: 14px;
    line-height: 1.7;
  }
  .project li + li {
    margin-top: 8px;
  }
  .project li::marker {
    color: var(--color-accent);
  }
  .technologies {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 20px 0 0;
    margin: 24px 0 0;
    border-top: 1px solid var(--color-border);
    list-style: none;
  }
  .technologies li {
    padding: 3px 7px;
    border: 1px solid var(--color-border);
    border-radius: 2px;
    color: var(--color-muted);
    font: 11px / 1.5 var(--font-mono);
  }
  @media (min-width: 801px) and (max-width: 1100px) {
    .job {
      grid-template-columns: 1fr;
      padding-block: 20px;
    }
    .job-meta {
      align-items: flex-start;
      text-align: left;
    }
    .job-location {
      display: none;
    }
    .tag {
      position: absolute;
      right: 22px;
      bottom: 20px;
    }
  }
  @media (max-width: 800px) {
    .experience-browser {
      margin-top: 24px;
    }
    .job {
      padding: 20px 32px 20px 16px;
    }
    .job-title {
      font-size: 17px;
    }
    .job-meta {
      font-weight: 400;
    }
    .mobile-entry:last-child .job {
      border-bottom: 0;
    }
    .detail-pane {
      border-left: 0;
      border-bottom: 1px solid var(--color-border);
    }
    .mobile-entry:last-child .detail-pane {
      border-bottom: 0;
    }
    .entry-marker {
      opacity: 1;
      right: 13px;
      top: 20px;
      font: 18px var(--font-mono);
    }
    .description {
      padding: 20px 18px 24px;
    }
    .description-heading h3,
    .description-heading .company-name {
      display: none;
    }
    .description-heading a {
      margin: 0 0 12px;
    }
    .summary {
      margin-top: 0;
    }
  }
  @media (max-width: 480px) {
    .job {
      grid-template-columns: 1fr;
      gap: 10px;
    }
    .job-meta {
      align-items: flex-start;
      text-align: left;
    }
    .job-location {
      margin-top: 0;
    }
    .tag {
      position: absolute;
      right: 16px;
      bottom: 20px;
    }
  }
</style>
