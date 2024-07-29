<script lang="ts">
  import Search from "../../assets/Search.svelte"
  import { newProjectState } from "../../store.svelte"
  import { cn } from "../../utils"

  const TECHNOLOGIES = [
    "React",
    "Vue",
    "Svelte",
    "Node",
    "Python",
    "Postgres",
    "MongoDB",
    "MySQL",
    "Redis",
  ]

  let selectedTechnologies = $state<string[]>([])

  const addTechnology = (technology: string) => {
    if (selectedTechnologies.includes(technology)) {
      selectedTechnologies = selectedTechnologies.filter(
        (t) => t !== technology,
      )
    } else {
      selectedTechnologies.push(technology)
    }
  }
</script>

{#if newProjectState.step === "apps"}
  <div class="w-[480px] ml-[180px]">
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
          onclick={() => addTechnology(tech)}
          class={cn(
            "active:bg-white/[0.02] hover:bg-white/[0.01] size-[80px] rounded-[8px] border border-white/10 flex items-center justify-center gap-[12px] flex-col",

            selectedTechnologies.includes(tech) &&
              "ring-[2px] ring-[#40AFFF]/80 border-transparent bg-white/[0.02] hover:bg-white/[0.02]",
          )}
        >
          <img
            src="images/{tech.toLowerCase()}.png"
            alt=""
            class={cn(
              "h-[16px]",

              // selectedTechnologies.includes(tech) && "opacity-100",
            )}
          />
          <div class="text-[11px]">{tech}</div>
        </div>
      {/each}
    </div>
  </div>
{/if}
