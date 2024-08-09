import fetch from "node-fetch"
import AdmZip from "adm-zip"
import fs from "fs-extra"
import path from "node:path"

function mergeLinks(...parts: string[]) {
  return parts.map((part) => part.replace(/(^\/+|\/+$)/g, "")).join("/")
}

export const downloadFolderFromRepo = async (
  repo: string,
  folder: string,
  destination: string,
) => {
  const url = mergeLinks(repo, `/archive/refs/heads/main.zip`)
  console.log("repo url: ", url)

  const response = await fetch(url)

  const repoFolderName =
    response.headers.get("content-disposition")?.split("filename=")[1] ||
    repo.split("/").pop() + "-main.zip"

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`)
  }

  const zipPath = path.join(destination, repoFolderName)
  await fs.ensureDir(destination)

  const fileStream = fs.createWriteStream(zipPath)

  await new Promise((resolve, reject) => {
    response.body?.pipe(fileStream)
    response.body?.on("error", reject)
    fileStream.on("finish", resolve)
  })

  const zip = new AdmZip(zipPath)
  zip.extractAllTo(destination, true)
  await fs.remove(zipPath)

  console.log(
    `Repository ${repo} downloaded and extracted to ${destination}, and removed.`,
  )

  const f = folder.replace(/(^\/+|\/+$)/g, "").split("/")

  const unzippedRepoFolderName = repoFolderName.split(".zip")[0]

  const folderPath = path.join(destination, unzippedRepoFolderName, ...f)
  const folderExists = await fs.pathExists(folderPath)

  if (!folderExists) {
    console.error(`Folder ${folderPath} not found in ${destination}`)
    return
  }

  await fs.copy(folderPath, destination)
  console.log(`Folder ${folder} copied to ${destination}`)

  await fs.remove(path.join(destination, unzippedRepoFolderName))
}

// downloadFolderFromRepo("https://github.com/dabateam/apps", "apps/react", path.join(__dirname, "react"))
