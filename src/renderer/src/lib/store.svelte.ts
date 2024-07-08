import type { Project, ProjectState } from "../../../shared/types"
import App from "../App.svelte"
import { addProjectInDB, getProjectsFromDB, removeProjectInDB } from "./api"

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

  addProject,
  resetNewProject,
  removeProject,
  addDeleteLoading,
  removeDeleteLoading,
  refreshProjectsStates,
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

type Method = "starter" | "diy" | "ai" | "clone" | ""

const defaultNewProject: Project = {
  name: "",
  template: "",
  apps: [],
}

let newProject = $state<Project>({ ...defaultNewProject })

let method = $state<Method>("")

const nameAlreadyExists = $derived(
  projects.some((p) => p.name === newProject.name),
)

let selectedTemplate = $state("")

const reset = () => {
  newProject = { ...defaultNewProject }
  method = ""
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

  get method() {
    return method
  },
  set method(val) {
    method = val
  },
  get nameAlreadyExists() {
    return nameAlreadyExists
  },
  reset,
}
