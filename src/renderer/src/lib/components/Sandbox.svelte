<script lang="ts">
  import TechLoader from "./TechLoader.svelte"

  const DURATION = 3000

  let progress = $state(0)

  let duration = $state(DURATION)

  let timeout: NodeJS.Timeout | null = null

  let counter = 1

  const getProgress = () => {
    let multiplier = 0
    Array(counter)
      .fill("")
      .forEach((_, c) => {
        multiplier += 1 / 2 ** c
      })
    return multiplier * 50
  }

  const animate = () => {
    timeout && clearTimeout(timeout)
    progress = getProgress()
    duration = DURATION + (DURATION / 2) * (counter - 1)

    console.log("setting:", { progress, duration })
    timeout = setTimeout(() => {
      counter++
      animate()
    }, duration)
  }

  const finish = () => {
    timeout && clearTimeout(timeout)
    progress = 100
    duration = 500
  }

  $effect(() => {
    return () => timeout && clearTimeout(timeout)
  })
</script>

<div class="flex flex-col gap-[20px] p-[100px] items-center justify-center">
  <TechLoader tech="postgres" {progress} {duration} />

  <button
    class="rounded-[4px] hover:bg-white/[0.02] active:bg-white/[0.03] px-[10px] py-[6px] inline-block min-w-0"
    onclick={animate}
  >
    start
  </button>
  <button
    class="rounded-[4px] hover:bg-white/[0.02] active:bg-white/[0.03] px-[10px] py-[6px] inline-block min-w-0"
    onclick={finish}
  >
    finish
  </button>
</div>
