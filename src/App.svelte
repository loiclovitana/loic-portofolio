<script lang="ts">
  import Hero from './components/Hero.svelte';
  import ContactIcon from './components/ContactIcon.svelte';
  import ExperienceBrowser from './components/ExperienceBrowser.svelte';
  import Header from './components/Header.svelte';
  import KeyboardHelp from './components/KeyboardHelp.svelte';
  import MobileNavigation from './components/MobileNavigation.svelte';
  import ProjectCard from './components/ProjectCard.svelte';
  import Section from './components/Section.svelte';
  import { sectionNavigation } from './navigation';
  import { contactLinks, education, projects, sections } from './content';

  const year = new Date().getFullYear();
  let active = $state<string>(sections.about.id);
</script>

<a class="skip-link" href="#about">Skip to content</a>

<div class="terminal shell">
  <Header {active} />
  <main use:sectionNavigation={{ onselect: (id) => (active = id) }}>
    <Hero />

    <Section {...sections.projects}>
      <div class="projects">
        {#each projects as project (project.id)}
          <ProjectCard {project} />
        {/each}
      </div>
    </Section>

    <Section {...sections.experience}>
      <ExperienceBrowser />
    </Section>

    <Section {...sections.education}>
      <div class="education-grid">
        {#each education as item (item.school)}
          <article data-nav-item tabindex="-1">
            <div class="education-top">
              <h3>
                <a href={item.href} target="_blank" rel="noreferrer"
                  >{item.school} <span>↗</span></a
                >
              </h3>
              <span class="eyebrow">{item.date}</span>
            </div>
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
          <span>{link.label}</span>
        </a>
      {/each}
    </nav>
  </div>
  <MobileNavigation {active} />
  <KeyboardHelp />
</div>

<style>
  .statusbar {
    font-family: var(--font-mono);
  }
  .terminal {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto minmax(0, 1fr) auto;
    height: calc(100dvh - 80px);
    margin-block: 40px;
    border: 1px solid var(--color-border-strong);
    border-radius: 9px;
    background: color-mix(in srgb, var(--color-surface) 80%, transparent);
    -webkit-backdrop-filter: blur(16px);
    backdrop-filter: blur(16px);
    box-shadow: 0 24px 100px var(--color-shadow-soft);
  }
  main {
    min-height: 0;
    overflow: hidden;
  }
  main :global(section) {
    height: 100%;
    overflow-y: auto;
    overscroll-behavior-y: none;
    scrollbar-gutter: stable;
    border-bottom: 0;
  }
  .projects {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin-top: 30px;
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
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px 16px;
    color: var(--color-text);
    font: 14px var(--font-mono);
  }
  .education-top > .eyebrow {
    margin-left: auto;
  }
  .education-grid h3 {
    font-family: var(--font-mono);
    font-size: 25px;
  }
  .education-grid h3 a {
    display: inline-flex;
    align-items: baseline;
    gap: 8px;
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
  }
  @media (max-width: 900px) {
    .projects {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 640px) {
    .terminal {
      width: 100%;
      height: 100dvh;
      margin: 0;
      padding-top: env(safe-area-inset-top);
      padding-inline: env(safe-area-inset-left) env(safe-area-inset-right);
      border: 0;
      border-radius: 0;
    }
    .statusbar {
      display: none;
    }
  }
  @media (max-width: 580px) {
    .projects {
      grid-template-columns: 1fr;
      gap: 20px;
      margin-top: 25px;
    }
    .education-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .education-grid article {
      padding: 22px;
    }
    .education-grid h3 {
      font-size: 21px;
    }
  }
</style>
