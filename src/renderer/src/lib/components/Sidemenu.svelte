<script>
  import Home from "../assets/Home.svelte"
  import Projects from "../components/Projects.svelte"
  import { routingState } from "../store.svelte"
  import { cn } from "../utils"
</script>

<div
  class="border-r w-[270px] bg-[#1F1F1F] border-[#303030] pt-[60px] shrink-0 relative"
>
  <div class="border-b border-[#303030] flex flex-col pb-[16px]">
    <button
      onclick={() => {
        routingState.view = ""
      }}
      class={cn(
        "flex items-center gap-[8px] h-[32px] px-[12px] mx-[12px] hover:bg-white/[0.02] active:bg-white/[0.03]  rounded-[6px]",

        routingState.view === "" &&
          "bg-[#40AFFF]/10 hover:bg-[#40AFFF]/10 active:bg-[#40AFFF]/10 text-[#40AFFF]",
      )}
    >
      <Home
        class={cn(
          "opacity-30",
          routingState.view === "" && "opacity-50 text-[#40AFFF]",
        )}
      />
      Home
    </button>
  </div>
  <Projects />
  <div
    class="absolute bottom-[20px] w-full text-center text-[10px] opacity-30 pointer-events-none"
  >
    Version: {window.api.getAppVersion()}
  </div>
</div>
