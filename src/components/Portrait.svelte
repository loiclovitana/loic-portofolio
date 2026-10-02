<script lang="ts">
  import portrait from '../profil_ascii.txt?raw';
  import Image from '@lucide/svelte/icons/image';
  import Type from '@lucide/svelte/icons/type';
  let view = $state<'ascii' | 'photo'>('ascii');
</script>

<div class="portrait">
  <div class="portrait-art">
    <pre
      class:concealed={view !== 'ascii'}
      aria-hidden="true">{portrait.trim()}</pre>
    <img
      hidden={view !== 'photo'}
      src="/LV.webp"
      alt="Portrait of Loïc Vandenberghe"
      width="976"
      height="1104"
    />
    <button
      type="button"
      aria-label={view === 'ascii'
        ? 'Show photo portrait'
        : 'Show ASCII portrait'}
      title={view === 'ascii' ? 'Show photo portrait' : 'Show ASCII portrait'}
      onclick={() => (view = view === 'ascii' ? 'photo' : 'ascii')}
    >
      {#if view === 'ascii'}
        <Image size={19} />
      {:else}
        <Type size={19} />
      {/if}
    </button>
  </div>
</div>

<style>
  .portrait {
    min-width: 0;
    container-type: inline-size;
  }
  .portrait-art {
    position: relative;
    width: fit-content;
  }
  pre {
    margin: 0;
    width: max-content;
    font-family: var(--font-mono);
    font-size: 1.7cqw;
    line-height: 1;
    letter-spacing: 0;
    white-space: pre;
    color: var(--color-portrait);
  }
  pre.concealed {
    visibility: hidden;
  }
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  button {
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: grid;
    place-items: center;
    width: 38px;
    height: 36px;
    border: 1px solid var(--color-accent-line);
    background: var(--color-image-label);
    color: var(--color-accent);
  }
  button:hover {
    border-color: var(--color-border-hover);
    background: var(--color-surface-raised);
  }
</style>
