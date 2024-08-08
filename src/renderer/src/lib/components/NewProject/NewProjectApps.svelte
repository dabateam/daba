<script>
  import AddAppPlus from "../../assets/AddAppPlus.svelte"
  import { NEW_PROJECT_APPS_WIDTH } from "../../constants"
  import { store } from "../../store.svelte"
  import { cn } from "../../utils"
</script>

{#if store.flow === "DIY"}
  <div
    style:width={NEW_PROJECT_APPS_WIDTH + "px"}
    class="border-r pb-[20px] border-white/5 absolute top-0 h-full left-0 overflow-auto flex flex-col items-center gap-[20px] pt-[22px]"
  >
    <div class="text-white/30 mb-[62px] text-[11px]">New project</div>
    <div class="text-[11px] mb-[16px]">Apps</div>

    {#each store.newProject.apps as app}
      <div
        onclick={() => {
          store.currentApp = app.name
          store.step = "apps"
          store.showAddApp = false
        }}
        class={cn(
          "shrink-0 active:bg-white/[0.02] hover:bg-white/[0.01] size-[80px] rounded-[8px] border border-white/10 flex items-center justify-center gap-[12px] flex-col",

          store.currentApp === app.name &&
            "ring-[2px] ring-[#40AFFF]/80 border-transparent bg-white/[0.02] hover:bg-white/[0.02]",
        )}
      >
        <img
          src="images/{app.technology.defaultIcon}"
          alt=""
          class="h-[16px]"
        />
        <div class="text-[11px]">{app.name}</div>
      </div>
    {/each}
    <div
      onclick={() => {
        store.showAddApp = true
        store.currentApp = ""
      }}
      class={cn(
        "shrink-0 active:bg-white/[0.02] hover:bg-white/[0.01] size-[80px] rounded-[8px] flex items-center justify-center gap-[12px] flex-col border-dashed",
        store.showAddApp &&
          "ring-[2px] ring-[#40AFFF]/80 border-transparent bg-white/[0.02] hover:bg-white/[0.02]",
      )}
    >
      <AddAppPlus />
    </div>
  </div>
{/if}
