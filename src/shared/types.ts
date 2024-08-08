export type Project = {
  name: string
  template?: string
  apps: App[]
  // location: string
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

export type Template = {
  name: string
  image: string
  description: string
  path: string
  apps: App[]
}

export type Container = {
  containerId: string
  serviceName: string
  status: ContainerStatus
}

export type ContainerStatus = "running" | "stopped" | ""

export type ENVVAR = {
  key: string
  required?: boolean
  defaultValue?: string
  description?: string
  value: string
}

export type Technology = {
  defaultLabel?: string
  defaultIcon?: string
  name: string
  envVars?: ENVVAR[]
  tags?: string[]
  repo?: string
  image?: string
  dabaRepoFolder?: string
}

export type App = {
  name: string
  icon?: string
  technology: Technology
  envVars?: ENVVAR[]
  ports?: [number, number]
}
