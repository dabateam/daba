<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";

  const { ...props }: SVGAttributes<SVGElement> = $props();
</script>

<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <path
    d="M2 15V6.875M8.5 15V2M15 15V11.75"
    stroke="currentColor"
    stroke-width="2.875"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
