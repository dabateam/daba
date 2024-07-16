<script lang="ts">
  import { newProjectState } from "../../store.svelte"
  import ApproxTechLoader from "../ApproxTechLoader.svelte"
  import TechLoader from "../TechLoader.svelte"

  let log = $state("")

  const apps = newProjectState.newProject.apps.map((a) => a.name)

  let appsProgressMap: Record<
    string,
    {
      progress: string
      completed?: boolean
      approx?: boolean
    }
  > = $state({})

  $effect(() => {
    apps.forEach((app) => {
      appsProgressMap[app] = {
        progress: "",
      }
    })
  })

  const appTechMap = newProjectState.newProject.apps.reduce(
    (acc, curr) => ({ ...acc, [curr.name]: curr.tech }),
    {},
  )

  const startApproxProgress = (app: string) => {
    if (!apps.includes(app)) {
      console.log("app not found, in startApproxProgress", { app, apps })
      return
    }
    appsProgressMap[app] = {
      approx: true,
      progress: "started",
    }
  }

  const makeCurrentCompleted = (app: string) => {
    if (appsProgressMap[app]) {
      appsProgressMap[app] = {
        ...appsProgressMap[app],
        completed: true,
      }
    }
  }

  const getProgress = (progress: string) => {
    if (!progress || !progress.includes("/")) return 0
    const left = progress.split("/")[0]
    const right = progress.split("/")[1]
    const res = parseInt(left) / parseInt(right)
    return parseInt((res * 100).toFixed(0))
  }

  const processLog = (log: string) => {
    if (apps.map((a) => a + " Pulling").some((l) => log.includes(l))) {
      const extractedApp = log.trim().split(" ")[0]
      startApproxProgress(extractedApp)
      return
    }

    if (apps.map((a) => a + " Pulled").some((l) => log.includes(l))) {
      const extractedApp = log.trim().split(" ")[0]
      makeCurrentCompleted(extractedApp)
      return
    }

    if (log.includes("[") && log.includes("]")) {
      const positionOfOpeningBracket = log.indexOf("[")
      const positionOfClosingBracket = log.indexOf("]")
      const extractedApp = log
        .substring(positionOfOpeningBracket + 1, positionOfClosingBracket)
        .split(" ")[0]
      if (apps.includes(extractedApp)) {
        const fraction = log.match(/\b\d+\/\d+\b/)?.[0]
        if (fraction) {
          const left = fraction.split("/")[0]
          const right = fraction.split("/")[1]
          const progress = parseInt(left) / parseInt(right)
          appsProgressMap[extractedApp] = {
            progress: fraction,
          }
          console.log(`${extractedApp}: ${fraction} (${progress})`)
        }
      }
    }
  }

  $effect(() => {
    window.electron.ipcRenderer.on("docker-compose-log", (_, _log) => {
      if (_log) {
        processLog(_log)
        log = _log
      }
    })
  })
</script>

<div class="size-full flex items-center justify-center relative">
  <div class="flex gap-[80px] mb-[15vh]">
    {#each Object.keys(appsProgressMap) as app}
      {@const progress = appsProgressMap[app]}
      {#if appsProgressMap[app].approx}
        <ApproxTechLoader
          tech={appTechMap[app]}
          started={!!progress.progress}
          completed={progress.completed}
        />
      {:else}
        <TechLoader
          tech={appTechMap[app]}
          progress={getProgress(progress.progress)}
        />
      {/if}
    {/each}
  </div>
  <div
    class="absolute bottom-[20px] text-[10px] text-white/40 w-full left-0 text-center"
  >
    {log}
  </div>
</div>

<!-- <div class="ring size-full flex items-center justify-center relative">
  <div class="flex gap-[60px] mb-[15vh]">
    <ApproxTechLoader tech="mongodb" started={true} completed={false} />
    <ApproxTechLoader tech="postgres" started={true} completed={false} />
    <ApproxTechLoader tech="react" started={true} completed={false} />
  </div>
</div> -->
