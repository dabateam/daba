<script lang="ts">
  import { untrack } from "svelte"
  import TechLoader from "./TechLoader.svelte"

  const {
    tech,
    started = false,
    completed = false,
    app,
  }: {
    tech: string
    started?: boolean
    completed?: boolean
    app: string
  } = $props()

  const DURATION = 10000

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

  $effect(() => {
    if (started) untrack(() => animate())
  })

  $effect(() => {
    if (started && completed) untrack(() => finish())
  })
</script>

<TechLoader {tech} {progress} {duration} {app} />
