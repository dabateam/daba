<script>
  import MainNoProject from "./lib/components/MainNoProject.svelte"
  import NewProject from "./lib/components/NewProject/NewProject.svelte"
  import Project from "./lib/components/Project.svelte"
  import Sidemenu from "./lib/components/Sidemenu.svelte"
  import { projectsState, routingState } from "./lib/store.svelte"

  $effect(() => {
    projectsState.refreshProjectsStates()
  })
</script>

<img
  src="images/traffic-lights.svg"
  alt="traffic lights empty"
  class="fixed top-[12px] left-[11px]"
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
