<script>
  import Loader from "../../assets/Loader.svelte"

  let log = $state("")

  $effect(() => {
    window.electron.ipcRenderer.on("docker-compose-log", (_, _log) => {
      if (_log) log = _log
    })
  })
</script>

<div
  class="flex flex-col items-center gap-[16px] flex-1 justify-center pb-[20vh]"
>
  <Loader class="opacity-30" height="24" stroke="0" />
  <div class="text-[11px] h-[12px]">{log}</div>
</div>
