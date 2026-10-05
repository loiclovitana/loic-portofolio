<script lang="ts">
  interface SkillGroup {
    title: string;
    skills: string[];
  }

  let { skillGroups }: { skillGroups: SkillGroup[] } = $props();

  const skillCount = $derived(
    skillGroups.reduce((total, group) => total + group.skills.length, 0),
  );
  const activityBars = Array.from({ length: 32 });
</script>

<div class="monitor">
  <div class="monitor-toolbar">
    <span class="monitor-path"
      >loic@portfolio <span aria-hidden="true">/</span> skills</span
    >
    <span class="monitor-status"
      ><span class="status-dot" aria-hidden="true"></span> ACTIVE</span
    >
  </div>

  <div class="monitor-overview">
    <div class="overview-count">
      <span>SKILL INDEX</span>
      <strong
        >{String(skillCount).padStart(2, '0')}<small> entries</small></strong
      >
    </div>
    <div class="activity" aria-hidden="true">
      {#each activityBars as _, index (index)}
        <span style={`--bar-index: ${index}`}></span>
      {/each}
    </div>
    <div class="overview-groups">
      <span>GROUPS</span>
      <strong>{String(skillGroups.length).padStart(2, '0')}</strong>
    </div>
  </div>

  <div class="monitor-grid">
    {#each skillGroups as group, groupIndex (group.title)}
      <div class="monitor-panel">
        <div class="panel-heading">
          <h3>
            <span>{String(groupIndex + 1).padStart(2, '0')}</span>
            {group.title}
          </h3>
          <span class="panel-count"
            >{String(group.skills.length).padStart(2, '0')} entries</span
          >
        </div>
        <div class="column-labels" aria-hidden="true">
          <span>#</span><span>SKILL</span>
        </div>
        <ul>
          {#each group.skills as skill, index (skill)}
            <li>
              <span class="row-number" aria-hidden="true"
                >{String(index + 1).padStart(2, '0')}</span
              ><span>{skill}</span>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>

  <div class="monitor-footer" aria-hidden="true">
    <span><span class="footer-key">GROUPS</span> {skillGroups.length}</span>
    <span><span class="footer-key">ENTRIES</span> {skillCount}</span>
    <span class="footer-end">loic@portfolio:~</span>
  </div>
</div>

<style>
  .monitor {
    margin-top: 30px;
    border: 1px solid var(--color-border-strong);
    border-radius: 6px;
    background: var(--color-background);
    font: 14px/1.4 var(--font-mono);
    overflow: hidden;
  }
  .monitor-toolbar,
  .monitor-footer {
    display: flex;
    align-items: center;
    gap: 18px;
    min-height: 34px;
    padding: 6px 16px;
    color: var(--color-muted);
    background: var(--color-surface-raised);
  }
  .monitor-toolbar {
    justify-content: space-between;
    border-bottom: 1px solid var(--color-border);
  }
  .monitor-path {
    color: var(--color-text-secondary);
  }
  .monitor-path span {
    padding-inline: 5px;
    color: var(--color-accent);
  }
  .monitor-status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--color-accent);
    font-size: 12px;
    letter-spacing: 0.08em;
  }
  .monitor-overview {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: end;
    gap: clamp(18px, 3vw, 38px);
    margin: 20px 20px 10px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--color-border);
  }
  .overview-count,
  .overview-groups {
    display: grid;
    gap: 2px;
    white-space: nowrap;
  }
  .overview-count > span,
  .overview-groups > span {
    color: var(--color-muted);
    font-size: 11px;
    letter-spacing: 0.12em;
  }
  .overview-count strong,
  .overview-groups strong {
    color: var(--color-accent);
    font-size: 30px;
    font-weight: 500;
    line-height: 1;
  }
  .overview-count small {
    color: var(--color-text-secondary);
    font-size: 13px;
    font-weight: 400;
  }
  .activity {
    display: flex;
    align-items: end;
    gap: 3px;
    height: 35px;
    min-width: 0;
    overflow: hidden;
  }
  .activity span {
    flex: 1 0 3px;
    height: 70%;
    max-width: 14px;
    background: var(--color-accent);
    opacity: 0.65;
    transform-origin: bottom;
    animation: activity 1.6s ease-in-out infinite alternate;
    animation-delay: calc(var(--bar-index) * -0.11s);
  }
  .activity span:nth-child(3n) {
    height: 45%;
  }
  .activity span:nth-child(4n) {
    height: 90%;
  }
  .activity span:nth-child(7n) {
    height: 30%;
  }
  @keyframes activity {
    from {
      transform: scaleY(0.35);
      opacity: 0.35;
    }
    to {
      transform: scaleY(1);
      opacity: 0.95;
    }
  }
  .monitor-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    padding: 12px 20px 20px;
  }
  .monitor-panel {
    position: relative;
    min-width: 0;
    padding: 16px;
    border: 1px solid var(--color-border-strong);
    border-radius: 4px;
    background: var(--color-surface);
  }
  .panel-heading {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 15px;
  }
  .panel-heading h3 {
    color: var(--color-accent);
    font: 500 15px/1.35 var(--font-mono);
    letter-spacing: 0;
  }
  .panel-heading h3 span {
    color: var(--color-muted);
    margin-right: 7px;
  }
  .panel-count {
    color: var(--color-muted);
    font-size: 12px;
    white-space: nowrap;
  }
  .column-labels,
  li {
    display: grid;
    grid-template-columns: 4ch minmax(0, 1fr);
    align-items: center;
    gap: 8px;
  }
  .column-labels {
    padding: 4px 7px;
    color: var(--color-background);
    background: var(--color-accent);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    min-height: 29px;
    padding: 4px 7px;
    color: var(--color-text-secondary);
    border-bottom: 1px solid var(--color-border);
  }
  li:last-child {
    border-bottom: 0;
  }
  li:nth-child(even) {
    background: var(--color-surface-raised);
  }
  .row-number {
    color: var(--color-muted);
  }
  .monitor-footer {
    border-top: 1px solid var(--color-border);
    font-size: 12px;
  }
  .footer-key {
    color: var(--color-accent);
  }
  .footer-end {
    margin-left: auto;
  }
  @media (max-width: 760px) {
    .monitor-grid {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 480px) {
    .monitor {
      margin-top: 24px;
    }
    .monitor-overview {
      margin: 16px 12px 8px;
      gap: 12px;
    }
    .monitor-grid {
      padding: 8px 12px 12px;
      gap: 12px;
    }
    .monitor-panel {
      padding: 12px;
    }
    .overview-count strong,
    .overview-groups strong {
      font-size: 24px;
    }
    .activity {
      gap: 2px;
      height: 28px;
    }
    .activity span {
      flex-basis: 2px;
    }
    .monitor-footer {
      gap: 10px;
      padding-inline: 12px;
    }
    .footer-end {
      display: none;
    }
  }
</style>
