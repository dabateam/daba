<script lang="ts">
  import { fade, scale } from "svelte/transition"
  import AiGeneratedStarter from "../../assets/AIGeneratedStarter.svelte"
  import Cubes from "../../assets/Cubes.svelte"
  import ImportExistingProject from "../../assets/ImportExistingProject.svelte"
  import Settings from "../../assets/Settings.svelte"
  import { newProjectState } from "../../store.svelte"
  import { cn } from "../../utils"

  $effect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        newProjectState.showFlowModal = false
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  })

  const chooseFlow = (flow: typeof newProjectState.flow) => {
    newProjectState.flow = flow
    newProjectState.showFlowModal = false
    newProjectState.show = true
    if (flow === "DIY") newProjectState.step = "apps"
    else if (flow === "Starters") newProjectState.step = "starter"
  }
</script>

{#if newProjectState.showFlowModal}
  <div
    class="fixed top-0 left-0 size-full flex justify-center items-center pl-[270px]"
  >
    <div
      transition:fade={{ duration: 200 }}
      onclick={(e) => {
        if (e.target === e.currentTarget) newProjectState.showFlowModal = false
      }}
      class="absolute top-0 left-0 size-full bg-black/30"
    ></div>
    <div
      transition:scale={{ start: 0.97, duration: 150 }}
      class="relative text-white bg-[#242424] rounded-[10px] shadow-2xl flex items-center justify-center flex-col border border-white/[0.05]"
    >
      <div class="flex flex-col">
        <div
          class={cn(
            " border-b border-white/5 last:border-b-0 flex items-center hover:bg-white/[0.02] active:bg-white/[0.03] gap-[20px] py-[28px] pl-[24px] pr-[52px]",
          )}
          onclick={() => chooseFlow("Starters")}
        >
          <div
            class="size-[56px] bg-white/5 rounded-full shrink-0 flex items-center justify-center text-[#66BFFF]"
          >
            <Cubes />
          </div>
          <div>
            <div class="text-[13px] mb-[6px]">Starters & boilerplates</div>
            <div class="text-[11px] leading-[17px] text-white/50">
              Choose from a list of community-made starters<br />and
              boilerplates, and tweak them to your needs.
            </div>
          </div>
        </div>
        <div
          class={cn(
            " border-b border-white/5 last:border-b-0 flex items-center hover:bg-white/[0.02] active:bg-white/[0.03] gap-[20px] py-[28px] pl-[24px] pr-[52px]",
          )}
          onclick={() => chooseFlow("DIY")}
        >
          <div
            class="size-[56px] bg-white/5 rounded-full shrink-0 flex items-center justify-center text-[#5878EA]"
          >
            <Settings />
          </div>
          <div>
            <div class="text-[13px] mb-[6px]">
              Build my own tech stack / DIY
            </div>
            <div class="text-[11px] leading-[17px] text-white/50">
              Compose your app from a list of<br />
              technologies, libraries and frameworks.
            </div>
          </div>
        </div>
        <div
          class={cn(
            "opacity-40 border-b border-white/15 last:border-b-0 flex items-center hover:bg-white/[0.02] active:bg-white/[0.03] gap-[20px] py-[28px] px-[24px] pointer-events-none",
          )}
          onclick={() => {
            newProjectState.flow = "Clone / Import"
            // routingState.view = "new-project.pick-starter"
          }}
        >
          <div
            class="size-[56px] bg-white/5 rounded-full shrink-0 flex items-center justify-center"
          >
            <ImportExistingProject />
          </div>
          <div>
            <div class="text-[13px] mb-[6px]">
              Import / clone an existing project
              <span
                class="inline-block uppercase text-[8px] ml-[2px] tracking-wider p-[4px] px-[6px] translate-y-[-1px] bg-black/50 opacity-60 rounded-[3px] border border-white/20"
              >
                Coming soon
              </span>
            </div>
            <div class="text-[11px] leading-[17px] text-white/50">
              Clone and deploy a popular open source project,<br />
              or connect your own git repo.
            </div>
          </div>
        </div>
        <div
          class={cn(
            "opacity-40 border-b border-white/15 last:border-b-0 flex items-center hover:bg-white/[0.02] active:bg-white/[0.03] gap-[20px] py-[28px] pl-[24px] pr-[52px] pointer-events-none",
          )}
          onclick={() => {
            newProjectState.flow = "AI Starter"
            // routingState.view = "new-project.pick-starter"
          }}
        >
          <div
            class="size-[56px] bg-white/5 rounded-full shrink-0 flex items-center justify-center"
          >
            <AiGeneratedStarter />
          </div>
          <div>
            <div class="text-[13px] mb-[6px]">
              AI-generated starter
              <span
                class="inline-block uppercase text-[8px] ml-[2px] tracking-wider p-[4px] px-[6px] translate-y-[-1px] bg-black/50 opacity-60 rounded-[3px] border border-white/20"
              >
                Coming soon
              </span>
            </div>
            <div class="text-[11px] leading-[17px] text-white/50">
              Describe your project and let AI suggest<br />
              a tech stack and generate boilerplate code.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
