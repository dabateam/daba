<!-- <script lang="ts">
  import Loader from "../assets/Loader.svelte"
  import { cn } from "../utils"
  import { projectsState, routingState } from "../store.svelte"
  import type { Project } from "../../../../shared/types"
  import { TEMPLATES } from "../../../../shared/constants"

  let projectName = $state("")
  let loading = $state(false)

  let inputRef = $state<HTMLInputElement | null>(null)

  const template = TEMPLATES.find((t) => t.name === "mern")

  const reset = () => {
    routingState.view = ""
    projectName = ""
    loading = false
  }

  let alreadyExists = $derived(
    projectsState.projects.some((p) => p.name === projectName),
  )

  const createProject = () => {
    if (template) {
      const project: Project = {
        name: projectName,
        apps: template.apps,
        template: template.name,
      }

      if (!alreadyExists) {
        loading = true
        console.log("creating project")
        window.api.createProject(project).then((project) => {
          if (project) {
            reset()
            projectsState.addProject(project)
            projectsState.currentProject = project
            projectsState.refreshProjectsStates()
            routingState.view = "project"
          }
        })
      }
    }
  }

  const fixName = (name: string) => {
    // replace spaces with dashes, ignore special characters, make lowercase
    return name
      .replace(/\s/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase()
  }

  $effect(() => {
    if (inputRef) {
      inputRef.focus()
    }
  })
</script>

<div class="flex flex-col items-center justify-center pb-[20vh] flex-1">
  {#if loading}
    <div class="flex flex-col items-center gap-[16px]">
      <Loader class="opacity-30" height="20" stroke="0" />
      <div class="text-[11px]">Creating project</div>
    </div>
  {:else}
    <div class="flex flex-col items-center gap-[12px] mb-[20px]">
      <input
        onkeydown={(e) => {
          if (e.key === "Enter") {
            createProject()
          }
        }}
        oninput={(e) => {
          const correctValue = fixName(e.currentTarget.value)
          projectName = correctValue
          // e.currentTarget.value = correctValue
        }}
        bind:this={inputRef}
        class={cn(
          "text-center hover:border-white/15 focus:border-[hsla(208,100%,63%,1)] border rounded-[4px] h-[32px] px-[12px] border-white/10 focus:bg-[#262626] cursor-text placeholder:text-[11px] w-[150px] placeholder:text-white/30 focus:placeholder:text-white/50",
        )}
        placeholder="Project name"
        bind:value={projectName}
      />
      <button
        class={cn(
          "w-[150px] rounded-[4px] px-[12px] py-[8px] __green_button",
          (!projectName || alreadyExists) && "pointer-events-none opacity-60",
        )}
        onclick={createProject}
      >
        Create project
      </button>
      <button
        class="text-white/50 text-[11px] hover:bg-white/[0.03] active:bg-white/[0.05] px-[10px] py-[6px] rounded-[4px]"
        onclick={reset}
      >
        Cancel
      </button>
    </div>
  {/if}
</div> -->

<script lang="ts">
  import { routingState } from "../../store.svelte"
  import Footer from "./Footer.svelte"
  import Header from "./Header.svelte"
  import LoadingCreate from "./LoadingCreate.svelte"
  import Method from "./Method.svelte"
  import PickStarter from "./PickStarter.svelte"
  import Summary from "./Summary.svelte"
</script>

<div class="flex-1 flex flex-col">
  <Header />
  <div class="flex-1 flex items-center pt-[10vh] flex-col">
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
