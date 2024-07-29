<script>
  import AddAppPlus from "../../assets/AddAppPlus.svelte"
  import { NEW_PROJECT_APPS_WIDTH } from "../../constants"
  import { newProjectState } from "../../store.svelte"
  import { cn } from "../../utils"
</script>

{#if newProjectState.flow === "DIY"}
  <div
    class="border-r border-white/5 w-[{NEW_PROJECT_APPS_WIDTH}px] absolute top-0 h-full left-0 overflow-auto flex flex-col items-center gap-[20px] justify-center"
  >
    <div class="text-[11px] mb-[16px]">Apps</div>

    {#each Array(3).fill("") as _, i}
      <div
        class={cn(
          "active:bg-white/[0.02] hover:bg-white/[0.01] size-[80px] rounded-[8px] border border-white/10 flex items-center justify-center gap-[12px] flex-col",

          i === 0 && "ring-[2px] ring-[#40AFFF]/80 border-transparent",

          // selectedTechnologies.includes(tech) &&
          //   "border-[#40AFFF]  bg-white/[0.02] hover:bg-white/[0.02]",
        )}
      >
        <img
          src="images/react.png"
          alt=""
          class={cn(
            "h-[16px]",

            // selectedTechnologies.includes(tech) && "opacity-100",
          )}
        />
        <div class="text-[11px]">...</div>
      </div>
    {/each}
    <div
      class={cn(
        "active:bg-white/[0.02] hover:bg-white/[0.01] size-[80px] rounded-[8px] flex items-center justify-center gap-[12px] flex-col border-dashed",

        // selectedTechnologies.includes(tech) &&
        //   "border-[#40AFFF]  bg-white/[0.02] hover:bg-white/[0.02]",
      )}
    >
      <div class="text-[11px]">
        <AddAppPlus />
      </div>
    </div>
  </div>
{/if}
