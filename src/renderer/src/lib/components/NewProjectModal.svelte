<script lang="ts">
  import { newProjectState } from "../store.svelte"
  import { cn } from "../utils"
  import NewProject from "./NewProject/NewProject.svelte"

  $effect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (newProjectState.showCancelWarning) {
          newProjectState.showCancelWarning = false
          return
        }

        newProjectState.cancelNewProject()
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  })
</script>

{#if newProjectState.show}
  <div
    onclick={(e) => {
      if (e.target === e.currentTarget) {
        newProjectState.cancelNewProject()
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
          onclick={newProjectState.cancelNewProject}
          class={cn("rounded-[4px] px-[12px] py-[8px] __red_button mt-[28px]")}
        >
          Yes, leave
        </button>
      </div>
    </div>
  {/if}
{/if}
