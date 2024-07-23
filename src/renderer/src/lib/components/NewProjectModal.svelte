<script>
  import { newProjectState, routingState } from "../store.svelte"
  import { cn } from "../utils"
  import NewProject from "./NewProject/NewProject.svelte"

  $effect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (newProjectState.showCancelWarning) {
          newProjectState.showCancelWarning = false
          return
        }

        if (newProjectState.shouldShowCancelWarning) {
          newProjectState.showCancelWarning = true
          return
        }

        newProjectState.reset()
        routingState.view = ""

        console.log("escape pressed")
      }
    })
  })
</script>

<div
  onclick={(e) => {
    if (e.target === e.currentTarget) {
      console.log("click outside")
      if (newProjectState.shouldShowCancelWarning)
        newProjectState.showCancelWarning = true
      else {
        newProjectState.reset()
        routingState.view = ""
      }
    }
  }}
  class="fixed top-0 left-0 size-full bg-black/30 flex justify-center items-center p-[40px]"
>
  <div
    class="size-full max-w-[1000px] max-h-[800px] min-h-[720px] min-w-[800px]
  text-white bg-[#242424] rounded-[10px] shadow-2xl flex flex-col border border-white/[0.05]"
  >
    <NewProject />
  </div>
</div>
{#if newProjectState.showCancelWarning}
  <div
    onclick={(e) => {
      if (e.target === e.currentTarget) {
        newProjectState.showCancelWarning = false
      }
    }}
    class="fixed top-0 left-0 size-full bg-black/30 flex justify-center items-center p-[40px]"
  >
    <div
      class="text-white text-center bg-[#242424] rounded-[10px] p-[40px] px-[50px] pb-[28px] shadow-xl flex items-center justify-center flex-col border border-white/[0.05]"
    >
      <div class="text-[13px] mb-[16px]">Are you sure you want to leave?</div>
      <div class="text-[11px] opacity-50">
        You have some changes that will be discarded.
      </div>
      <button
        onclick={() => {
          newProjectState.reset()
          routingState.view = ""
        }}
        class={cn("rounded-[4px] px-[12px] py-[8px] __red_button mt-[28px]")}
      >
        Yes, leave
      </button>
    </div>
  </div>
{/if}
