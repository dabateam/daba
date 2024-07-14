<script>
  import CaretDown from "../../assets/CaretDown.svelte"
  import { routingState } from "../../store.svelte"
</script>

<!-- <script lang="ts">
  import { TEMPLATES } from "../../../../../shared/constants"
  // import type { Project } from "../../../../../shared/types"
  import {
    newProjectState,
    projectsState,
    routingState,
  } from "../../store.svelte"
  import { cn } from "../../utils"

  // let inputRef = $state<HTMLInputElement | null>(null)

  // const reset = () => {
  //   routingState.view = ""
  //   projectName = ""
  //   loading = false
  // }

  const canSubmit = $derived(
    newProjectState.newProject.name && !newProjectState.nameAlreadyExists,
  )

  const createProject = () => {
    if (!canSubmit) return

    const template = TEMPLATES.find(
      (t) => t.name === newProjectState.newProject.template,
    )

    if (template) {
      newProjectState.newProject.apps = template.apps.map((app) => ({
        ...app,
        port: 0,
        containerId: "",
      }))

      routingState.view = "new-project.loading-create"
      console.log("creating project")

      const newProject = $state.snapshot(newProjectState.newProject)
      window.api.createProject(newProject).then((project) => {
        if (project) {
          newProjectState.reset()
          projectsState.addProject(project)
          projectsState.currentProject = project
          projectsState.refreshProjectsStates()
          routingState.view = "project"
        }
      })
    }
  }
</script>

{#if routingState.view !== "new-project.loading-create"}
  <div
    class="h-[60px] flex items-center justify-center border-t border-white/5 relative"
  >
    {#if routingState.view === "new-project.summary"}
      <button
        class="absolute left-0 top-[50%] -translate-y-[50%] ml-[16px] text-white/50 rounded-[4px] px-[12px] py-[8px] hover:bg-white/[0.02] active:bg-white/[0.03]"
        onclick={() => {
          newProjectState.reset()
          routingState.view = ""
        }}
      >
        Cancel
      </button>
      <button
        onclick={createProject}
        class={cn(
          "rounded-[4px] px-[12px] py-[8px] __green_button",
          !canSubmit && "pointer-events-none opacity-70 text-white/60",
        )}
      >
        Create project
      </button>
    {:else if routingState.view === "new-project"}
      <button
        class="text-white/50 rounded-[4px] px-[12px] py-[8px] hover:bg-white/[0.02] active:bg-white/[0.03]"
        onclick={() => {
          newProjectState.reset()
          routingState.view = ""
        }}
      >
        Cancel
      </button>
    {:else if routingState.view === "new-project.pick-starter"}
      {#if newProjectState.selectedTemplate}
        <button
          class="absolute left-0 top-[50%] -translate-y-[50%] ml-[16px] text-white/50 rounded-[4px] px-[12px] py-[8px] hover:bg-white/[0.02] active:bg-white/[0.03]"
          onclick={() => {
            if (newProjectState.newProject.template) {
              routingState.view = "new-project.summary"
            } else {
              newProjectState.reset()
              routingState.view = ""
            }
          }}
        >
          {!newProjectState.newProject.template ? "Cancel" : "Go back"}
        </button>
        <button
          onclick={() => {
            if (
              newProjectState.selectedTemplate !==
              newProjectState.newProject.template
            ) {
              newProjectState.newProject.apps = (
                TEMPLATES.find(
                  (t) => t.name === newProjectState.selectedTemplate,
                )?.apps || []
              ).map((a) => ({
                ...a,
                containerId: "",
                port: 0,
              }))
            }
            newProjectState.newProject.template =
              newProjectState.selectedTemplate
            routingState.view = "new-project.summary"

            // todo: handle if change template -> reset apps
          }}
          class={cn(
            "rounded-[4px] px-[12px] py-[8px] __green_button_transparent",
          )}
        >
          Pick {newProjectState.selectedTemplate}
        </button>
      {:else}
        <button
          class="text-white/50 rounded-[4px] px-[12px] py-[8px] hover:bg-white/[0.02] active:bg-white/[0.03]"
          onclick={() => {
            if (newProjectState.newProject.template) {
              routingState.view = "new-project.summary"
            } else {
              newProjectState.reset()
              routingState.view = ""
            }
          }}
        >
          {newProjectState.newProject.template ? "Go back" : "Cancel"}
        </button>
      {/if}
    {/if}
  </div>
{/if} -->

<div
  class="h-[56px] flex relative items-center justify-center px-[16px] border-t border-white/5 gap-[8px] text-[11px]"
>
  {#if routingState.view === "new-project"}
    <button
      class=" text-white/40 rounded-[4px] px-[12px] py-[8px] hover:bg-white/[0.02] active:bg-white/[0.03]"
    >
      Cancel
    </button>
  {:else if routingState.view === "new-project.pick-starter"}
    <button
      class="absolute left-[16px] top-[14.5px] flex items-center gap-[8px] text-white/40 rounded-[4px] px-[12px] py-[8px] hover:bg-white/[0.02] active:bg-white/[0.03]"
    >
      <CaretDown class="opacity-50 w-[8px] rotate-90" />
      New project flow
    </button>
    <button
      class="__green_button_transparent flex items-center gap-[8px] rounded-[4px] px-[12px] py-[8px]"
    >
      Project summary
      <CaretDown class="opacity-50 w-[8px] -rotate-90" />
    </button>
  {:else if routingState.view === "new-project.summary"}
    <button
      class="absolute left-[16px] top-[14.5px] flex items-center gap-[8px] text-white/40 rounded-[4px] px-[12px] py-[8px] hover:bg-white/[0.02] active:bg-white/[0.03]"
    >
      <CaretDown class="opacity-50 w-[8px] rotate-90" />
      Choose a starter
    </button>
    <button class="__green_button rounded-[4px] px-[12px] py-[8px]">
      Install and run
    </button>
  {:else}
    <div class="text-white/40 text-[11px]">
      This process might take a few minutes, please don't close this window.
    </div>
  {/if}
</div>
