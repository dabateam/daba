<script lang="ts">
  import anime from "animejs"
  import TechLoader from "./TechLoader.svelte"

  let progress = $state({
    value: 0,
  })

  let counter = 1

  const TIME_INCREMENT = 3000

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
    anime.remove(progress)
    anime({
      targets: progress,
      value: getProgress(),
      easing: "linear",
      duration: TIME_INCREMENT + (TIME_INCREMENT / 2) * (counter - 1),
      complete: () => {
        counter++
        animate()
      },
    })
  }

  const finish = () => {
    anime.remove(progress)
    anime({
      targets: progress,
      value: 100,
      easing: "linear",
      duration: 1000,
    })
  }

  // $effect(() => {
  //   return () => clearTimeout(timeout)
  // })
</script>

<div class="flex flex-col gap-[20px] p-[100px] items-center justify-center">
  <TechLoader tech="postgres" />
  <TechLoader tech="mongo" />
  <TechLoader tech="mysql" />
  <TechLoader tech="redis" />
  <TechLoader tech="go" />

  <div id="progress">
    {progress.value.toFixed(0)}%
  </div>
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
