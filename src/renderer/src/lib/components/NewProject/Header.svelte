<script>
  import CaretDown from "../../assets/CaretDown.svelte"
  import { routingState } from "../../store.svelte"
  import { cn } from "../../utils"
  // import { routingState } from "../../store.svelte"
</script>

<!-- {#if routingState.view !== "new-project.loading-create"}
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
{/if} -->

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
    <!-- 1.&nbsp;&nbsp;&nbsp;Flow:&nbsp;&nbsp;
    <span class="py-[3px] border-b border-white/10">Starters</span> -->
    1.&nbsp;&nbsp;&nbsp;New project flow
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
    2.&nbsp;&nbsp;&nbsp;Project setup
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
