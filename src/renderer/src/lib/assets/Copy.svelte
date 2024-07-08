<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";

  const { ...props }: SVGAttributes<SVGElement> = $props();
</script>

<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M9.09999 0.800003H4.59999C3.99318 0.800003 3.49999 1.2932 3.49999 1.9V3.5H1.89999C1.29318 3.5 0.799988 3.9932 0.799988 4.6V9.1C0.799988 9.70681 1.29318 10.2 1.89999 10.2H6.39999C7.00679 10.2 7.49999 9.70681 7.49999 9.1V7.5H9.09999C9.70679 7.5 10.2 7.00681 10.2 6.4V1.9C10.2 1.2932 9.70679 0.800003 9.09999 0.800003ZM8.89999 2.1V6.2H7.49999V4.6C7.49999 3.9932 7.00679 3.5 6.39999 3.5H4.79999V2.1H8.89999ZM6.20085 8.9H2.09999V4.8H6.20003L6.20085 8.9Z"
    fill="currentColor"
  />
</svg>
