<script>
  import CaretDown from "../../assets/CaretDown.svelte"
  import SmallCheck from "../../assets/SmallCheck.svelte"
  import { NEW_PROJECT_APPS_WIDTH } from "../../constants"
  import { store } from "../../store.svelte"
  import { cn } from "../../utils"

  let expose = $state(false)
  let value = $state("POSTGRES_PASSWORD")

  let currentApp = $derived(
    store.newProject.apps.find((a) => a.name === store.currentApp),
  )
</script>

<div class="size-full" style:padding-left={NEW_PROJECT_APPS_WIDTH + "px"}>
  <div class="flex h-full">
    <div
      class="flex-1 border-r border-white/5 h-full flex justify-center pt-[58px]"
    >
      <div class="w-[280px] flex flex-col gap-[32px]">
        <div class="flex items-center gap-[12px]">
          <div class="font-mono text-[#40AFFF]">
            {store.currentApp}
          </div>
          <div>
            <CaretDown class="opacity-30 w-[8px] -rotate-90" />
          </div>
          <div>Configure app</div>
        </div>
        <div class="flex items-end gap-[12px]">
          <div class="flex-1">
            <div class="text-[10px] mb-[12px] text-white/40">App name</div>
            <div class="relative">
              <input
                value={currentApp?.name}
                onblur={(e) => {
                  if (currentApp) {
                    currentApp.name = e.currentTarget.value
                    store.currentApp = e.currentTarget.value
                  }
                  console.log($state.snapshot(store.newProject))
                }}
                autocorrect="off"
                spellcheck="false"
                class=" hover:border-white/15 focus:border-white/15 focus:bg-white/[0.02] border rounded-[4px] h-[32px] px-[12px] border-white/10 cursor-text placeholder:text-[11px] placeholder:text-white/30 w-full"
                placeholder="Project name"
              />
            </div>
          </div>
          <div
            class="size-[32px] flex items-center justify-center border rounded-[4px] border-white/10 hover:bg-white/[0.02] active:bg-white/[0.03]"
          >
            <img
              src="images/{currentApp?.technology.defaultIcon}"
              alt=""
              class="h-[13px]"
            />
          </div>
        </div>
        <div>
          <div class="text-[10px] mb-[12px] text-white/40">Tech</div>
          <div
            class="h-[70px] flex flex-col gap-[8px] justify-center pl-[24px] w-full rounded-[6px] bg-white/[0.02] hover:bg-white/[0.03] active:bg-white/[0.04]"
          >
            <div class="w-fit">
              <img
                src="images/{currentApp?.technology.defaultIcon}"
                alt=""
                class="h-[16px]"
              />
            </div>
            <div class="text-[11px]">
              {currentApp?.technology.name}
            </div>
          </div>
        </div>
        <!-- <div>
            <div class="text-[10px] mb-[12px] text-white/40">Run in</div>
            <div class="flex gap-[12px]">
              <div
                class={cn(
                  "h-[32px] px-[12px] flex items-center border rounded-[4px] border-white/10 hover:bg-white/[0.02] active:bg-white/[0.03]",
                  true &&
                    "bg-white/5 text-white hover:bg-white/5 active:bg-white/5",
                )}
              >
                My computer
              </div>
              <div
                class={cn(
                  "h-[32px] px-[12px] flex items-center border rounded-[4px] border-white/10 hover:bg-white/[0.02] active:bg-white/[0.03] text-white/40",
                  false && "bg-white/5 text-white",
                )}
              >
                Container
              </div>
            </div>
          </div> -->
        <div
          onclick={() => (expose = !expose)}
          class="flex items-center gap-[8px] w-fit px-[10px] py-[8px] rounded-[4px] hover:bg-white/[0.02] active:bg-white/[0.03] ml-[-10px]"
        >
          <div
            class={cn(
              "size-[12px] rounded-[2px] border border-white/10 flex items-center justify-center",
            )}
          >
            {#if expose}
              <SmallCheck />
            {/if}
          </div>
          <div class={cn("text-[11px] text-white/40", expose && " text-white")}>
            Expose app
          </div>
        </div>
      </div>
    </div>
    <div class="px-[58px] h-full flex justify-center pt-[58px]">
      <div class="w-[280px] flex flex-col gap-[32px]">
        <div class="text-[12px] text-white/40">Env variables</div>

        {#each currentApp?.envVars || [] as envVar}
          <div class="font-mono text-[11px]">
            <div
              class="relative w-fit mb-[6px] hover:translate-x-[10px] focus-within:translate-x-[10px] transition-transform"
            >
              <div
                class="-ml-[10px] px-[10px] pointer-events-none opacity-0 h-[30px] border border-transparent whitespace-pre"
              >
                {envVar.key}
              </div>
              <input
                type="text"
                bind:value
                class="-ml-[10px] px-[10px] border absolute top-0 left-0 h-full w-[calc(100%+10px)] min-w-0 hover:border-white/10 focus:border-white/15 focus:bg-white/[0.02] border-transparent rounded-[4px] py-[4px] cursor-text"
              />
            </div>
            {#if envVar.description}
              <div
                class="font-sans -mt-[4px] text-white/40 text-[10px] mb-[12px]"
              >
                Password of the root super user
              </div>
            {/if}
            <input
              autocorrect="off"
              spellcheck="false"
              class=" hover:border-white/15 focus:border-white/15 focus:bg-white/[0.02] border rounded-[4px] h-[32px] px-[12px] border-white/10 cursor-text placeholder:text-[11px] placeholder:text-white/30 w-full"
              placeholder="Project name"
              value={envVar.value}
            />
          </div>
        {/each}

        <div class="flex items-center justify-center">
          <div
            class="text-white/40 text-[10px] rounded-[4px] px-[10px] py-[8px] hover:bg-white/[0.02] active:bg-white/[0.03]"
          >
            + New variable
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
