<script lang="ts">
  import Hero from './components/Hero.svelte';
  import Header from './components/Header.svelte';
  import ProjectCard from './components/ProjectCard.svelte';
  import Section from './components/Section.svelte';
  import {
    education,
    experience,
    projects,
    sections,
    socialLinks,
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
      label={`${String(projects.length).padStart(2, '0')} PROJECTS`}
      intro="A little data science. A little engineering. A lot of curiosity."
    >
      <div class="projects">
        {#each projects as project, index (project.id)}
          <ProjectCard {project} {index} />
        {/each}
      </div>
    </Section>

    <Section
      {...sections.experience}
      label="EXPERIENCE"
      intro="From understanding the business to building the system. Five years of solving problems with people and data."
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

    <Section {...sections.education} label="EDUCATION">
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

    <section
      class="contact"
      id={sections.contact.id}
      aria-labelledby="contact-title"
      tabindex="-1"
    >
      <p class="prompt">
        <span class="accent">$</span>
        {sections.contact.command}
      </p>
      <p class="eyebrow">GREAT THINGS START WITH A CONVERSATION</p>
      <h2 id="contact-title">
        Have a good problem?<br />Let’s figure it out<span class="accent"
          >.</span
        >
      </h2>
      <p>A project, an idea, or just a hello. My inbox is open.</p>
      <a class="email-link" href="mailto:loic@vandenberghe.ch"
        >loic@vandenberghe.ch <span>↗</span></a
      >
      <div class="contact-bottom">
        <div class="social-links">
          {#each socialLinks as link (link.label)}
            <a href={link.href} target="_blank" rel="noreferrer"
              >{link.label} ↗</a
            >
          {/each}
        </div>
        <a href="#about">Back to top ↑</a>
      </div>
    </section>
  </main>

  <div class="statusbar">
    <span><span class="status-dot"></span> ALL SYSTEMS CURIOUS</span>
    <span
      >UTF-8 <span class="status-divider">/</span> BUILT WITH INTENTION
      <span class="status-divider">/</span>
      <span class="accent">main*</span></span
    >
  </div>
</div>

<footer class="shell footer">
  <span>© {year} Loïc Vandenberghe</span>
  <span>Less complexity. More possibility.<span class="accent">_</span></span>
</footer>

<style>
  .statusbar,
  .footer,
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
    font-size: 10px;
  }
  .tag {
    display: table;
    font-size: 7px;
    color: var(--color-accent);
    padding: 1px 5px;
    margin-top: 8px;
    border: 1px solid var(--color-accent-soft);
    border-radius: 2px;
  }
  .timeline h3 {
    font-size: 17px;
    margin-bottom: 8px;
  }
  .timeline article > div > p {
    font-size: 12px;
    color: var(--color-text-secondary);
  }
  .job-location {
    display: block;
    font-size: 10px;
    color: var(--color-muted);
    margin-top: 3px;
  }
  .timeline article > div > .job-description {
    margin-top: 12px;
    font-size: 12px;
    color: var(--color-muted);
    max-width: 400px;
  }
  .timeline-index {
    font-size: 10px;
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
    font: 10px var(--font-mono);
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
    font-size: 11px;
    margin-top: 8px;
  }
  .education-grid .degree {
    color: var(--color-text-secondary);
    margin-top: 20px;
    font-size: 12px;
  }
  .contact {
    padding-block: 45px 30px;
    border-bottom: 0;
    background: radial-gradient(
      ellipse at 100% 100%,
      var(--color-accent-subtle),
      transparent 70%
    );
  }
  .contact > .eyebrow {
    color: var(--color-muted);
    font-size: 8px;
    margin-bottom: 20px;
  }
  .contact h2 {
    font-size: clamp(27px, 3vw, 39px);
    line-height: 1.25;
  }
  .contact > p:not(.prompt, .eyebrow) {
    font-size: 13px;
    color: var(--color-muted);
    margin-top: 16px;
  }
  .email-link {
    display: inline-flex;
    align-items: center;
    gap: 34px;
    color: var(--color-accent);
    font-family: var(--font-mono);
    font-size: clamp(12px, 1.5vw, 19px);
    margin-top: 25px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--color-accent-line);
  }
  .email-link:hover {
    border-color: var(--color-accent);
  }
  .contact-bottom {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 50px;
    font: 10px var(--font-mono);
    color: var(--color-muted);
  }
  .social-links {
    display: flex;
    gap: 25px;
  }
  .statusbar {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 10px 17px;
    border-top: 1px solid var(--color-border);
    color: var(--color-muted);
    font-size: 8px;
    letter-spacing: 0.025em;
  }
  .statusbar .status-dot {
    width: 5px;
    height: 5px;
    margin-right: 6px;
  }
  .status-divider {
    color: var(--color-muted);
    margin-inline: 12px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding-block: 25px 35px;
    font-size: 9px;
    color: var(--color-muted);
  }
  .skip-link {
    position: fixed;
    top: 10px;
    left: 10px;
    padding: 12px;
    background: var(--color-accent);
    color: var(--color-background);
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
      font-size: 9px;
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
    .contact h2 {
      font-size: clamp(25px, 6.7vw, 35px);
    }
    .contact > .eyebrow {
      font-size: 6px;
      letter-spacing: 0.06em;
    }
    .email-link {
      font-size: 13px;
      gap: 20px;
    }
    .contact-bottom {
      font-size: 9px;
      margin-top: 35px;
    }
    .social-links {
      gap: 18px;
    }
    .statusbar {
      font-size: 6px;
      padding: 10px;
      gap: 12px;
    }
    .statusbar > span:last-child {
      font-size: 0;
    }
    .statusbar > span:last-child > .accent {
      font-size: 7px;
    }
    .status-divider {
      margin-inline: 0;
    }
    .footer {
      flex-direction: column;
      align-items: center;
      gap: 6px;
      font-size: 8px;
      padding-block: 20px;
    }
  }
</style>
