<script lang="ts">
  import CaretDown from "../../assets/CaretDown.svelte"
  import { store } from "../../store.svelte"
  import { TEMPLATES } from "../../../../../shared/constants"
  import { cn } from "../../utils"
  import { NEW_PROJECT_APPS_WIDTH } from "../../constants"

  const canSubmit = $derived(store.newProject.name && !store.nameAlreadyExists)

  const createProject = () => {
    if (!canSubmit) return

    if (store.flow === "Starters") {
      const template = TEMPLATES.find(
        (t) => t.name === store.newProject.template,
      )

      if (template) {
        store.newProject.apps = template.apps.map((app) => ({
          ...app,
          port: 0,
          containerId: "",
        }))

        store.step = "loading"

        const newProject = $state.snapshot(store.newProject)
        window.api
          .createProject(newProject)
          .then((project) => {
            if (project) {
              store.addProject(project)
              store.currentProject = project
              store.refreshProjectsStates()
              console.log("project created", project)
              store.reset()
              store.view = "project"
            }
          })
          .catch(console.error)
      }
    } else if (store.flow === "DIY") {
      console.log("project to create: ", $state.snapshot(store.newProject))
      store.step = "loading"

      window.api
        .createProjectDIY($state.snapshot(store.newProject))
        .then((project) => {
          if (project) {
            store.addProject(project)
            store.currentProject = project
            store.refreshProjectsStates()
            console.log("project created", project)
            store.reset()
            store.view = "project"
          }
        })
        .catch(console.error)
    }
  }

  const generateAndAssignProjectName = (templateName: string) => {
    let counter = 1
    let n = templateName
    while (templateName && store.doesNameAlreadyExist(n)) {
      counter++
      n = `${templateName}-${counter}`
    }
    store.newProject.name = n
  }
</script>

<div
  class="h-[56px] shrink-0 flex relative items-center justify-center px-[16px] border-t border-white/5 gap-[8px] text-[11px]"
  style:margin-left={store.flow === "DIY"
    ? NEW_PROJECT_APPS_WIDTH + "px"
    : "unset"}
>
  {#if store.step === "starter"}
    {#if store.selectedTemplate}
      <button
        onclick={() => {
          if (store.selectedTemplate !== store.newProject.template) {
            const template = TEMPLATES.find(
              (t) => t.name === store.selectedTemplate,
            )

            if (!template) return

            store.newProject.apps = template.apps.map((a) => ({
              ...a,
              containerId: "",
              port: 0,
            }))

            generateAndAssignProjectName(template.name)
          }
          store.newProject.template = store.selectedTemplate
          store.step = "summary"

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
  {:else if store.step === "summary"}
    <button
      onclick={() => {
        if (store.flow === "Starters") store.step = "starter"
        else if (store.flow === "DIY") {
          store.step = "apps"
          store.currentApp = store.newProject.apps[0].name
        }
      }}
      class="absolute left-[16px] top-[14.5px] flex items-center gap-[8px] text-white/40 rounded-[4px] px-[12px] py-[8px] hover:bg-white/[0.02] active:bg-white/[0.03]"
    >
      <CaretDown class="opacity-50 w-[8px] rotate-90" />
      {store.flow === "Starters" ? "Pick a starter" : "Choose apps"}
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
  {:else if store.step === "loading"}
    <div class="text-white/40 text-[10px]">
      This process might take a few minutes, please don't close this window.
    </div>
  {:else if store.step === "apps"}
    <div class="text-white/40 text-[10px]">
      {#if store.newProject.apps.length === 0}
        <button
          class="__green_button_transparent flex items-center gap-[8px] rounded-[4px] px-[12px] py-[8px] text-[#5ae73e]/60 pointer-events-none"
        >
          Choose your apps
        </button>
      {:else}
        <button
          onclick={() => {
            store.currentApp = ""
            store.showAddApp = false
            store.step = "summary"
          }}
          class="__green_button_transparent flex items-center gap-[8px] rounded-[4px] px-[12px] py-[8px] text-[#5ae73e]"
        >
          Summary
          <CaretDown class="opacity-50 w-[8px] -rotate-90" />
        </button>
      {/if}
    </div>
  {/if}
</div>
