<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";

  const { ...props }: SVGAttributes<SVGElement> = $props();
</script>

<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <path
    d="M5 4C5 4.55228 4.55228 5 4 5C3.44772 5 3 4.55228 3 4C3 3.44772 3.44772 3 4 3C4.55228 3 5 3.44772 5 4Z"
    fill="white"
  />
  <path
    d="M7 5C7.55228 5 8 4.55228 8 4C8 3.44772 7.55228 3 7 3C6.44772 3 6 3.44772 6 4C6 4.55228 6.44772 5 7 5Z"
    fill="white"
  />
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M0 3C0 1.34315 1.34315 0 3 0H17C18.6569 0 20 1.34315 20 3V17C20 18.6569 18.6569 20 17 20H3C1.34315 20 0 18.6569 0 17V3ZM3 1.5H17C17.8284 1.5 18.5 2.17157 18.5 3V6.5H1.5V3C1.5 2.17157 2.17157 1.5 3 1.5ZM18.5 8V17C18.5 17.8284 17.8284 18.5 17 18.5H3C2.17157 18.5 1.5 17.8284 1.5 17V8H18.5Z"
    fill="white"
  />
</svg>
