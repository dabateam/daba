<script lang="ts">
  import DeleteWarning from "./lib/components/DeleteWarning.svelte"
  import DockerWarning from "./lib/components/DockerWarning.svelte"
  import MainNoProject from "./lib/components/MainNoProject.svelte"
  import NewProject from "./lib/components/NewProject/NewProject.svelte"
  import Project from "./lib/components/Project.svelte"
  import Sidemenu from "./lib/components/Sidemenu.svelte"
  import { globalState, projectsState, routingState } from "./lib/store.svelte"

  $effect(() => {
    projectsState.refreshProjectsStates()
  })

  let interval = $state(0)

  const getDockerStatus = async () => {
    const isRunning = await window.api.isDockerRunning()
    if (isRunning) {
      if (!globalState.dockerRunning) {
        window.location.reload()
      }
      globalState.dockerRunning = true
    } else {
      globalState.dockerRunning = false
    }
  }

  $effect(() => {
    interval = window.setInterval(getDockerStatus, 2000)
    return () => clearInterval(interval)
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

  {#if routingState.view.startsWith("new-project")}
    <NewProject />
  {:else if routingState.view === "project"}
    <Project />
  {:else}
    <MainNoProject />
  {/if}
</div>

{#if !globalState.dockerRunning}
  <DockerWarning />
{/if}

{#if projectsState.showDeleteWarning}
  <DeleteWarning />
{/if}
