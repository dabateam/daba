<script>
  import Loader from "../assets/Loader.svelte"
  import { store } from "../store.svelte"
</script>

{#if !store.dockerRunning}
  <div
    class="fixed top-0 left-0 size-full bg-black/30 flex justify-center items-center"
  >
    <div
      class="text-white text-center bg-[#242424] rounded-[10px] w-[400px] h-[250px] shadow-2xl flex items-center justify-center flex-col border border-white/[0.05]"
    >
      <Loader class="h-[24px] opacity-30 mb-[20px] mt-[-20px]" stroke="0" />
      <div class="text-[13px] mb-[16px]">Docker is not running</div>
      <div class="text-[11px] opacity-50">
        Please start Docker before using Daba.
      </div>
    </div>
  </div>
{/if}
