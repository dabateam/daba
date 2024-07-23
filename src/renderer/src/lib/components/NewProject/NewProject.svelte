<script lang="ts">
  import { newProjectState } from "../../store.svelte"
  import Footer from "./Footer.svelte"
  import Header from "./Header.svelte"
  import LoadingCreate from "./LoadingCreate.svelte"
  // import Method from "./NewProjectFlow.svelte"
  import PickStarter from "./PickStarter.svelte"
  import Summary from "./Summary.svelte"
</script>

<div class="flex-1 flex flex-col">
  <Header />
  <div class="flex-1 flex items-center flex-col">
    <!-- {#if newProjectState.step === "new-project"}
      <Method /> -->
    {#if newProjectState.step === "loading"}
      <LoadingCreate />
    {:else if newProjectState.step === "summary"}
      <Summary />
    {:else if newProjectState.step === "starter"}
      <PickStarter />
    {/if}
  </div>
  <Footer />
</div>
