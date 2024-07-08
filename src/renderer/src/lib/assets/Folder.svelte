<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";

  const { ...props }: SVGAttributes<SVGElement> = $props();
</script>

<svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <path
    d="M0.9 8C0.6525 8 0.4407 7.90217 0.2646 7.7065C0.0885 7.51083 0.0003 7.27533 0 7V1C0 0.725 0.0882 0.489667 0.2646 0.294C0.441 0.0983332 0.6528 0.000333333 0.9 0H3.6L4.5 1H8.1C8.3475 1 8.55945 1.098 8.73585 1.294C8.91225 1.49 9.0003 1.72533 9 2V7C9 7.275 8.91195 7.5105 8.73585 7.7065C8.55975 7.9025 8.3478 8.00033 8.1 8H0.9ZM0.9 7H8.1V2H4.12875L3.22875 1H0.9V7Z"
    fill="currentColor"
  />
</svg>
