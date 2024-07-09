import { contextBridge } from "electron"
import { electronAPI } from "@electron-toolkit/preload"
import type { Handlers } from "../main/handlers"
import type { Project } from "../shared/types"

const api: Handlers = {
  stopApp: (containerId: string) =>
    electronAPI.ipcRenderer.invoke("stopApp", containerId),
  startApp: (containerId: string) =>
    electronAPI.ipcRenderer.invoke("startApp", containerId),
  deleteProject: (projectName: string) =>
    electronAPI.ipcRenderer.invoke("deleteProject", projectName),
  createProject: (project: Project) =>
    electronAPI.ipcRenderer.invoke("createProject", project),
  stopProject: (projectName: string) =>
    electronAPI.ipcRenderer.invoke("stopProject", projectName),
  startProject: (projectName: string) =>
    electronAPI.ipcRenderer.invoke("startProject", projectName),
  restartProject: (projectName: string) =>
    electronAPI.ipcRenderer.invoke("restartProject", projectName),
  restartApp: (containerId: string) =>
    electronAPI.ipcRenderer.invoke("restartApp", containerId),
  getAllProjectsStates: (projectNames: string[]) =>
    electronAPI.ipcRenderer.invoke("getAllProjectsStates", projectNames),
  isDockerRunning: () => electronAPI.ipcRenderer.invoke("isDockerRunning"),
}

const extraApi = {
  getContainerLogs: (containerId: string, callback: (log: string) => void) => {
    electronAPI.ipcRenderer.send("getContainerLogs", containerId)
    electronAPI.ipcRenderer.on(containerId + "_logs", (_, log) => callback(log))
  },
  getAppVersion: () => electronAPI.ipcRenderer.sendSync("get-app-version"),
} as const

export type API = typeof api & typeof extraApi

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI)
    contextBridge.exposeInMainWorld("api", { ...api, ...extraApi })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = { ...api, ...extraApi }
}
