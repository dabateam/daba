import { isEqual } from "lodash"
import type { Project, ProjectState } from "../../../shared/types"
import { addProjectInDB, getProjectsFromDB, removeProjectInDB } from "./api"

// types

type View = "project" | "__sandbox" | ""
type Flow = "Starters" | "DIY" | "AI Starter" | "Clone / Import" | ""

// constants

const defaultNewProject: Project = {
  name: "",
  apps: [],
}

// state

class Store {
  // =====================================================
  // PROJECTS STATE ======================================
  // =====================================================

  projects = $state<Project[]>(getProjectsFromDB())
  projectsStates = $state<ProjectState[]>([])
  deleteLoadings = $state<string[]>([])
  currentProject = $state<Project | null>(null)

  refreshProjectsStates = async () => {
    this.projectsStates = await window.api.getAllProjectsStates(
      this.projects.map((p) => p.name),
    )
  }

  currentProjectState = $derived.by(() => {
    const curr = this.currentProject
    if (curr) {
      return this.projectsStates.find((p) => p.projectName === curr.name)
    }
  })

  addDeleteLoading = (projectName: string) => {
    this.deleteLoadings = this.deleteLoadings.filter((d) => d !== projectName)
    this.deleteLoadings.push(projectName)
  }

  removeDeleteLoading = (projectName: string) => {
    this.deleteLoadings = this.deleteLoadings.filter((d) => d !== projectName)
  }

  showDeleteWarning = $state(false)

  deleteCurrentProject = () => {
    if (this.currentProject) {
      const currentProjectName = this.currentProject.name
      this.view = ""
      this.addDeleteLoading(currentProjectName)
      window.api.deleteProject(currentProjectName).then(() => {
        this.removeProject(currentProjectName)
        this.refreshProjectsStates()
      })
    }
  }

  addProject = (project: Project) => {
    this.projects.push(project)
    addProjectInDB(project)
  }

  removeProject = (projectName: string) => {
    this.projects = this.projects.filter((p) => p.name !== projectName)
    removeProjectInDB(projectName)
    this.removeDeleteLoading(projectName)
  }

  // =====================================================
  // NEW PROJECT STATE ===================================
  // =====================================================

  // state
  newProject = $state<Project>({
    name: "",
    apps: [],
  })

  currentApp = $state<string>("")
  show = $state(false)
  showFlowModal = $state(false)
  flow = $state<Flow>("")

  selectedTemplate = $state("")

  showCancelWarning = $state(false)

  step = $state<"apps" | "starter" | "summary" | "loading" | "">("")

  // derived state
  nameAlreadyExists = $derived(
    this.projects.some((p) => p.name === this.newProject.name),
  )

  shouldShowCancelWarning = $derived(
    !isEqual(this.newProject, defaultNewProject),
  )

  // methods

  doesNameAlreadyExist = () => {
    return this.projects.some((p) => p.name === this.newProject.name)
  }

  reset = () => {
    this.newProject = {
      name: "",
      apps: [],
    }
    this.flow = ""
    this.selectedTemplate = ""
    this.showCancelWarning = false
    this.step = ""
    this.show = false
    this.currentApp = ""
  }

  cancelNewProject = () => {
    if (!this.showCancelWarning && this.shouldShowCancelWarning) {
      this.showCancelWarning = true
      return
    }

    this.reset()
    this.view = ""
  }

  // =====================================================
  // ROUTING STATE =======================================
  // =====================================================

  view = $state<View>("")

  // =====================================================
  // GLOBAL STATE ========================================
  // =====================================================

  dockerRunning = $state(true)
}

export const store = new Store()
