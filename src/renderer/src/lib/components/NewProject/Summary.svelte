<script lang="ts">
  import { TEMPLATES } from "../../../../../shared/constants"
  import { NEW_PROJECT_APPS_WIDTH } from "../../constants"
  import { store } from "../../store.svelte"
  import { cn } from "../../utils"

  let inputRef = $state<HTMLInputElement | null>(null)

  const fixName = (name: string) => {
    return name
      .replace(/\s/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase()
  }

  $effect(() => {
    if (inputRef) {
      inputRef.focus()
    }
  })

  const templateImage = $derived(
    TEMPLATES.find((t) => t.name === store.newProject.template)?.image,
  )
</script>

<div
  class="w-fit justify-center h-full"
  style:margin-left={store.flow === "DIY"
    ? NEW_PROJECT_APPS_WIDTH + "px"
    : "unset"}
>
  <div class="text-[13px] text-center my-[7vh]">Summary</div>
  <div class="flex flex-col gap-[40px]">
    <div class="relative">
      <div class="text-[10px] mb-[12px]">Project</div>

      <div class="relative">
        <input
          bind:this={inputRef}
          oninput={(e) => {
            const correctValue = fixName(e.currentTarget.value)
            store.newProject.name = correctValue
          }}
          autocorrect="off"
          spellcheck="false"
          class={cn(
            " hover:border-white/15 focus:border-white/15 focus:bg-white/[0.02] border rounded-[4px] h-[32px] px-[12px] border-white/10 cursor-text placeholder:text-[11px] placeholder:text-white/30  w-[270px]",
          )}
          placeholder="Project name"
          bind:value={store.newProject.name}
        />
        {#if store.nameAlreadyExists}
          <div
            class="text-[#FF4F3F] text-[10px] absolute -bottom-[20px] left-0"
          >
            A project with this name already exists.
          </div>
        {/if}
      </div>
    </div>
    {#if store.flow === "Starters"}
      <div>
        <div class="text-[10px] mb-[12px]">Starter</div>
        <div
          onclick={() => (store.step = "starter")}
          class="px-[12px] h-[32px] flex items-center rounded-[4px] border border-white/10 hover:bg-white/[0.02] active:bg-white/[0.03] justify-between"
        >
          <div>
            {store.newProject.template}
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
          {#each store.newProject.apps as app}
            <div
              class="bg-white/[0.03] rounded-[4px] h-[32px] px-[10px] flex items-center justify-between"
            >
              <div class="flex items-center gap-[8px]">
                <div class="size-[16px] flex items-center justify-center">
                  <img
                    src={`images/${app.icon}.png`}
                    alt=""
                    class="object-contain size-full"
                  />
                </div>
                <div>{app.name}</div>
              </div>
              <div class="text-[10px] text-white/50">{app.icon}</div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>
