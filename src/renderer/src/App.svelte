<script lang="ts">
  import DeleteWarning from "./lib/components/DeleteWarning.svelte"
  import DockerWarning from "./lib/components/DockerWarning.svelte"
  import MainNoProject from "./lib/components/MainNoProject.svelte"
  import NewProjectFlowModal from "./lib/components/NewProject/NewProjectFlowModal.svelte"
  import NewProjectModal from "./lib/components/NewProject/NewProjectModal.svelte"
  // import Project from "./lib/components/Project.svelte"
  import Sandbox from "./lib/components/Sandbox.svelte"
  import Sidemenu from "./lib/components/Sidemenu.svelte"
  import { store } from "./lib/store.svelte"

  $effect(() => {
    store.refreshProjectsStates()
  })

  let interval = $state(0)

  const getDockerStatus = async () => {
    const isRunning = await window.api.isDockerRunning()
    if (isRunning) {
      if (!store.dockerRunning) {
        window.location.reload()
      }
      store.dockerRunning = true
    } else {
      store.dockerRunning = false
    }
  }

  $effect(() => {
    interval = window.setInterval(getDockerStatus, 2000)
    return () => clearInterval(interval)
  })

  $effect(() => {
    window.electron.ipcRenderer.on("message", (_, message) => {
      console.log(message)
    })
  })
</script>

<img
  src="images/traffic-lights.svg"
  alt="traffic lights empty"
  class="fixed top-[12px] left-[11px] z-[1]"
/>
<div
  class="fixed h-[35px] top-0 left-0 w-full [-webkit-app-region:drag] pointer-events-none"
></div>

<div class="flex h-screen w-screen">
  <Sidemenu />
  {#if store.view === "project"}
    <!-- <Project /> -->
    disabling project view for now (fix app vs appstate thing)
  {:else if store.view === "__sandbox"}
    <Sandbox />
  {:else}
    <MainNoProject />
  {/if}
</div>

<NewProjectFlowModal />
<NewProjectModal />
<DockerWarning />
<DeleteWarning />
