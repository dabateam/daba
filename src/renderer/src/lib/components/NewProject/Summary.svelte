<script lang="ts">
  import { TEMPLATES } from "../../../../../shared/constants"
  import { newProjectState, routingState } from "../../store.svelte"
  import { cn } from "../../utils"

  let inputRef = $state<HTMLInputElement | null>(null)

  const fixName = (name: string) => {
    return name
      .replace(/\s/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase()
  }

  $effect(() => {
    if (inputRef && !newProjectState.newProject.name) {
      inputRef.focus()
    }
  })

  const templateImage = $derived(
    TEMPLATES.find((t) => t.name === newProjectState.newProject.template)
      ?.image,
  )
</script>

<div>
  <div class="flex flex-col gap-[40px]">
    <div class="text-[13px] text-center text-white/50">Summary</div>
    <div>
      <div class="text-[10px] mb-[12px]">Project</div>

      <div class="relative">
        <input
          bind:this={inputRef}
          oninput={(e) => {
            const correctValue = fixName(e.currentTarget.value)
            newProjectState.newProject.name = correctValue
          }}
          class={cn(
            " hover:border-white/15 focus:border-[hsla(208,100%,63%,1)] border rounded-[4px] h-[32px] px-[12px] border-white/10 cursor-text placeholder:text-[11px] placeholder:text-white/30 focus:placeholder:text-white/50 w-[270px]",
          )}
          placeholder="Project name"
          bind:value={newProjectState.newProject.name}
        />
        {#if newProjectState.nameAlreadyExists}
          <div
            class="text-[#FF4F3F] text-[10px] absolute -bottom-[20px] left-0"
          >
            A project with this name already exists.
          </div>
        {/if}
      </div>
    </div>
    <div>
      <div class="text-[10px] mb-[12px]">Starter</div>
      <div
        onclick={() => (routingState.view = "new-project.pick-starter")}
        class="px-[12px] h-[32px] flex items-center rounded-[4px] border border-white/10 hover:bg-white/[0.02] active:bg-white/[0.03] justify-between"
      >
        <div>
          {newProjectState.newProject.template}
        </div>
        <div class="h-[16px]">
          {#if templateImage}
            <img
              src={`images/starters-images/${templateImage}`}
              alt=""
              class="object-contain size-full"
            />
          {/if}
        </div>
      </div>
    </div>
    <div>
      <div class="text-[10px] mb-[16px]">Apps</div>
      <div class="flex flex-col gap-[12px]">
        {#each newProjectState.newProject.apps as app}
          <div
            class="bg-white/[0.03] rounded-[4px] h-[32px] px-[10px] flex items-center justify-between"
          >
            <div class="flex items-center gap-[8px]">
              <div class="size-[16px] flex items-center justify-center">
                <img
                  src={`images/${app.tech}.png`}
                  alt=""
                  class="object-contain size-full"
                />
              </div>
              <div>{app.name}</div>
            </div>
            <div class="text-[10px] text-white/50">{app.tech}</div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
