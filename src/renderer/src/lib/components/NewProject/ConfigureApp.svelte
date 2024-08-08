<script>
  import CaretDown from "../../assets/CaretDown.svelte"
  import SmallCheck from "../../assets/SmallCheck.svelte"
  import { NEW_PROJECT_APPS_WIDTH } from "../../constants"
  import { store } from "../../store.svelte"
  import { cn } from "../../utils"

  let expose = $state(false)
</script>

{#if store.currentApp}
  <div class="size-full" style:padding-left={NEW_PROJECT_APPS_WIDTH + "px"}>
    <div class="flex h-full">
      <div
        class="flex-1 border-r border-white/10 h-full flex justify-center pt-[40px]"
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
                  autocorrect="off"
                  spellcheck="false"
                  class=" hover:border-white/15 focus:border-white/15 focus:bg-white/[0.02] border rounded-[4px] h-[32px] px-[12px] border-white/10 cursor-text placeholder:text-[11px] placeholder:text-white/30 w-full"
                  placeholder="Project name"
                />
              </div>
            </div>
            <div
              class="size-[32px] border rounded-[4px] border-white/10 hover:bg-white/[0.02] active:bg-white/[0.03]"
            ></div>
          </div>
          <div>
            <div class="text-[10px] mb-[12px] text-white/40">Tech</div>
            <div
              class="h-[70px] flex items-center pl-[24px] w-full border rounded-[4px] border-white/10 hover:bg-white/[0.01] active:bg-white/[0.02]"
            >
              tech
            </div>
          </div>
          <div>
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
          </div>
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
            <div
              class={cn("text-[11px] text-white/40", expose && " text-white")}
            >
              Expose app
            </div>
          </div>
          <div>ports</div>
          <div>info-msg1</div>
          <div>info-msg2</div>
        </div>
      </div>
      <div class="flex-1 h-full flex justify-center pt-[40px]">
        <div class="w-[280px] ring">
          <div>Environment variables</div>
          <div>var1</div>
          <div>var2</div>
          <div>var3</div>
          <div>new var</div>
        </div>
      </div>
    </div>
  </div>
{/if}
