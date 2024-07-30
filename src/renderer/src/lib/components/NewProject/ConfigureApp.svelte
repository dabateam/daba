<script>
  import { newProjectState } from "../../store.svelte"
</script>

{#if newProjectState.currentApp}
  <div>
    current app: {newProjectState.currentApp}
  </div>
{/if}
