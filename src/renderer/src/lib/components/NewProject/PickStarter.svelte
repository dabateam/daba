<script lang="ts">
  import { TEMPLATES } from "../../../../../shared/constants"
  import Search from "../../assets/Search.svelte"
  import { newProjectState } from "../../store.svelte"
  import { cn } from "../../utils"
</script>

{#if newProjectState.step === "starter"}
  <div class="w-[320px]">
    <div class="text-[14px] text-center my-[7vh]">Pick a starter</div>
    <div class="relative mb-[28px]">
      <Search class="absolute top-[50%] -translate-y-[50%] left-[14px]" />

      <input
        class="pl-[32px] hover:border-white/15 focus:border-white/15 focus:bg-white/[0.02] border rounded-[4px] h-[32px] border-white/10 cursor-text text-[11px] placeholder:text-white/30 w-full"
        placeholder="Search starters by name, tech, description, ..."
      />
    </div>

    <div class="flex flex-col gap-[20px] flex-1">
      {#each TEMPLATES as template}
        <div
          class={cn(
            "w-full rounded-[8px] border border-white/10 p-[20px] flex flex-col active:bg-white/[0.02] hover:bg-white/[0.01]",
            newProjectState.selectedTemplate === template.name &&
              "ring-[2px] ring-[#40AFFF]/80 border-transparent bg-white/[0.02] hover:bg-white/[0.02]",
            newProjectState.selectedTemplate &&
              newProjectState.selectedTemplate !== template.name &&
              "opacity-70 ",
          )}
          onclick={() => {
            if (newProjectState.selectedTemplate === template.name)
              newProjectState.selectedTemplate = ""
            else newProjectState.selectedTemplate = template.name
          }}
        >
          <div>
            <img
              src="images/starters-images/{template.image}"
              alt=""
              class="h-[20px] mb-[8px]"
            />
          </div>
          <div class="mb-[10px]">{template.name}</div>
          <div class="text-[10px] text-white/50">
            {template.description}
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
