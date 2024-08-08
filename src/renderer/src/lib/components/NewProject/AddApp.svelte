<script lang="ts">
  import { TECHNOLOGIES } from "../../../../../shared/constants"
  import Search from "../../assets/Search.svelte"
  import { NEW_PROJECT_APPS_WIDTH } from "../../constants"
  import { store } from "../../store.svelte"
  import { cn } from "../../utils"

  const isSelected = (technology: string) =>
    store.newProject.apps.find((a) => a.technology.name === technology)?.name
</script>

<div
  class="w-[480px]"
  style:margin-left={store.flow === "DIY"
    ? NEW_PROJECT_APPS_WIDTH + "px"
    : "unset"}
>
  <div class="text-[14px] text-center mt-[56px] mb-[40px]">Add a new app</div>
  <div class="relative mb-[28px]">
    <Search class="absolute top-[50%] -translate-y-[50%] left-[14px]" />

    <input
      class="pl-[32px] hover:border-white/15 focus:border-white/15 focus:bg-white/[0.02] border rounded-[4px] h-[32px] border-white/10 cursor-text text-[11px] placeholder:text-white/30 w-full"
      placeholder="Search starters by name, tech, description, ..."
    />
  </div>

  <div class="flex gap-[20px] flex-1 flex-wrap">
    {#each TECHNOLOGIES as tech}
      <div
        onclick={() => {
          let label = tech.defaultLabel || ""
          let count = 1
          while (store.newProject.apps.find((a) => a.name === label)) {
            count++
            label = tech.defaultLabel + "_" + count
          }
          store.newProject.apps.push({
            name: label,
            technology: tech,
            envVars: tech.envVars || [],
          })
          store.currentApp = label
          store.showAddApp = false
        }}
        class={cn(
          "active:bg-white/[0.02] hover:bg-white/[0.01] size-[80px] rounded-[8px] border border-white/10 flex items-center justify-center gap-[12px] flex-col",
        )}
      >
        <img
          src="images/{tech.defaultIcon}"
          alt=""
          class={cn(
            "h-[16px]",

            isSelected(tech.name) && "opacity-100",
          )}
        />
        <div class="text-[11px]">{tech.name}</div>
      </div>
    {/each}
  </div>
</div>
