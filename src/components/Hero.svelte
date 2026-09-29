<script lang="ts">
  import { onMount } from 'svelte';
  import ContactIcon from './ContactIcon.svelte';
  import Portrait from './Portrait.svelte';
  import SectionHeading from './SectionHeading.svelte';
  import { contactLinks, education, experience, sections } from '../content';

  const roles = [
    'Data Scientist',
    'Software Engineer',
    'Data Engineer',
    'IT Consultant',
    'Software architect',
  ];
  let displayedRole = $state(roles[0]);

  onMount(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let roleIndex = 0;
    let characterCount = roles[0].length;
    let erasing = true;

    function tick() {
      if (erasing) {
        characterCount--;
        displayedRole = roles[roleIndex].slice(0, characterCount);
        if (characterCount === 0) {
          roleIndex = (roleIndex + 1) % roles.length;
          erasing = false;
          timeout = setTimeout(tick, 300);
        } else {
          timeout = setTimeout(tick, 55);
        }
      } else {
        characterCount++;
        displayedRole = roles[roleIndex].slice(0, characterCount);
        if (characterCount === roles[roleIndex].length) {
          erasing = true;
          timeout = setTimeout(tick, 1800);
        } else {
          timeout = setTimeout(tick, 95);
        }
      }
    }

    function syncMotion() {
      clearTimeout(timeout);
      roleIndex = 0;
      characterCount = roles[0].length;
      erasing = true;
      displayedRole = roles[0];
      if (!reducedMotion.matches) timeout = setTimeout(tick, 1800);
    }

    reducedMotion.addEventListener('change', syncMotion);
    syncMotion();

    return () => {
      clearTimeout(timeout);
      reducedMotion.removeEventListener('change', syncMotion);
    };
  });

  const details = [
    { label: 'Location', value: 'Switzerland' },
    {
      label: 'Current',
      value: `${experience[0].company} · ${experience[0].title}`,
    },
    {
      label: 'Education',
      value: `${education[0].degree} · ${education[0].school}`,
    },
    { label: 'Focus', value: 'Data & automation' },
    { label: 'Values', value: 'Maintainable code & open conversations' },
    {
      label: 'About',
      value:
        'Turning complex problems into simple, useful things. Occasionally spending hours automating a task that takes minutes.',
    },
  ];
</script>

<section id={sections.about.id} aria-labelledby="about-title" tabindex="-1">
  <SectionHeading
    title={sections.about.title}
    icon={sections.about.icon}
    command={sections.about.command}
    tag="p"
  />

  <div class="fetch-output">
    <div class="profile">
      <Portrait />
    </div>

    <div class="fetch-info">
      <h1 id="about-title">Loïc Vandenberghe</h1>
      <div class="separator" aria-hidden="true">────────────────────────</div>

      <dl class="details">
        <div class="detail">
          <dt>Role<span aria-hidden="true">:</span></dt>
          <dd>
            <span class="sr-only">{roles.join(', ')}</span>
            <span aria-hidden="true"
              >{displayedRole}<span class="role-cursor"></span></span
            >
          </dd>
        </div>
        {#each details as detail (detail.label)}
          <div class="detail">
            <dt>{detail.label}<span aria-hidden="true">:</span></dt>
            <dd>{detail.value}</dd>
          </div>
        {/each}
        <div class="detail">
          <dt>Contact<span aria-hidden="true">:</span></dt>
          <dd class="contact-links">
            {#each contactLinks as detail (detail.label)}
              <a
                href={detail.href}
                target={detail.external ? '_blank' : undefined}
                rel={detail.external ? 'noreferrer' : undefined}
              >
                <ContactIcon src={detail.icon} />
                {detail.value}
              </a>
            {/each}
          </dd>
        </div>
      </dl>

      <div class="color-bars" aria-hidden="true">
        {#each ['--color-background', '--color-border', '--color-muted', '--color-text-secondary', '--color-portrait', '--color-accent', '--color-accent-hover', '--color-text'] as color}
          <span style:background={`var(${color})`}></span>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .fetch-output {
    margin-top: 30px;
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
  .contact-links {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  dd a {
    display: inline-flex;
    align-items: center;
    gap: 7px;
  }
  .role-cursor {
    display: inline-block;
    width: 1ch;
    height: 1.2em;
    margin-left: 1px;
    background: var(--color-accent);
    vertical-align: -0.25em;
    animation: blink 1s step-end infinite;
  }
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .role-cursor {
      display: none;
    }
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
  }
</style>
