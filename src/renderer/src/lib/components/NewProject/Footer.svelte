<script lang="ts">
  import CaretDown from "../../assets/CaretDown.svelte"
  import {
    newProjectState,
    projectsState,
    routingState,
  } from "../../store.svelte"
  import { TEMPLATES } from "../../../../../shared/constants"
  import { cn } from "../../utils"
  import { NEW_PROJECT_APPS_WIDTH } from "../../constants"

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

      newProjectState.step = "loading"
      console.log("creating project")

      const newProject = $state.snapshot(newProjectState.newProject)
      window.api.createProject(newProject).then((project) => {
        if (project) {
          projectsState.addProject(project)
          projectsState.currentProject = project
          projectsState.refreshProjectsStates()
          console.log("project created", project)
          newProjectState.reset()
          routingState.view = "project"
        }
      })
    }
  }

  const generateAndAssignProjectName = (templateName: string) => {
    let counter = 1
    newProjectState.newProject.name = templateName
    while (newProjectState.doesNameAlreadyExist()) {
      counter++
      newProjectState.newProject.name = `${templateName}-${counter}`
    }
  }
</script>

<div
  class="h-[56px] shrink-0 flex relative items-center justify-center px-[16px] border-t border-white/5 gap-[8px] text-[11px]"
  style:margin-left={newProjectState.flow === "DIY"
    ? NEW_PROJECT_APPS_WIDTH + "px"
    : "unset"}
>
  {#if newProjectState.step === "starter"}
    {#if newProjectState.selectedTemplate}
      <button
        onclick={() => {
          if (
            newProjectState.selectedTemplate !==
            newProjectState.newProject.template
          ) {
            const template = TEMPLATES.find(
              (t) => t.name === newProjectState.selectedTemplate,
            )

            if (!template) return

            newProjectState.newProject.apps = template.apps.map((a) => ({
              ...a,
              containerId: "",
              port: 0,
            }))

            generateAndAssignProjectName(template.name)
          }
          newProjectState.newProject.template = newProjectState.selectedTemplate
          newProjectState.step = "summary"

          // todo: handle if change template -> reset apps
        }}
        class={cn(
          "rounded-[4px] px-[12px] py-[8px] __green_button_transparent text-[#5ae73e] flex items-center gap-[8px] ",
        )}
      >
        Summary
        <CaretDown class="opacity-50 w-[8px] -rotate-90" />
      </button>
    {:else}
      <button
        class="__green_button_transparent flex items-center gap-[8px] rounded-[4px] px-[12px] py-[8px] text-[#5ae73e]/60 pointer-events-none"
      >
        Pick a starter
      </button>
    {/if}
  {:else if newProjectState.step === "summary"}
    <button
      onclick={() => {
        newProjectState.step = "starter"
      }}
      class="absolute left-[16px] top-[14.5px] flex items-center gap-[8px] text-white/40 rounded-[4px] px-[12px] py-[8px] hover:bg-white/[0.02] active:bg-white/[0.03]"
    >
      <CaretDown class="opacity-50 w-[8px] rotate-90" />
      Pick a starter
    </button>
    <button
      onclick={createProject}
      class={cn(
        "__green_button rounded-[4px] px-[12px] py-[8px]",
        !canSubmit && "pointer-events-none opacity-70 text-white/70",
      )}
    >
      Install and run
    </button>
  {:else if newProjectState.step === "loading"}
    <div class="text-white/40 text-[10px]">
      This process might take a few minutes, please don't close this window.
    </div>
  {:else if newProjectState.step === "apps"}
    <div class="text-white/40 text-[10px]">hi there</div>
  {/if}
</div>
