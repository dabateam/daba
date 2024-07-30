import { isEqual } from "lodash"
import type { Project, ProjectState } from "../../../shared/types"
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

// routingState =======================================

type View = "project" | "__sandbox" | ""

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
  apps: [],
}

let currentApp = $state<string>("")

let show = $state(false)

let showFlowModal = $state(false)

let newProject = $state<Project>({
  name: "",
  apps: [],
})

let flow = $state<Flow>("")

const nameAlreadyExists = $derived(
  projects.some((p) => p.name === newProject.name),
)

const doesNameAlreadyExist = () => {
  return projects.some((p) => p.name === newProject.name)
}

let selectedTemplate = $state("")

let showCancelWarning = $state(false)

let step = $state<"apps" | "starter" | "summary" | "loading" | "">("")

const reset = () => {
  newProject = {
    name: "",
    apps: [],
  }
  flow = ""
  selectedTemplate = ""
  showCancelWarning = false
  step = ""
  show = false
}

const cancelNewProject = () => {
  if (!showCancelWarning && shouldShowCancelWarning) {
    showCancelWarning = true
    return
  }

  newProjectState.reset()
  routingState.view = ""
}

const shouldShowCancelWarning = $derived(
  !isEqual(newProject, defaultNewProject),
)

export const newProjectState = {
  get newProject() {
    return newProject
  },
  set newProject(val) {
    newProject = val
  },

  get showFlowModal() {
    return showFlowModal
  },
  set showFlowModal(val) {
    showFlowModal = val
  },

  get selectedTemplate() {
    return selectedTemplate
  },

  set selectedTemplate(val) {
    selectedTemplate = val
  },

  get currentApp() {
    return currentApp
  },

  set currentApp(val) {
    currentApp = val
  },

  get flow() {
    return flow
  },
  set flow(val) {
    flow = val
  },

  get step() {
    return step
  },
  set step(val) {
    step = val
  },

  get show() {
    return show
  },
  set show(val) {
    show = val
  },

  get nameAlreadyExists() {
    return nameAlreadyExists
  },

  get showCancelWarning() {
    return showCancelWarning
  },
  set showCancelWarning(val) {
    showCancelWarning = val
  },

  get shouldShowCancelWarning() {
    return shouldShowCancelWarning
  },

  doesNameAlreadyExist,
  reset,
  cancelNewProject,
}
