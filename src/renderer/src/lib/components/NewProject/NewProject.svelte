<script lang="ts">
  import { routingState } from "../../store.svelte"
  import Footer from "./Footer.svelte"
  import Header from "./Header.svelte"
  import LoadingCreate from "./LoadingCreate.svelte"
  import Method from "./NewProjectFlow.svelte"
  import PickStarter from "./PickStarter.svelte"
  import Summary from "./Summary.svelte"
</script>

<div class="flex-1 flex flex-col">
  <Header />
  <div class="flex-1 flex items-center flex-col">
    {#if routingState.view === "new-project"}
      <Method />
    {:else if routingState.view === "new-project.loading-create"}
      <LoadingCreate />
    {:else if routingState.view === "new-project.summary"}
      <Summary />
    {:else if routingState.view === "new-project.pick-starter"}
      <PickStarter />
    {/if}
  </div>
  <Footer />
</div>
