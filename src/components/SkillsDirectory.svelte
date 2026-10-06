<script lang="ts">
  import FolderOpen from '@lucide/svelte/icons/folder-open';
  import FileCode from '@lucide/svelte/icons/file-code';
  import type { SkillGroup } from '../content';

  let { skillGroups }: { skillGroups: SkillGroup[] } = $props();
  let selectedId = $state('machine-learning');
  const selectedGroup = $derived(
    skillGroups.find((group) =>
      group.skills.some((skill) => skill.id === selectedId),
    ) ?? skillGroups[0],
  );
  const selectedSkill = $derived(
    selectedGroup?.skills.find((skill) => skill.id === selectedId) ??
      selectedGroup?.skills[0],
  );
</script>

<div class="directory-layout">
  <div class="directory">
    <div class="root" aria-hidden="true">
      <FolderOpen size={18} strokeWidth={1.6} />
      <span>skills/</span>
    </div>
    <ul class="groups" aria-label="Skills by category">
      {#each skillGroups as group (group.id)}
        <li class="group">
          <h3 class="folder">
            <FolderOpen size={17} strokeWidth={1.6} aria-hidden="true" />
            <span>{group.id}/</span>
          </h3>
          <ul class="files" aria-label={group.id.replaceAll('-', ' ')}>
            {#each group.skills as skill (skill.id)}
              <li class="file">
                <button
                  type="button"
                  class:selected={selectedSkill?.id === skill.id}
                  aria-pressed={selectedSkill?.id === skill.id}
                  aria-controls="skill-details"
                  data-nav-item
                  onclick={() => (selectedId = skill.id)}
                  onfocus={() => (selectedId = skill.id)}
                >
                  <FileCode size={16} strokeWidth={1.5} aria-hidden="true" />
                  <span>{skill.name}</span>
                </button>
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </div>

  <div class="detail" id="skill-details" aria-live="polite" aria-atomic="true">
    {#if selectedSkill && selectedGroup}
      <p class="breadcrumb">skills / {selectedGroup.id} /</p>
      <h3>{selectedSkill.name}</h3>
      <p class="description">{selectedSkill.description}</p>
      {#if selectedSkill.related.length}
        <div class="related">
          <h4>Related work</h4>
          <ul>
            {#each selectedSkill.related as link (link.href)}
              <li>
                <a
                  href={link.href}
                  target={link.href.startsWith('https://')
                    ? '_blank'
                    : undefined}
                  rel={link.href.startsWith('https://')
                    ? 'noreferrer'
                    : undefined}
                >
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    {/if}
  </div>
</div>

<style>
  .directory-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(30px, 5vw, 72px);
    align-items: start;
    margin-top: 30px;
  }
  .directory {
    min-width: 0;
    font: 14px/1.5 var(--font-mono);
  }
  .root,
  .folder {
    display: flex;
    align-items: center;
    gap: 9px;
    color: var(--color-accent);
  }
  .root {
    margin-bottom: 12px;
    font-weight: 500;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .groups {
    margin-left: 8px;
  }
  .group,
  .file {
    position: relative;
    padding-left: 24px;
    border-left: 1px solid var(--color-accent-line);
  }
  .group::before,
  .file::before {
    content: '';
    position: absolute;
    top: 17px;
    left: 0;
    width: 24px;
    border-top: 1px solid var(--color-accent-line);
  }
  .group:last-child,
  .file:last-child {
    border-left-color: transparent;
  }
  .group:last-child::after,
  .file:last-child::after {
    content: '';
    position: absolute;
    top: 0;
    left: -1px;
    height: 17px;
    border-left: 1px solid var(--color-accent-line);
  }
  .folder {
    min-height: 34px;
    font: 500 14px/1.5 var(--font-mono);
    letter-spacing: 0;
  }
  .files {
    margin-left: 8px;
    padding-bottom: 14px;
  }
  .group:last-child .files {
    padding-bottom: 0;
  }
  button {
    display: flex;
    align-items: center;
    gap: 9px;
    width: 100%;
    min-height: 34px;
    padding: 6px 10px;
    border-left: 2px solid transparent;
    border-radius: 0 3px 3px 0;
    background: transparent;
    color: var(--color-text-secondary);
    text-align: left;
    font: inherit;
  }
  button span {
    overflow-wrap: anywhere;
  }
  button :global(svg),
  .folder :global(svg),
  .root :global(svg) {
    flex-shrink: 0;
  }
  button:hover {
    color: var(--color-accent);
    background: var(--color-accent-subtle);
  }
  button.selected {
    color: var(--color-text);
    border-left-color: var(--color-accent);
    background: var(--color-accent-soft);
  }
  button:focus-visible {
    outline-offset: -2px;
  }
  .detail {
    position: sticky;
    top: 24px;
    min-width: 0;
    padding: 24px 0 24px 30px;
    border-left: 1px solid var(--color-border);
  }
  .breadcrumb {
    margin-bottom: 14px;
    color: var(--color-accent);
    font: 12px/1.5 var(--font-mono);
    overflow-wrap: anywhere;
  }
  .detail h3 {
    font-size: clamp(24px, 2.4vw, 32px);
    letter-spacing: -0.035em;
  }
  .description {
    margin-top: 20px;
    max-width: 42ch;
    color: var(--color-text-secondary);
    font-size: 16px;
    line-height: 1.7;
  }
  .related {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid var(--color-border);
  }
  .related h4 {
    margin: 0 0 12px;
    font: 500 13px/1.5 var(--font-mono);
  }
  .related a {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    min-height: 36px;
    color: var(--color-accent);
    font: 14px/1.5 var(--font-mono);
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .related a:hover {
    color: var(--color-accent-hover);
  }
  @media (max-width: 760px) {
    .directory-layout {
      grid-template-columns: minmax(0, 1fr);
      gap: 24px;
    }
    button {
      min-height: 44px;
    }
    .file::before {
      top: 22px;
    }
    .file:last-child::after {
      height: 22px;
    }
    .detail {
      position: static;
      padding: 24px 0 0;
      border-left: 0;
      border-top: 1px solid var(--color-border);
    }
  }
</style>
