import fetch from "node-fetch"
import AdmZip from "adm-zip"
import fs from "fs-extra"
import path from "node:path"
import os from "node:os"

export const getStarter = async (starter: string, projectName: string) => {
  // todo: remove
  const owner = "dabateam"
  const repo = "apps"
  const projectsRoot = path.join(os.homedir(), "Documents", "Projects")
  // ---

  const url = `https://github.com/${owner}/${repo}/archive/refs/heads/main.zip`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`)
  }

  const zipPath = path.join(projectsRoot, `${repo}.zip`)
  await fs.ensureDir(projectsRoot)

  const fileStream = fs.createWriteStream(zipPath)

  await new Promise((resolve, reject) => {
    response.body.pipe(fileStream)
    response.body.on("error", reject)
    fileStream.on("finish", resolve)
  })

  const zip = new AdmZip(zipPath)
  zip.extractAllTo(projectsRoot, true)
  // await fs.remove(zipPath)

  console.log(`Repository ${repo} downloaded and extracted to ${projectsRoot}`)

  // find the starter inside the extracted folder
  const starterPath = path.join(projectsRoot, "apps-main", "starters", starter)
  const starterExists = await fs.pathExists(starterPath)

  if (!starterExists) {
    console.error(`Starter ${starter} not found in ${repo}`)
    return
  }

  await fs.copy(starterPath, path.join(projectsRoot, projectName))
  console.log(
    `Starter ${starter} copied to ${path.join(projectsRoot, projectName)}`,
  )

  await fs.remove(path.join(projectsRoot, repo))
}
