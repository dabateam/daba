<script>
  import CaretDown from "../../assets/CaretDown.svelte"
  import Cross from "../../assets/Cross.svelte"
  import { NEW_PROJECT_APPS_WIDTH } from "../../constants"
  import { store } from "../../store.svelte"
  import { cn } from "../../utils"
</script>

<div
  class="h-[56px] flex items-center justify-center border-b border-white/5 gap-[8px] text-[11px] relative"
  style:margin-left={store.flow === "DIY"
    ? NEW_PROJECT_APPS_WIDTH + "px"
    : "unset"}
>
  <div
    onclick={store.cancelNewProject}
    class="absolute size-[28px] flex items-center justify-center top-[50%] translate-y-[-50%] right-[14px] rounded-[4px] hover:bg-white/[0.03] active:bg-white/[0.04]"
  >
    <Cross class="opacity-30" />
  </div>

  {#if store.flow === "Starters"}
    <div
      onclick={() => {
        store.step = "starter"
      }}
      class={cn(
        "text-white/40 p-[12px] hover:text-white/60",

        store.step === "starter" && "text-white hover:text-white",
      )}
    >
      {#if store.step === "summary" || store.step === "loading"}
        1.&nbsp;&nbsp;&nbsp;Starter:&nbsp;
        <span class="py-[3px] border-b border-white/10"
          >{store.newProject.template}</span
        >
      {:else}
        1.&nbsp;&nbsp;&nbsp;Pick a starter
      {/if}
    </div>
  {:else if store.flow === "DIY"}
    <div
      onclick={() => {
        store.step = "apps"
      }}
      class={cn(
        "text-white/40 p-[12px] hover:text-white/60",

        store.step === "apps" && "text-white hover:text-white",
      )}
    >
      1.&nbsp;&nbsp;&nbsp;Choose apps
    </div>
  {/if}

  <CaretDown class="opacity-30 w-[7px] -rotate-90" />

  <div
    onclick={() => {
      if (store.newProject.template) store.step = "summary"
    }}
    class={cn(
      "text-white/40 p-[12px] ",
      !!store.newProject.template && "hover:text-white/60",
      store.step === "summary" && "text-white hover:text-white",
    )}
  >
    2.&nbsp;&nbsp;&nbsp;Summary
  </div>
  <CaretDown class="opacity-30 w-[7px] -rotate-90" />

  <div
    class={cn(
      "text-white/40 p-[12px]",

      store.step === "loading" && "text-white hover:text-white",
    )}
  >
    3.&nbsp;&nbsp;&nbsp;Install and run
  </div>
</div>
