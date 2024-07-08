<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";

  const { ...props }: SVGAttributes<SVGElement> = $props();
</script>

<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M4.26627 0.616058H2.90809V3.52423H0V4.88225H2.90809V7.79042H4.26627V4.88225H7.17436V3.52423H4.26627V0.616058Z"
    fill="white"
  />
</svg>
