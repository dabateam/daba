import { app, ipcMain } from "electron"
import dockerode from "dockerode"
import fs from "fs-extra"
import path from "path"
import { exec, execSync } from "child_process"
import {
  App,
  AppState,
  ContainerStatus,
  Container,
  Project,
  ProjectState,
} from "../shared/types"
import { TEMPLATES } from "../shared/constants"

function getDockerSocketPath() {
  let socketPath = ""

  try {
    const output = execSync("docker context inspect", { encoding: "utf-8" })
    socketPath = JSON.parse(output)[0].Endpoints.docker.Host.replace(
      "unix://",
      "",
    )
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`)
  }
  return socketPath
}

const docker = new dockerode({
  socketPath: getDockerSocketPath(),
})

// HANDLERS ========================================================

// TOOD: Refactor do-while to a setInterval to check for status change

const stopApp = async (containerId: string) => {
  if (!containerId) throw new Error("containerId is required")
  const container = docker.getContainer(containerId)
  await container.stop()
  let inspectData: dockerode.ContainerInspectInfo
  do {
    inspectData = await container.inspect()
  } while (inspectData.State.Running)

  return
}

const startApp = async (containerId: string) => {
  if (!containerId) throw new Error("containerId is required")
  const container = docker.getContainer(containerId)
  await container.start()

  let inspectData: dockerode.ContainerInspectInfo
  do {
    inspectData = await container.inspect()
  } while (!inspectData.State.Running)

  return
}

const restartApp = async (containerId: string) => {
  if (!containerId) throw new Error("containerId is required")
  const container = docker.getContainer(containerId)
  await container.restart()

  let inspectData: dockerode.ContainerInspectInfo
  do {
    inspectData = await container.inspect()
  } while (!inspectData.State.Running)

  return
}

const createProject = async (
  project: Project,
): Promise<Project | undefined> => {
  if (!project.name) return undefined

  const template = TEMPLATES.find((t) => t.name === project.template)
  if (!template) return undefined

  const projectPath = path.join("/Users/zak/Documents/Projects/", project.name)
  await fs.mkdir(projectPath).catch(console.error)

  await fs
    .copy(path.join(__dirname, "templates", template.path), projectPath)
    .catch(console.error)

  const ports = {}
  template.apps.forEach((app) => {
    const portKey = (app.name + "_port").toUpperCase()
    ports[portKey] = 0
  })

  const command = `docker compose -f ${projectPath}/compose.yml --project-name ${project.name} up -d`

  await new Promise((resolve, reject) =>
    exec(
      command,
      {
        env: {
          ...process.env,
          ...ports,
        },
      },
      (error, _, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`)
          reject(error.message)
          return
        }
        if (stderr) {
          console.error(`Stderr: ${stderr}`)
        }
        resolve(null)
      },
    ),
  )

  const containers: App[] = (await docker.listContainers())
    .filter(
      (container) =>
        container.Labels["com.docker.compose.project"] === project.name,
    )
    .map((el) => ({
      containerId: el.Id,
      name: el.Labels["com.docker.compose.service"],
      tech:
        template.apps.find(
          (app) => app.name === el.Labels["com.docker.compose.service"],
        )?.tech || "",
      port:
        el.Ports.map((port) => port.PublicPort).find(
          (port) => port !== undefined,
        ) || 0,
      status: el.State === "running" ? "running" : "stopped",
    }))

  return { ...project, apps: containers }
}

const getContainersOfProject = async (
  projectName: string,
): Promise<Container[]> => {
  const containers: Container[] = (await docker.listContainers({ all: true }))
    .filter(
      (container) =>
        container.Labels["com.docker.compose.project"] === projectName,
    )
    .map((el) => ({
      containerId: el.Id,
      serviceName: el.Labels["com.docker.compose.service"],
      status: "",
    }))

  for await (const container of containers) {
    const status = await getContainerStatus(container.containerId)
    container.status = status
  }

  return containers
}

const getContainerStatus = async (
  containerId: string,
): Promise<ContainerStatus> => {
  const container = docker.getContainer(containerId)
  const containerData = await container.inspect()
  const status = containerData.State.Status
  if (status === "running") return "running"
  if (status === "exited") return "stopped"
  return ""
}

const getAllProjectsStates = async (projectNames: string[]) => {
  const projectStates: ProjectState[] = []
  for (const projectName of projectNames) {
    const projectState: ProjectState = {
      projectName,
      appsStates: [],
    }
    const containers = await getContainersOfProject(projectName)

    for (const container of containers) {
      const appState: AppState = {
        name: container.serviceName,
        containerId: container.containerId,
        status: await getContainerStatus(container.containerId),
      }
      projectState.appsStates.push(appState)
    }
    projectStates.push(projectState)
  }

  return projectStates
}

const deleteProject = async (projectName: string) => {
  const projectPath = path.join("/Users/zak/Documents/Projects/", projectName)
  const command = `docker compose -f ${projectPath}/compose.yml down -v --remove-orphans`

  await new Promise((resolve, reject) =>
    exec(command, {}, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`)
        reject(error.message)
        return
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`)
        // reject(stderr);
      }
      console.log(`Stdout: ${stdout}`)
      resolve(null)
    }),
  )

  await fs.remove(projectPath).catch(console.error)
  return
}

const stopProject = async (projectName: string) => {
  const projectPath = path.join("/Users/zak/Documents/Projects/", projectName)

  const command = `docker compose -f ${projectPath}/compose.yml stop`

  await new Promise((resolve, reject) =>
    exec(command, {}, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`)
        reject(error.message)
        return
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`)
        // reject(stderr);
      }
      console.log(`Stdout: ${stdout}`)
      resolve(null)
    }),
  )

  let allContainersStopped = false
  do {
    const containers = await getContainersOfProject(projectName)
    // check if all containers are stopped
    if (!containers.some((c) => c.status === "running")) {
      allContainersStopped = true
    }
  } while (!allContainersStopped)

  return
}

const startProject = async (projectName: string) => {
  const projectPath = path.join("/Users/zak/Documents/Projects/", projectName)

  const command = `docker compose -f ${projectPath}/compose.yml --project-name ${projectName} up -d`

  await new Promise((resolve, reject) =>
    exec(command, {}, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`)
        reject(error.message)
        return
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`)
        // reject(stderr);
      }
      console.log(`Stdout: ${stdout}`)
      resolve(null)
    }),
  )

  let allContainersStarted = false
  do {
    const containers = await getContainersOfProject(projectName)
    // check if all containers are started
    if (containers.every((c) => c.status === "running")) {
      allContainersStarted = true
    }
  } while (!allContainersStarted)

  return
}

const restartProject = async (projectName: string) => {
  const projectPath = path.join("/Users/zak/Documents/Projects/", projectName)

  const command = `docker compose -f ${projectPath}/compose.yml --project-name ${projectName} restart -d`

  await new Promise((resolve, reject) =>
    exec(command, {}, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`)
        reject(error.message)
        return
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`)
        // reject(stderr);
      }
      console.log(`Stdout: ${stdout}`)
      resolve(null)
    }),
  )

  let allContainersStarted = false
  do {
    const containers = await getContainersOfProject(projectName)
    // check if all containers are started
    if (containers.every((c) => c.status === "running")) {
      allContainersStarted = true
    }
  } while (!allContainersStarted)

  return
}

const isDockerRunning = async () => {
  try {
    const info = await docker.info()
    return info
  } catch (error) {
    return false
  }
}

// =================================================================

const invokeHandlers = {
  stopApp,
  startApp,
  createProject,
  deleteProject,
  stopProject,
  startProject,
  restartProject,
  restartApp,
  getAllProjectsStates,
  isDockerRunning,
}

Object.keys(invokeHandlers).forEach((key) => {
  ipcMain.handle(key, (_ev, ...args) => invokeHandlers[key](...args))
})

ipcMain.on("get-app-version", (event) => {
  event.returnValue = app.getVersion()
})

export type Handlers = typeof invokeHandlers
