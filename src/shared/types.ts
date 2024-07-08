export type Project = {
  name: string
  template: string
  apps: App[]
}

export type ProjectState = {
  projectName: string
  appsStates: AppState[]
}

export type AppState = {
  name: string
  containerId: string
  status: ContainerStatus
}

export type App = {
  name: string
  containerId: string
  tech: string
  port: number
}

export type TemplateApp = {
  name: string
  tech: string
}

export type Template = {
  name: string
  image: string
  description: string
  path: string
  apps: TemplateApp[]
}

export type Container = {
  containerId: string
  serviceName: string
  status: ContainerStatus
}

export type ContainerStatus = "running" | "stopped" | ""
