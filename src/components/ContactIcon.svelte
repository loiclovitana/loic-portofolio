<script lang="ts">
  let { src }: { src: string } = $props();
</script>

<span class="icon" style:--icon-url={`url("${src}")`} aria-hidden="true"></span>

<style>
  .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    flex: none;
    background: currentColor;
    -webkit-mask: var(--icon-url) center / contain no-repeat;
    mask: var(--icon-url) center / contain no-repeat;
  }
</style>
