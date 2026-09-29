<script lang="ts">
  import portrait from '../profil_ascii.txt?raw';
</script>

<div class="portrait" aria-hidden="true">
  <pre>{portrait.trim()}</pre>
</div>

<style>
  .portrait {
    min-width: 0;
    container-type: inline-size;
  }
  pre {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 1.7cqw;
    line-height: 1;
    letter-spacing: 0;
    white-space: pre;
    color: var(--color-portrait);
  }
</style>
