<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";

  const { ...props }: SVGAttributes<SVGElement> = $props();
</script>

<svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M0.17145 0.571444C0.400049 0.342844 0.770682 0.342844 0.999282 0.571444L4 3.57216L7.00072 0.571444C7.22932 0.342844 7.59995 0.342844 7.82855 0.571444C8.05715 0.800043 8.05715 1.17068 7.82855 1.39928L4.41392 4.81391C4.18532 5.04251 3.81468 5.04251 3.58608 4.81391L0.17145 1.39928C-0.0571499 1.17068 -0.0571499 0.800043 0.17145 0.571444Z"
    fill="currentColor"
  />
</svg>
