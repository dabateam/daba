<script>
  import CaretDown from "../../assets/CaretDown.svelte"
  import { newProjectState, routingState } from "../../store.svelte"
  import { cn } from "../../utils"

  $inspect(newProjectState.shouldShowCancelWarning)
</script>

<div
  class="h-[56px] flex items-center justify-center border-b border-white/5 gap-[8px] text-[11px]"
>
  <div
    onclick={() => {
      routingState.view = "new-project"
    }}
    class={cn(
      "text-white/40 p-[12px] hover:text-white/60",

      routingState.view === "new-project" && "text-white hover:text-white",
    )}
  >
    {#if routingState.view === "new-project"}
      1.&nbsp;&nbsp;&nbsp;New project flow
    {:else}
      1.&nbsp;&nbsp;&nbsp;Flow:&nbsp;
      <span class="py-[3px] border-b border-white/10"
        >{newProjectState.flow}</span
      >
    {/if}
  </div>
  <CaretDown class="opacity-30 w-[7px] -rotate-90" />

  <div
    onclick={() => {
      routingState.view = "new-project.pick-starter"
    }}
    class={cn(
      "text-white/40 p-[12px] hover:text-white/60",

      routingState.view === "new-project.pick-starter" &&
        "text-white hover:text-white",
    )}
  >
    {#if routingState.view === "new-project.summary" || routingState.view === "new-project.loading-create"}
      2.&nbsp;&nbsp;&nbsp;Starter:&nbsp;
      <span class="py-[3px] border-b border-white/10"
        >{newProjectState.newProject.template}</span
      >
    {:else}
      2.&nbsp;&nbsp;&nbsp;Pick a starter
    {/if}
  </div>
  <CaretDown class="opacity-30 w-[7px] -rotate-90" />

  <div
    onclick={() => {
      routingState.view = "new-project.summary"
    }}
    class={cn(
      "text-white/40 p-[12px] hover:text-white/60",

      routingState.view === "new-project.summary" &&
        "text-white hover:text-white",
    )}
  >
    3.&nbsp;&nbsp;&nbsp;Summary
  </div>
  <CaretDown class="opacity-30 w-[7px] -rotate-90" />

  <div
    onclick={() => {
      routingState.view = "new-project.loading-create"
    }}
    class={cn(
      "text-white/40 p-[12px] hover:text-white/60",

      routingState.view === "new-project.loading-create" &&
        "text-white hover:text-white",
    )}
  >
    4.&nbsp;&nbsp;&nbsp;Install and run
  </div>
</div>
