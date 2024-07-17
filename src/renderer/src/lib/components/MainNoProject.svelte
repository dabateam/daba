<script lang="ts">
  import { routingState } from "../store.svelte"

  let inputRef = $state<HTMLInputElement | null>(null)

  const showSandbox = false

  $effect(() => {
    if (inputRef) {
      inputRef.focus()
    }
  })
</script>

<div class="flex flex-col items-center justify-center pb-[20vh] flex-1">
  <button
    class="rounded-[4px] mb-[12px] px-[12px] py-[8px] __green_button"
    onclick={() => {
      routingState.view = "new-project"
    }}
  >
    Start a new project
  </button>

  {#if showSandbox}
    <button
      onclick={() => {
        routingState.view = "__sandbox"
      }}
    >
      Sandbox
    </button>
  {/if}
  <!-- 
  <button
    class="text-center rounded-[4px] px-[14px] w-[150px] py-[10px] bg-[#333333] __gray_button"
    >__TEMP__</button
  > -->
</div>
