<script lang="ts">
  import { store } from "../../store.svelte"
  import AddApp from "./AddApp.svelte"
  import ChooseApps from "./ChooseApps.svelte"
  import ConfigureApp from "./ConfigureApp.svelte"
  import Footer from "./Footer.svelte"
  import Header from "./Header.svelte"
  import LoadingCreate from "./LoadingCreate.svelte"
  import NewProjectApps from "./NewProjectApps.svelte"
  import PickStarter from "./PickStarter.svelte"
  import Summary from "./Summary.svelte"
</script>

<div class="flex-1 flex flex-col max-h-full relative">
  <Header />
  <div class="flex-1 flex items-center flex-col shrink-0 overflow-auto">
    <NewProjectApps />
    {#if store.step === "loading"}
      <LoadingCreate />
    {:else if store.step === "summary"}
      <Summary />
    {/if}
    <PickStarter />

    {#if store.step === "apps"}
      {#if store.currentApp}
        <ConfigureApp />
      {:else if store.showAddApp}
        <AddApp />
      {:else}
        <ChooseApps />
      {/if}
    {/if}
  </div>
  <Footer />
</div>
