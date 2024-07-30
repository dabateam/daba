<script lang="ts">
  import type { Technology } from "../../../../../shared/types"
  import { newProjectState } from "../../store.svelte"
  import { cn } from "../../utils"
  import ApproxTechLoader from "./ApproxTechLoader.svelte"
  import TechLoader from "./TechLoader.svelte"

  let logs = $state<string[]>([])

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

  const appTechMap: Record<string, Technology> =
    newProjectState.newProject.apps.reduce(
      (acc, curr) => ({ ...acc, [curr.name]: curr.technology }),
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
      logs.push(_log)

      if (_log) {
        processLog(_log)
        log = _log
      }
    })
  })

  let showLogs = $state(false)

  let logsContainer: HTMLDivElement | null = $state(null)

  $effect(() => {
    if (logsContainer) logsContainer.scrollTop = logsContainer.scrollHeight
  })

  const highlightLine = (l: string, i: number) => {
    if (!!l.trim() && i === logs.length - 1) return true
    if (i === logs.length - 2 && !logs[i + 1].trim()) return true
    return false
  }

  $inspect(newProjectState.step, appsProgressMap)

  console.log("HERE")
</script>

<div class="size-full flex items-center justify-center relative overflow-auto">
  <div class="flex gap-[80px] mb-[15vh]">
    {#each Object.keys(appsProgressMap) as app}
      {@const progress = appsProgressMap[app]}
      {#if appsProgressMap[app].approx}
        <ApproxTechLoader
          tech={appTechMap[app]}
          {app}
          started={!!progress.progress}
          completed={progress.completed}
        />
      {:else}
        <TechLoader
          tech={appTechMap[app]}
          {app}
          progress={getProgress(progress.progress)}
        />
      {/if}
    {/each}
  </div>

  {#if showLogs}
    <div
      bind:this={logsContainer}
      class="bg-[#242424] text-left text-white/50 overflow-auto absolute bottom-[59px] w-full h-[calc(100%-40px)] left-0 pt-[54px] text-[10px] px-[50px]"
    >
      <div class="w-fit mx-auto">
        {#each logs as l, i}
          <div
            class={cn(
              "text-white/40 mb-[12px]",
              highlightLine(l, i) && "text-white/70 mb-0",
            )}
          >
            {l}
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <div class="absolute bottom-[20px] text-[10px] w-full left-0 text-center">
    <div class="w-fit mx-auto mb-[16px]">
      {#if !showLogs}
        <div
          class="overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[300px] text-center text-white/25"
        >
          {log}
        </div>
      {/if}
    </div>
    <button
      class="text-white/40 rounded-[4px] px-[10px] py-[6px] border border-white/10 hover:bg-white/[0.02] active:bg-white/[0.03]"
      onclick={() => {
        showLogs = !showLogs
      }}
    >
      {showLogs ? "Hide logs" : "Show logs"}
    </button>
  </div>
</div>
