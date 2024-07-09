<script>
  import { ipcRenderer } from "electron"
  import Projects from "../components/Projects.svelte"

  $effect(() => {
    ipcRenderer.on("message", (_, message) => {
      console.log(message)
    })
  })
</script>

<div
  class="border-r w-[270px] bg-[#1F1F1F] border-[#303030] pt-[41px] shrink-0 relative"
>
  <Projects />

  <div
    class="absolute bottom-[20px] w-full text-center text-[10px] opacity-30 pointer-events-none"
  >
    Version: {window.api.getAppVersion()}
  </div>
</div>
