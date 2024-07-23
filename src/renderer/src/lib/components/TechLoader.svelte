<script lang="ts">
  import anime from "animejs"
  import Check from "../assets/Check.svelte"
  import { cn } from "../utils"

  const {
    tech,
    progress = 0,
    duration = 1000,
    app,
  }: {
    tech: string
    progress?: number
    duration?: number
    app: string
  } = $props()

  let w = $state(0)
  let h = $state(0)

  const getImageDimensions = (
    imageUrl: string,
    callback: (dimensions: { width: number; height: number }) => void,
  ) => {
    const img = new Image()
    img.onload = function () {
      const dimensions = { width: img.width, height: img.height }
      callback(dimensions)
    }
    img.onerror = function () {
      console.error("Failed to load image.")
    }
    img.src = imageUrl
  }

  const done = $derived(progress === 100)

  $effect(() => {
    if (tech)
      getImageDimensions(`images/${tech}.png`, (dimensions) => {
        const ratio = dimensions.height / 50
        w = dimensions.width / ratio
        h = 50
      })
  })

  $effect(() => {
    if (w) {
      anime({
        targets: `#__${tech}-loading-mask`,
        translateX: [-60, -20],
        easing: "linear",
        duration: 1000,
        loop: true,
      })
    }
  })

  $effect(() => {
    if (h && progress) {
      anime.remove(`#__${tech}-loading-mask-container`)
      anime({
        targets: `#__${tech}-loading-mask-container`,
        translateY: h - (progress / 100) * h,
        easing: "linear",
        duration: duration,
        update: (x) => {
          const v = parseFloat(x.animations[0].currentValue.slice(0, -2))
          const p = ((h - v) * 100) / h
          if (document.getElementById(`__${tech}-progress`))
            document.getElementById(`__${tech}-progress`)!.innerHTML =
              `${p.toFixed(0)}%`
        },
      })
    }
  })
</script>

<div
  class={cn(
    "flex flex-col items-center justify-center transition-opacity duration-200",
    progress === 0 && "opacity-50",
  )}
>
  <div>
    <svg
      width={w}
      height={h}
      viewBox="0 0 {w} {h}"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={`__${tech}-mask-gradient`}
          x1="100"
          y1="0"
          x2="100"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.1" />
          <stop offset="1" stop-color="white" />
        </linearGradient>
        <mask id={`__${tech}-mask`} maskUnits="userSpaceOnUse">
          <g
            id={`__${tech}-loading-mask-container`}
            style="transform: translateY({h}px);"
          >
            <path
              id={`__${tech}-loading-mask`}
              d="M160 4.30404C155.634 4.30404 152.817 3.22803 150 2.15202C147.183 1.07601 144.366 0 140 0C135.634 0 132.817 1.07601 130 2.15202C127.183 3.22803 124.366 4.30404 120 4.30404C115.634 4.30404 112.817 3.22803 110 2.15202C107.183 1.07601 104.366 0 100 0C95.6338 0 92.8169 1.07601 90 2.15202C87.1831 3.22803 84.3662 4.30404 80 4.30404C75.6338 4.30404 72.8169 3.22803 70 2.15202C67.1831 1.07601 64.3662 0 60 0L59.9489 4.91917e-05C55.6118 0.00840633 52.8059 1.08021 50 2.15202C47.1831 3.22803 44.3662 4.30404 40 4.30404C35.6338 4.30404 32.8169 3.22803 30 2.15202C27.1831 1.07601 24.3662 0 20 0C15.8756 0 13.6172 0.960142 11.2337 1.97345C8.5708 3.10556 5.75179 4.30404 0 4.30404V100H480V4.30404C475.634 4.30404 472.817 3.22803 470 2.15202C467.183 1.07601 464.366 0 460 0C455.634 0 452.817 1.07601 450 2.15202C447.183 3.22803 444.366 4.30404 440 4.30404C435.634 4.30404 432.817 3.22803 430 2.15202C427.183 1.07601 424.366 0 420 0C415.634 0 412.817 1.07601 410 2.15202C407.183 3.22803 404.366 4.30404 400 4.30404C395.634 4.30404 392.817 3.22803 390 2.15202C387.183 1.07601 384.366 0 380 0L379.949 4.91917e-05C375.612 0.00840633 372.806 1.08021 370 2.15202C367.183 3.22803 364.366 4.30404 360 4.30404C355.634 4.30404 352.817 3.22803 350 2.15202C347.183 1.07601 344.366 0 340 0C335.876 0 333.617 0.960142 331.234 1.97345C328.571 3.10556 325.752 4.30404 320 4.30404C315.634 4.30404 312.817 3.22803 310 2.15202C307.183 1.07601 304.366 0 300 0C295.634 0 292.817 1.07601 290 2.15202C287.183 3.22803 284.366 4.30404 280 4.30404C275.634 4.30404 272.817 3.22803 270 2.15202C267.183 1.07601 264.366 0 260 0C255.634 0 252.817 1.07601 250 2.15202C247.183 3.22803 244.366 4.30404 240 4.30404C235.634 4.30404 232.817 3.22803 230 2.15202C227.183 1.07601 224.366 0 220 0L219.949 4.91917e-05C215.612 0.00840633 212.806 1.08021 210 2.15202C207.183 3.22803 204.366 4.30404 200 4.30404C195.634 4.30404 192.817 3.22803 190 2.15202C187.183 1.07601 184.366 0 180 0C175.876 0 173.617 0.960142 171.234 1.97345C168.571 3.10556 165.752 4.30404 160 4.30404Z"
              fill={done ? "white" : `url(#__${tech}-mask-gradient)`}
            />
          </g>
        </mask>
      </defs>
      <image
        href="images/{tech}.png"
        width={w}
        height={h}
        class="grayscale opacity-30"
      />
      <image
        href="images/{tech}.png"
        width={w}
        height={h}
        mask={!done ? `url(#__${tech}-mask)` : undefined}
      />
    </svg>
  </div>

  <div
    class="flex items-center justify-center w-full gap-[6px] mt-[20px] text-[11px]"
  >
    {app}
    <div class="w-[10px]">
      {#if !done}
        <div
          id={`__${tech}-progress`}
          class=" tracking-wider text-white/70 w-[28px] text-left text-[10px]"
        >
          <span class="translate-y-[-2px] inline-block">...</span>
        </div>
      {:else}
        <div
          class=" tracking-wider text-white/70 w-[28px] pl-[2px] text-left text-[10px]"
        >
          <Check />
        </div>
      {/if}
    </div>
  </div>
</div>
