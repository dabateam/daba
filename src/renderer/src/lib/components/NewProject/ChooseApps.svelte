<script lang="ts">
  import { TECHNOLOGIES } from "../../../../../shared/constants"
  import Search from "../../assets/Search.svelte"
  import { NEW_PROJECT_APPS_WIDTH } from "../../constants"
  import { store } from "../../store.svelte"
  import { cn } from "../../utils"

  const isSelected = (technology: string) =>
    store.newProject.apps.find((a) => a.technology.name === technology)?.name
</script>

{#if store.step === "apps" && !store.currentApp}
  <div
    class="w-[480px]"
    style:margin-left={store.flow === "DIY"
      ? NEW_PROJECT_APPS_WIDTH + "px"
      : "unset"}
  >
    <div class="text-[14px] text-center mt-[7vh]">Choose one or more apps</div>
    <div class="text-[11px] text-white/40 text-center mt-[16px] mb-[7vh]">
      Compose your project's tech stack
    </div>
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
            if (
              store.newProject.apps.find((a) => a.technology.name === tech.name)
            )
              store.newProject.apps = store.newProject.apps.filter(
                (a) => a.technology.name !== tech.name,
              )
            else
              store.newProject.apps.push({
                name: tech.defaultLabel || "",
                technology: tech,
                envVars: tech.envVars || [],
              })
          }}
          class={cn(
            "active:bg-white/[0.02] hover:bg-white/[0.01] size-[80px] rounded-[8px] border border-white/10 flex items-center justify-center gap-[12px] flex-col",

            isSelected(tech.name) &&
              "ring-[2px] ring-[#40AFFF]/80 border-transparent bg-white/[0.02] hover:bg-white/[0.02]",
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
{/if}
