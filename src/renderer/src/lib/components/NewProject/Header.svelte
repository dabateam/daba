<script>
  import CaretDown from "../../assets/CaretDown.svelte"
  import { routingState } from "../../store.svelte"
</script>

{#if routingState.view !== "new-project.loading-create"}
  <div
    class="h-[34px] flex items-center justify-center text-[10px] border-b border-white/5"
  >
    {#if routingState.view === "new-project"}
      <div class="p-[12px]">New project</div>
    {:else if routingState.view === "new-project.pick-starter"}
      <div
        onclick={() => {
          routingState.view = "new-project"
        }}
        class="p-[12px] opacity-50 hover:opacity-70 active:opacity-80"
      >
        New project (Starter)
      </div>
      <CaretDown class="opacity-50 w-[6px] -rotate-90" />
      <div
        onclick={() => {
          routingState.view = "new-project.summary"
        }}
        class="p-[12px] opacity-50 hover:opacity-70 active:opacity-80"
      >
        Project
      </div>
      <CaretDown class="opacity-50 w-[6px] -rotate-90" />
      <div class="p-[12px]">Starter</div>
    {:else if routingState.view === "new-project.summary"}
      <div
        onclick={() => {
          routingState.view = "new-project"
        }}
        class="p-[12px] opacity-50 hover:opacity-70 active:opacity-80"
      >
        New project (Starter)
      </div>
      <CaretDown class="opacity-50 w-[6px] -rotate-90" />
      <div class="p-[12px]">Project</div>
    {/if}
  </div>
{/if}
