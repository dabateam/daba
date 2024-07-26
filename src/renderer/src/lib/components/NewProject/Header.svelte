<script>
  import { template } from "lodash"
  import CaretDown from "../../assets/CaretDown.svelte"
  import Cross from "../../assets/Cross.svelte"
  import { newProjectState } from "../../store.svelte"
  import { cn } from "../../utils"

  $inspect(newProjectState.shouldShowCancelWarning)
</script>

<div
  class="h-[56px] flex items-center justify-center border-b border-white/5 gap-[8px] text-[11px] relative"
>
  <div
    onclick={newProjectState.cancelNewProject}
    class="absolute size-[28px] flex items-center justify-center top-[50%] translate-y-[-50%] right-[14px] rounded-[4px] hover:bg-white/[0.03] active:bg-white/[0.04]"
  >
    <Cross class="opacity-30" />
  </div>
  <div
    onclick={() => {
      newProjectState.step = "starter"
    }}
    class={cn(
      "text-white/40 p-[12px] hover:text-white/60",

      newProjectState.step === "starter" && "text-white hover:text-white",
    )}
  >
    {#if newProjectState.step === "summary" || newProjectState.step === "loading"}
      1.&nbsp;&nbsp;&nbsp;Starter:&nbsp;
      <span class="py-[3px] border-b border-white/10"
        >{newProjectState.newProject.template}</span
      >
    {:else}
      1.&nbsp;&nbsp;&nbsp;Pick a starter
    {/if}
  </div>
  <CaretDown class="opacity-30 w-[7px] -rotate-90" />

  <div
    onclick={() => {
      if (newProjectState.newProject.template) newProjectState.step = "summary"
    }}
    class={cn(
      "text-white/40 p-[12px] ",
      !!newProjectState.newProject.template && "hover:text-white/60",
      newProjectState.step === "summary" && "text-white hover:text-white",
    )}
  >
    2.&nbsp;&nbsp;&nbsp;Summary
  </div>
  <CaretDown class="opacity-30 w-[7px] -rotate-90" />

  <div
    class={cn(
      "text-white/40 p-[12px]",

      newProjectState.step === "loading" && "text-white hover:text-white",
    )}
  >
    3.&nbsp;&nbsp;&nbsp;Install and run
  </div>
</div>
