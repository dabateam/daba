<script lang="ts">
  import anime from "animejs"
  import type { App } from "../../../../shared/types"
  import PulsingGreenDot from "../assets/PulsingGreenDot.svelte"
  import Start from "../assets/Start.svelte"
  import { clickOutside, cn } from "../utils"
  import Stop from "../assets/Stop.svelte"
  import ThreeDots from "../assets/ThreeDots.svelte"
  import Restart from "../assets/Restart.svelte"
  import Loader from "../assets/Loader.svelte"
  import Copy from "../assets/Copy.svelte"
  import Check from "../assets/Check.svelte"
  import { projectsState } from "../store.svelte"

  let menuRef: HTMLDivElement | null = $state(null)

  let copyClicked = $state(false)

  let menuVisible = $state(false)

  let loading = $state(false)

  let running = $derived.by(() => {
    return (
      projectsState.currentProjectState?.appsStates.find(
        (a) => a.name === app.name,
      )?.status === "running"
    )
  })

  const showMenu = () => {
    menuVisible = true
    if (menuRef && (!menuRef.style.opacity || menuRef.style.opacity === "0")) {
      anime({
        targets: menuRef,
        opacity: 1,
        duration: 75,
        translateX: [0, 10],
        scaleX: [0.9, 1],
        easing: "easeOutBack",
      })
    }
  }

  const hideMenu = () => {
    menuVisible = false
    anime({
      targets: menuRef,
      opacity: 0,
      duration: 75,
      translateX: [10, 7],
      scaleX: [1, 0.95],
      easing: "easeOutQuad",
    })
  }

  const {
    app,
  }: {
    app: App
  } = $props()
</script>

{#snippet menu()}
  <div
    bind:this={menuRef}
    use:clickOutside={(el) => {
      if (el.style.opacity === "1") {
        hideMenu()
      }
    }}
    class={cn(
      "_tooltip will-change-auto opacity-0 absolute origin-top-left overflow-hidden py-[4px] left-full rounded-[6px] -top-[1px]",
      !menuVisible && "pointer-events-none",
    )}
  >
    {#if running}
      <div
        onclick={() => {
          loading = true
          hideMenu()
          window.api.stopApp(app.containerId).then(() => {
            loading = false
            projectsState.refreshProjectsStates()
          })
        }}
        class="whitespace-nowrap rounded-[3px] mx-[4px] text-[10px] h-[26px] hover:bg-white/[0.1] active:bg-white/[0.13] px-[6px] flex items-center pr-[16px]"
      >
        <div class="size-[12px] mr-[6px] flex items-center justify-center">
          <Stop />
        </div>
        Stop
      </div>
      <div
        onclick={() => {
          loading = true
          hideMenu()
          window.api.restartApp(app.containerId).then(() => {
            loading = false
            projectsState.refreshProjectsStates()
          })
        }}
        class="whitespace-nowrap rounded-[3px] mx-[4px] text-[10px] h-[26px] hover:bg-white/[0.1] active:bg-white/[0.13] px-[6px] flex items-center pr-[16px]"
      >
        <div class="size-[12px] mr-[6px] flex items-center justify-center">
          <Restart />
        </div>
        Restart
      </div>
    {:else}
      <div
        onclick={() => {
          loading = true
          hideMenu()
          window.api.startApp(app.containerId).then(() => {
            loading = false
            projectsState.refreshProjectsStates()
          })
        }}
        class="whitespace-nowrap rounded-[3px] mx-[4px] text-[10px] h-[26px] hover:bg-white/[0.1] active:bg-white/[0.13] px-[6px] flex items-center pr-[16px]"
      >
        <div class="size-[12px] mr-[6px] flex items-center justify-center">
          <Start />
        </div>
        Start
      </div>
    {/if}
  </div>
{/snippet}

<div
  class={cn(
    "group relative h-[32px] flex items-center px-[12px] justify-between",
  )}
>
  {@render menu()}
  <div
    class={cn(
      "flex items-center",
      !running && "opacity-50",
      loading && "pointer-events-none opacity-50",
    )}
  >
    <div
      class="h-[14px] w-[14px] flex items-center justify-center mr-[8px] relative overflow-hidden"
    >
      {#if app.tech}
        <img
          src={`images/${app.tech}.png`}
          alt=""
          class="size-full object-contain"
        />
      {:else}
        <div class="size-full rounded-full bg-white/10"></div>
      {/if}
    </div>
    <div class="mr-[8px]">{app.name}</div>
    <div
      onmouseleave={() => {
        copyClicked = false
      }}
      class=" p-[4px] px-[6px] ml-[-6px] flex items-center gap-[2px] group/link"
    >
      <div
        class="text-white/50 hover:text-white/80 active:text-white"
        onclick={() => {
          window.open(`http://localhost:${app.port}`)
        }}
      >
        http://localhost:{app.port}
      </div>
      <div
        onclick={() => {
          navigator.clipboard.writeText(`http://localhost:${app.port}`)
          copyClicked = true
        }}
        class="opacity-0 group-hover/link:opacity-100 flex items-center justify-center size-[20px] rounded-[3px] text-white/30 hover:text-white/50 active:text-white/70"
      >
        {#if copyClicked}
          <Check />
        {:else}
          <Copy />
        {/if}
      </div>
    </div>
  </div>
  <div
    onclick={showMenu}
    class={cn(
      "relative rounded-[4px] hover:bg-white/[0.04] active:bg-white/[0.07] size-[20px] flex items-center justify-center mr-[-4px] text-white/30 active:text-white/50",
      loading && "pointer-events-none",
    )}
  >
    {#if loading}
      <Loader class="size-[10px]" />
    {:else}
      <PulsingGreenDot
        class={cn(
          "absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] group-hover:opacity-0 pointer-events-none",
          (!running || menuVisible) && "opacity-0",
        )}
      />

      <ThreeDots
        class={cn(
          "absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[8px] hidden group-hover:block",
          menuVisible && "block",
        )}
      />
    {/if}
  </div>
</div>
