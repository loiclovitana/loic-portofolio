<script lang="ts">
  import Hero from './components/Hero.svelte';
  import ContactIcon from './components/ContactIcon.svelte';
  import Header from './components/Header.svelte';
  import ProjectCard from './components/ProjectCard.svelte';
  import Section from './components/Section.svelte';
  import {
    contactLinks,
    education,
    experience,
    projects,
    sections,
  } from './content';

  const year = new Date().getFullYear();
</script>

<a class="skip-link" href="#about">Skip to content</a>

<div class="terminal shell">
  <Header />
  <main>
    <Hero />

    <Section
      {...sections.projects}
    >
      <div class="projects">
        {#each projects as project, index (project.id)}
          <ProjectCard {project} {index} />
        {/each}
      </div>
    </Section>

    <Section
      {...sections.experience}
    >
      <div class="timeline">
        {#each experience as job, index (job.title)}
          <article>
            <p class="timeline-date">
              {job.date}{#if job.latest}<span class="tag">LATEST</span>{/if}
            </p>
            <div>
              <h3>{job.title}</h3>
              <p>
                {#if job.href}<a
                    href={job.href}
                    target="_blank"
                    rel="noreferrer">{job.company} ↗</a
                  >{:else}{job.company}{/if}
                <span class="job-location">{job.location}</span>
              </p>
              {#if job.description}<p class="job-description">
                  {job.description}
                </p>{/if}
            </div>
            <span class="timeline-index" aria-hidden="true"
              >{String(experience.length - index).padStart(2, '0')}</span
            >
          </article>
        {/each}
      </div>
    </Section>

    <Section {...sections.education}>
      <div class="education-grid">
        {#each education as item, index (item.school)}
          <article>
            <div class="education-top">
              <span class="eyebrow">{item.date}</span>
              <span class="accent" aria-hidden="true"
                >[{String(index + 1).padStart(2, '0')}]</span
              >
            </div>
            <h3>
              <a href={item.href} target="_blank" rel="noreferrer"
                >{item.school} <span>↗</span></a
              >
            </h3>
            <p>{item.name}</p>
            <p class="degree">{item.degree}</p>
          </article>
        {/each}
      </div>
    </Section>
  </main>

  <div class="statusbar">
    <span>© {year} Loïc Vandenberghe All rights reserved</span>
    <nav class="statusbar-contacts" aria-label="Contact links">
      {#each contactLinks as link (link.label)}
        <a
          href={link.href}
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noreferrer' : undefined}
          aria-label={`${link.label}: ${link.value}`}
          title={link.value}
        >
          <ContactIcon src={link.icon} />
          <span class="contact-label">{link.label}</span>
        </a>
      {/each}
    </nav>
  </div>
</div>

<style>
  .statusbar,
  .timeline-date,
  .tag,
  .timeline-index {
    font-family: var(--font-mono);
  }
  .terminal {
    margin-top: 40px;
    border: 1px solid var(--color-border-strong);
    border-radius: 9px;
    background: var(--color-surface);
    box-shadow: 0 24px 100px var(--color-shadow-soft);
  }
  .projects {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin-top: 30px;
  }
  .timeline {
    margin-top: 30px;
    border-top: 1px solid var(--color-border);
  }
  .timeline article {
    display: grid;
    grid-template-columns: 160px 1fr 20px;
    gap: 20px;
    padding: 27px 0;
    border-bottom: 1px solid var(--color-border);
  }
  .timeline article:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
  .timeline-date {
    color: var(--color-muted);
    font-size: 14px;
  }
  .tag {
    display: table;
    font-size: 12px;
    color: var(--color-accent);
    padding: 1px 5px;
    margin-top: 8px;
    border: 1px solid var(--color-accent-soft);
    border-radius: 2px;
  }
  .timeline h3 {
    font-size: 20px;
    margin-bottom: 8px;
  }
  .timeline article > div > p {
    font-size: 16px;
    color: var(--color-text-secondary);
  }
  .job-location {
    display: block;
    font-size: 14px;
    color: var(--color-muted);
    margin-top: 3px;
  }
  .timeline article > div > .job-description {
    margin-top: 12px;
    font-size: 16px;
    line-height: 1.6;
    color: var(--color-muted);
    max-width: 600px;
  }
  .timeline-index {
    font-size: 13px;
    color: var(--color-muted);
  }
  .education-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 30px;
  }
  .education-grid article {
    padding: 23px;
    border: 1px solid var(--color-border);
    border-radius: 4px;
  }
  .education-top {
    display: flex;
    justify-content: space-between;
    color: var(--color-muted);
    font: 14px var(--font-mono);
    margin-bottom: 25px;
  }
  .education-grid h3 {
    font-family: var(--font-mono);
    font-size: 25px;
  }
  .education-grid h3 a {
    display: flex;
    justify-content: space-between;
  }
  .education-grid h3 span {
    font-size: 15px;
    color: var(--color-muted);
  }
  .education-grid p {
    color: var(--color-muted);
    font-size: 16px;
    margin-top: 8px;
  }
  .education-grid .degree {
    color: var(--color-text-secondary);
    margin-top: 20px;
    font-size: 16px;
  }

  .statusbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 10px 17px;
    border-top: 1px solid var(--color-border);
    color: var(--color-text-secondary);
    font-size: 14px;
    letter-spacing: 0.025em;
  }
  .statusbar-contacts {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-left: auto;
  }
  .statusbar-contacts a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 32px;
    white-space: nowrap;
  }

  .skip-link {
    position: fixed;
    top: 10px;
    left: 10px;
    padding: 12px;
    background: var(--color-accent);
    color: var(--color-on-accent);
    z-index: 10;
    transform: translateY(-150%);
  }
  .skip-link:focus {
    transform: translateY(0);
  }
  @media (max-width: 1100px) {
    .projects {
      gap: 12px;
    }
    .timeline article {
      grid-template-columns: 135px 1fr 20px;
      gap: 15px;
    }
  }
  @media (max-width: 900px) {
    .projects {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 580px) {
    .terminal {
      margin-top: 12px;
    }
    .projects {
      grid-template-columns: 1fr;
      gap: 20px;
      margin-top: 25px;
    }
    .timeline article {
      grid-template-columns: 1fr 20px;
      gap: 12px;
      padding-block: 23px;
    }
    .timeline-date {
      grid-column: 1;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
    }
    .tag {
      margin: 0;
    }
    .timeline article > div {
      grid-column: 1;
    }
    .timeline-index {
      grid-column: 2;
      grid-row: 1 / 3;
    }
    .education-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .education-grid article {
      padding: 22px;
    }
    .statusbar {
      font-size: 14px;
      padding: 8px 10px;
      gap: 8px 12px;
    }
    .statusbar-contacts {
      gap: 8px;
    }
    .statusbar-contacts a {
      justify-content: center;
      min-width: 36px;
      min-height: 36px;
    }
    .contact-label {
      display: none;
    }
  }
</style>
