<script>
  import AddAppPlus from "../../assets/AddAppPlus.svelte"
  import { NEW_PROJECT_APPS_WIDTH } from "../../constants"
  import { newProjectState } from "../../store.svelte"
  import { cn } from "../../utils"
</script>

{#if newProjectState.flow === "DIY"}
  <div
    style:width={NEW_PROJECT_APPS_WIDTH + "px"}
    class="border-r border-white/5 absolute top-0 h-full left-0 overflow-auto flex flex-col items-center gap-[20px] justify-center"
  >
    <div class="text-[11px] mb-[16px]">Apps</div>

    {#each newProjectState.newProject.apps as app}
      <div
        onclick={() => {
          newProjectState.currentApp = app.name
        }}
        class={cn(
          "active:bg-white/[0.02] hover:bg-white/[0.01] size-[80px] rounded-[8px] border border-white/10 flex items-center justify-center gap-[12px] flex-col",

          newProjectState.currentApp === app.name &&
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
      class="active:bg-white/[0.02] hover:bg-white/[0.01] size-[80px] rounded-[8px] flex items-center justify-center gap-[12px] flex-col border-dashed"
    >
      <div class="text-[11px]">
        <AddAppPlus />
      </div>
    </div>
  </div>
{/if}
