<script lang="ts">
  import Loader from "../assets/Loader.svelte"
  import Plus from "../assets/Plus.svelte"
  import { store } from "../store.svelte"
  import { cn, tippy } from "../utils"
</script>

<div
  class="ml-[24px] mr-[20px] text-[10px] mb-[8px] flex items-center justify-between h-[32px] mt-[8px]"
>
  <div class="opacity-50">Projects</div>
  <div class="flex items-center opacity-30 gap-[4px]">
    <button
      use:tippy={{
        content: "Create a new project",
        duration: [0, 0],
      }}
      onclick={() => (store.showFlowModal = true)}
      class="size-[20px] flex items-center justify-center hover:bg-white/15 active:bg-white/25 rounded-[4px]"
    >
      <Plus />
    </button>
  </div>
</div>
<div class="flex flex-col gap-[4px]">
  {#each store.projects as project}
    {@const loading = store.deleteLoadings.includes(project.name)}
    <button
      onclick={() => {
        store.view = "project"
        store.currentProject = project
      }}
      class={cn(
        "flex items-center justify-between gap-[8px] h-[32px] px-[12px] mx-[12px] hover:bg-white/[0.02] active:bg-white/[0.03]  rounded-[6px]",

        store.currentProject?.name === project.name &&
          "bg-[#40AFFF]/10 hover:bg-[#40AFFF]/10 active:bg-[#40AFFF]/10 text-[#40AFFF]",
        loading && "pointer-events-none opacity-30",
      )}
    >
      {project.name}
      {#if loading}
        <Loader class="size-[12px] opacity-80" />
      {/if}
    </button>
  {/each}
</div>
