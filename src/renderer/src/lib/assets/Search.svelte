<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";

  const { ...props }: SVGAttributes<SVGElement> = $props();
</script>

<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <path
    opacity="0.3"
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M6.98861 3.99564C6.98861 5.65039 5.6477 6.99127 3.99431 6.99127C2.34091 6.99127 1 5.65039 1 3.99564C1 2.34088 2.34091 1 3.99431 1C5.6477 1 6.98861 2.34088 6.98861 3.99564ZM6.48776 7.1173C5.8044 7.66422 4.93753 7.99127 3.99431 7.99127C1.78831 7.99127 0 6.20236 0 3.99564C0 1.78891 1.78831 0 3.99431 0C6.2003 0 7.98861 1.78891 7.98861 3.99564C7.98861 4.93893 7.66184 5.80589 7.11535 6.4894L10.0777 9.45269L9.45001 10.0805L6.48776 7.1173Z"
    fill="white"
  />
</svg>
