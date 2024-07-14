<script>
  import { projectsState } from "../store.svelte"

  import { cn } from "../utils"

  let value = $state("")
</script>

<div
  onclick={(e) => {
    if (e.target === e.currentTarget) projectsState.showDeleteWarning = false
  }}
  class="fixed top-0 left-0 size-full bg-black/30 flex justify-center items-center"
>
  <div
    class="text-white text-center bg-[#242424] rounded-[10px] p-[40px] px-[50px] pb-[28px] shadow-2xl flex items-center justify-center flex-col border border-white/[0.05]"
  >
    <div class="text-[13px] mb-[16px]">
      Are you sure you want to delete this project ?
    </div>
    <div class="text-[11px] opacity-50">
      Enter the project name below to confirm.
    </div>
    <input
      type="text"
      bind:value
      placeholder={projectsState.currentProject?.name}
      class=" text-center w-[250px] h-[32px] px-[12px] border-white/10 focus:border-[hsla(208,100%,63%,1)] border rounded-[4px] text-[11px] placeholder:text-white/30 my-[28px] hover:border-white/15 cursor-text"
    />

    <button
      onclick={() => {
        if (value === projectsState.currentProject?.name) {
          projectsState.showDeleteWarning = false
          projectsState.deleteCurrentProject()
        }
      }}
      class={cn(
        "rounded-[4px] px-[12px] py-[8px] __red_button",
        value !== projectsState.currentProject?.name &&
          "pointer-events-none opacity-70 text-white/70",
      )}>Delete this project</button
    >
  </div>
</div>
