<script lang="ts">
  import Reload from "../assets/Reload.svelte"
  import Stop from "../assets/Stop.svelte"
  import ThreeDots from "../assets/ThreeDots.svelte"
  import Trash from "../assets/Trash.svelte"
  import anime from "animejs"
  import { projectsState } from "../store.svelte"
  import { clickOutside, cn } from "../utils"
  import Start from "../assets/Start.svelte"
  import AppLine from "./AppLine.svelte"
  import Loader from "../assets/Loader.svelte"

  let menuRef: HTMLDivElement | null = $state(null)
  let menuVisible = $state(false)

  let loading = $state(false)

  const showMenu = () => {
    menuVisible = true

    if (menuRef && (!menuRef.style.opacity || menuRef.style.opacity === "0")) {
      anime({
        targets: menuRef,
        opacity: 1,
        duration: 150,
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
</script>

{#if projectsState.currentProject}
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
      {#if projectsState.currentProjectState?.appsStates.some((app) => app.status === "running")}
        <div
          onclick={() => {
            loading = true
            hideMenu()
            window.api
              .stopProject(projectsState.currentProject!.name)
              .then(() => {
                loading = false
                projectsState.refreshProjectsStates()
              })
          }}
          class="rounded-[3px] whitespace-nowrap mx-[4px] text-[10px] h-[26px] hover:bg-white/[0.1] active:bg-white/[0.13] px-[6px] pr-[16px] flex items-center"
        >
          <div class="size-[12px] mr-[8px] flex items-center justify-center">
            <Stop />
          </div>
          Stop all
        </div>
        <div
          onclick={() => {
            loading = true
            hideMenu()
            window.api
              .restartProject(projectsState.currentProject!.name)
              .then(() => {
                loading = false
                projectsState.refreshProjectsStates()
              })
          }}
          class="rounded-[3px] whitespace-nowrap mx-[4px] text-[10px] h-[26px] hover:bg-white/[0.1] active:bg-white/[0.13] px-[6px] pr-[16px] flex items-center"
        >
          <div class="size-[12px] mr-[8px] flex items-center justify-center">
            <Reload class="text-white/50" />
          </div>
          Restart all
        </div>
      {:else}
        <div
          onclick={() => {
            loading = true
            hideMenu()
            window.api
              .startProject(projectsState.currentProject!.name)
              .then(() => {
                loading = false
                projectsState.refreshProjectsStates()
              })
          }}
          class="rounded-[3px] whitespace-nowrap mx-[4px] text-[10px] h-[26px] hover:bg-white/[0.1] active:bg-white/[0.13] px-[6px] pr-[16px] flex items-center"
        >
          <div class="size-[12px] mr-[8px] flex items-center justify-center">
            <Start />
          </div>
          Start all
        </div>
      {/if}

      <div
        onclick={() => {
          hideMenu()
          projectsState.showDeleteWarning = true
        }}
        class="rounded-[3px] whitespace-nowrap mx-[4px] text-[10px] h-[26px] hover:bg-white/[0.1] active:bg-white/[0.13] px-[6px] pr-[16px] flex items-center"
      >
        <div class="size-[12px] mr-[8px] flex items-center justify-center">
          <Trash class="text-white/50" />
        </div>
        Delete
      </div>
    </div>
  {/snippet}

  <div class="flex flex-col items-center justify-center pb-[20vh] flex-1">
    <div class={cn("w-[270px]", loading && "pointer-events-none opacity-50")}>
      <div class="relative flex items-center justify-between mb-[28px]">
        {@render menu()}

        <div>
          <div class="text-[10px] opacity-50 mb-[8px]">Project</div>
          <div class="text-[13px]">{projectsState.currentProject.name}</div>
        </div>
        <div
          onclick={showMenu}
          class="size-[24px] mr-[6px] rounded-[4px] hover:bg-white/[0.04] active:bg-white/[0.07] flex items-center justify-center text-white/50"
        >
          {#if loading}
            <Loader class="size-[12px] text-white/70" />
          {:else}
            <ThreeDots class="w-full h-[4px]" />
          {/if}
        </div>
      </div>
      <div class="rounded-[6px] ring-[1px] ring-[#3A3A3A] text-[11px] relative">
        <!-- <div
        class="h-[32px] flex items-center pl-[12px] pr-[6px] text-[#40AFFF] text-[10px] justify-between"
      >
        <div class="flex items-center">
          <div
            class="h-[14px] w-[14px] flex items-center justify-center mr-[8px]"
          >
            <Computer class="object-contain size-[10px] " />
          </div>
          Local
        </div>
        <div
          onclick={showMenu}
          class="w-[24px] h-[20px] rounded-[4px] hover:bg-white/[0.04] active:bg-white/[0.07] flex items-center justify-center text-white/30 hover:text-white/50"
        >
          <ThreeDots class="w-[8px]" />
        </div>
      </div> -->
        <div class="rounded-[6px] ring-[1px] ring-[#3A3A3A] py-[6px]">
          {#each projectsState.currentProject.apps as app}
            <AppLine {app} />
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}
