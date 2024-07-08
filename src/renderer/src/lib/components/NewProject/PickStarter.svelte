<script lang="ts">
  import { TEMPLATES } from "../../../../../shared/constants"
  import { newProjectState } from "../../store.svelte"
  import { cn } from "../../utils"

  const TECHNOLOGIES = [
    "React",
    "Vue",
    "Svelte",
    "Node",
    "Python",
    "Go",
    "Postgres",
    "Mongo",
    "MySQL",
    "Redis",
  ]

  const PROJECT_TYPES = [
    "Todo list",
    "Chat",
    "CRM",
    "Dashboard",
    "E-commerce",
    "Trello",
    "Notes",
    "SaaS",
  ]

  let selectedTechnologies = $state<string[]>([])

  let selectedProjectTypes = $state<string[]>([])
</script>

<div class="flex w-full px-[100px] gap-[80px] justify-center">
  <div class="flex flex-col gap-[40px] max-w-[300px] w-full">
    <div class="text-[14px]">Pick a starter</div>
    <input
      class=" hover:border-white/15 focus:border-[hsla(208,100%,63%,1)] border rounded-[4px] h-[32px] px-[12px] border-white/10 cursor-text text-[11px] placeholder:text-white/30 focus:placeholder:text-white/50 w-full"
      placeholder="Search starters by name, tech, description, ..."
    />
    <div>
      <div
        class={cn(
          "text-[10px] text-white/50 mb-[16px]",
          selectedTechnologies.length > 0 && "text-white/100",
        )}
      >
        Technology
      </div>
      <div class="flex gap-[10px] flex-wrap">
        {#each TECHNOLOGIES as technology}
          <div
            onclick={() => {
              if (selectedTechnologies.includes(technology)) {
                selectedTechnologies = selectedTechnologies.filter(
                  (t) => t !== technology,
                )
              } else {
                selectedTechnologies.push(technology)
              }
            }}
            class={cn(
              "whitespace-nowrap text-[11px] px-[12px] py-[8px] rounded-[4px] text-white/50 bg-white/[0.02] hover:bg-white/[0.03] active:bg-white/[0.04]",
              selectedTechnologies.includes(technology) &&
                "text-white/100 ring-[1px] ring-[#40AFFF]",
            )}
          >
            {technology}
          </div>
        {/each}
      </div>
    </div>
    <div>
      <div
        class={cn(
          "text-[10px] text-white/50 mb-[16px]",
          selectedProjectTypes.length > 0 && "text-white/100",
        )}
      >
        Project
      </div>
      <div class="flex gap-[10px] flex-wrap">
        {#each PROJECT_TYPES as projectType}
          <div
            onclick={() => {
              if (selectedProjectTypes.includes(projectType)) {
                selectedProjectTypes = selectedProjectTypes.filter(
                  (t) => t !== projectType,
                )
              } else {
                selectedProjectTypes.push(projectType)
              }
            }}
            class={cn(
              "whitespace-nowrap text-[11px] px-[12px] py-[8px] rounded-[4px] text-white/50 bg-white/[0.02] hover:bg-white/[0.03] active:bg-white/[0.04]",
              selectedProjectTypes.includes(projectType) &&
                "text-white/100 ring-[1px] ring-[#40AFFF]",
            )}
          >
            {projectType}
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div class="flex flex-col gap-[20px] max-w-[400px] flex-1">
    {#each TEMPLATES as template}
      <div
        class={cn(
          "w-full rounded-[8px] border border-white/10 p-[20px] flex flex-col active:bg-white/[0.03] hover:bg-white/[0.02]",
          newProjectState.selectedTemplate === template.name &&
            "border-[#40AFFF] bg-white/[0.03] hover:bg-white/[0.03]",
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
