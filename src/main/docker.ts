import { execSync } from "child_process"
import Dockerode from "dockerode"

export let docker: Dockerode | null = null

const isDockerInstalled = async () => {
  try {
    await execSync("docker --version", { encoding: "utf-8" })
    return true
  } catch (error) {
    return false
  }
}

const installDocker = async () => {
  await execSync("brew install docker", { encoding: "utf-8" })
}

const isDockerRunning = async () => {
  const isRunning = await execSync("docker ps", { encoding: "utf-8" })
  return !!isRunning
}

const startDocker = async () => {
  await execSync("dockerd &", { encoding: "utf-8" })
}

const getDockerSocketPath = async () => {
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

const getDocker = async () => {
  const dockerInstalled = await isDockerInstalled()
  if (!dockerInstalled) await installDocker()

  const dockerRunning = await isDockerRunning()

  if (!dockerRunning) await startDocker()

  const path = await getDockerSocketPath()

  return new Dockerode({
    socketPath: path,
  })
}

export const initDocker = async () => {
  docker = await getDocker()
}
