import type { Project } from "../../../shared/types"

export const getProjectsFromDB = () => {
  let projectsString: string | null = localStorage.getItem("projects")
  if (!projectsString) {
    projectsString = "[]"
    localStorage.setItem("projects", projectsString)
  }

  try {
    return JSON.parse(projectsString) as Project[]
  } catch (e) {
    console.log("error parsing projects from localstorage", e)
    return []
  }
}

export const setProjectsInDB = (projects: Project[]) => {
  localStorage.setItem("projects", JSON.stringify(projects))
}

export const addProjectInDB = (project: Project) => {
  const projects = getProjectsFromDB()
  projects.push(project)
  setProjectsInDB(projects)
}

export const removeProjectInDB = (projectName: string) => {
  let projects = getProjectsFromDB()
  projects = projects.filter((p) => p.name !== projectName)
  setProjectsInDB(projects)
}
