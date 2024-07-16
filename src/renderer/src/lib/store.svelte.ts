import type { Project, ProjectState } from "../../../shared/types"
import App from "../App.svelte"
import { addProjectInDB, getProjectsFromDB, removeProjectInDB } from "./api"

// globalState ========================================

let dockerRunning = $state(true)

export const globalState = {
  get dockerRunning() {
    return dockerRunning
  },
  set dockerRunning(val) {
    dockerRunning = val
  },
}

// projectsState ======================================

let projects = $state<Project[]>(getProjectsFromDB())

let projectsStates = $state<ProjectState[]>([])

const refreshProjectsStates = async () => {
  projectsStates = await window.api.getAllProjectsStates(
    projects.map((p) => p.name),
  )
}

const currentProjectState = $derived.by(() => {
  const curr = currentProject
  if (curr) {
    return projectsStates.find((p) => p.projectName === curr.name)
  }
})

let deleteLoadings = $state<string[]>([])

const addDeleteLoading = (projectName: string) => {
  deleteLoadings = deleteLoadings.filter((d) => d !== projectName)
  deleteLoadings.push(projectName)
}

const removeDeleteLoading = (projectName: string) => {
  deleteLoadings = deleteLoadings.filter((d) => d !== projectName)
}

let showDeleteWarning = $state(false)

const deleteCurrentProject = () => {
  if (currentProject) {
    const currentProjectName = currentProject.name
    view = ""
    addDeleteLoading(currentProjectName)
    window.api.deleteProject(currentProjectName).then(() => {
      removeProject(currentProjectName)
      refreshProjectsStates()
    })
  }
}

const resetNewProject = () => {
  newProject = { ...defaultNewProject }
}

let currentProject = $state<Project | null>(null)

const addProject = (project: Project) => {
  projects.push(project)
  addProjectInDB(project)
}

const removeProject = (projectName: string) => {
  projects = projects.filter((p) => p.name !== projectName)
  removeProjectInDB(projectName)
  removeDeleteLoading(projectName)
}

export const projectsState = {
  get projects() {
    return projects
  },

  get projectsStates() {
    return projectsStates
  },

  get currentProjectState() {
    return currentProjectState
  },

  get currentProject() {
    return currentProject
  },
  set currentProject(val) {
    currentProject = val
  },

  get deleteLoadings() {
    return deleteLoadings
  },

  get showDeleteWarning() {
    return showDeleteWarning
  },
  set showDeleteWarning(val) {
    showDeleteWarning = val
  },

  addProject,
  resetNewProject,
  removeProject,
  addDeleteLoading,
  removeDeleteLoading,
  refreshProjectsStates,
  deleteCurrentProject,
}

// currentAppState ====================================

let currentApp = $state<App | null>(null)

export const currentAppState = $state({
  get currentApp() {
    return currentApp
  },
  set currentApp(val) {
    currentApp = val
  },
})

// routingState =======================================

type View =
  | "new-project"
  | "new-project.loading-create"
  | "new-project.summary"
  | "new-project.pick-starter"
  | "project"
  | "__sandbox"
  | ""

let view = $state<View>("")

export const routingState = {
  get view() {
    return view
  },
  set view(val) {
    if (val !== "project") currentProject = null
    view = val
  },
}

// newProjectState ====================================

type Flow = "Starters" | "DIY" | "AI Starter" | "Clone / Import" | ""

const defaultNewProject: Project = {
  name: "",
  template: "",
  apps: [],
}

let newProject = $state<Project>({ ...defaultNewProject })

let flow = $state<Flow>("")
let selectedFlow = $state<Flow>("")

const nameAlreadyExists = $derived(
  projects.some((p) => p.name === newProject.name),
)

const doesNameAlreadyExist = () => {
  return projects.some((p) => p.name === newProject.name)
}

let selectedTemplate = $state("")

const reset = () => {
  newProject = { ...defaultNewProject }
  flow = ""
  selectedFlow = ""
  selectedTemplate = ""
}

export const newProjectState = {
  get newProject() {
    return newProject
  },
  set newProject(val) {
    newProject = val
  },

  get selectedTemplate() {
    return selectedTemplate
  },

  set selectedTemplate(val) {
    selectedTemplate = val
  },

  get flow() {
    return flow
  },
  set flow(val) {
    flow = val
  },

  get selectedFlow() {
    return selectedFlow
  },
  set selectedFlow(val) {
    selectedFlow = val
  },

  get nameAlreadyExists() {
    return nameAlreadyExists
  },

  doesNameAlreadyExist,
  reset,
}
