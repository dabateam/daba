<script lang="ts">
  import { cn } from "../utils";

  const { class: _class }: { class?: string } = $props();
</script>

<div
  class={cn("flex items-center justify-center size-[12px] relative", _class)}
>
  <div
    class="size-full rounded-full bg-[#5CDB30] absolute animate-[1.3s_pulse_infinite]"
  ></div>
  <div class="size-[5px] bg-[#5CDB30] rounded-full relative"></div>
</div>
