import path from "node:path"
import os from "node:os"
import type { AppState, Project } from "../shared/types"
import fs from "fs-extra"
import { downloadFolderFromRepo } from "./downloadFolderFromRepo"
import yaml from "js-yaml"
import { mainWindow } from "."
import { execa } from "execa"
import { docker } from "./handlers"

export const createProjectDIY = async (project: Project) => {
  // create project folder
  const projectPath = path.join(
    os.homedir(),
    "Documents",
    "Projects",
    project.name,
  )

  await fs.mkdir(projectPath, { recursive: true }).catch((err) => {
    console.error("❌ error creating project path", err)
  })

  // for each app, if it has code, get the code and copy it to the project folder

  await Promise.all(
    project.apps.map(async (app) => {
      if (app.technology.repo && app.technology.pathInRepo) {
        await downloadFolderFromRepo(
          app.technology.repo,
          app.technology.pathInRepo,
          path.join(projectPath, app.name),
        )
      }
      // todo: handle if the app is literally just a repo
    }),
  )

  // generate compose.yml

  const composeYaml = await generateCompose(projectPath, project)

  await fs.writeFile(path.join(projectPath, "compose.yml"), composeYaml)

  // run compose up

  // todo: careful of docker-compose.yml vs compose.yml vs ...

  const p = execa`docker compose -f ${projectPath}/compose.yml --project-name ${project.name} up -d`

  p.stderr.on("data", (data) => {
    data
      .toString()
      .split("\n")
      .forEach((line) => {
        mainWindow?.webContents.send("docker-compose-log", line)
      })
  })

  p.stdout.on("data", (data) => {
    data
      .toString()
      .split("\n")
      .forEach((line) => {
        mainWindow?.webContents.send("docker-compose-log", line)
      })
  })

  await p

  const containers: AppState[] = (await docker.listContainers())
    .filter(
      (container) =>
        container.Labels["com.docker.compose.project"] === project.name,
    )
    .map((el) => ({
      containerId: el.Id,
      name: el.Labels["com.docker.compose.service"],
      port:
        el.Ports.map((port) => port.PublicPort).find(
          (port) => port !== undefined,
        ) || 0,
      status: el.State === "running" ? "running" : "stopped",
    }))

  console.log("successfully create project with containers", containers)

  return { ...project, appsStates: containers }
}

const generateCompose = async (_projectPath: string, project: Project) => {
  // const composePath = path.join(projectPath, ".daba", "compose.yml")
  const composeJSON: any = {
    version: "3.9",
    services: {},
    volumes: [],
  }

  for (const app of project.apps) {
    composeJSON.services[app.name] = {
      restart: "always",
    }
    const ports = app.ports?.map((port) => port[0] + ":" + port[1])
    if (ports) {
      composeJSON.services[app.name].ports = ports
    }

    // todo: remove this, only get from `ports`
    if (app.technology.ports) {
      composeJSON.services[app.name].ports = [app.technology.ports]
    }

    if (app.technology.image) {
      composeJSON.services[app.name].image = app.technology.image
    } else {
      composeJSON.services[app.name].build = `./${app.name}`
    }
    if (app.envVars) {
      composeJSON.services[app.name].environment = app.envVars.reduce(
        (acc, curr) => {
          acc[curr.key] = curr.value
          return acc
        },
        {},
      )
    }
    if (app.technology.namedVolumes) {
      composeJSON.services[app.name].volumes = [
        ...(app.technology.volumes?.map((v) =>
          v.replace("{{appName}}", app.name),
        ) || []),
        ...(app.technology.namedVolumes || []),
      ]

      composeJSON.volumes = {}

      app.technology.namedVolumes.forEach((v) => {
        const volumeName = v.split(":")[0]
        composeJSON.volumes[volumeName] = {}
      })
    }
  }

  return yaml.dump(composeJSON)
}
