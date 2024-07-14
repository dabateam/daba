<script>
  import AiGeneratedStarter from "../../assets/AIGeneratedStarter.svelte"
  import Cubes from "../../assets/Cubes.svelte"
  import ImportExistingProject from "../../assets/ImportExistingProject.svelte"
  import Settings from "../../assets/Settings.svelte"
  import { newProjectState } from "../../store.svelte"
  import { cn } from "../../utils"
</script>

<div class="flex flex-col gap-[8px]">
  <div class="text-[13px] text-center my-[7vh] text-white/40">
    Choose a flow
  </div>

  <div
    class={cn(
      "border border-transparent rounded-[8px] h-[100px] flex items-center hover:bg-white/[0.02] active:bg-white/[0.03] w-[380px] gap-[20px] px-[20px]",
      newProjectState.selectedFlow === "Starters" &&
        "bg-white/[0.03] hover:bg-white/[0.03] border-white/10",
    )}
    onclick={() => {
      newProjectState.selectedFlow = "Starters"
      // routingState.view = "new-project.pick-starter"
    }}
  >
    <div
      class="size-[56px] bg-white/5 rounded-full shrink-0 flex items-center justify-center text-[#66BFFF]"
    >
      <Cubes />
    </div>
    <div>
      <div class="text-[13px] mb-[6px]">Starters & boilerplates</div>
      <div class="text-[11px] leading-[17px] text-white/50">
        Choose from a list of community-made starters<br />and boilerplates, and
        tweak them to your needs.
      </div>
    </div>
  </div>
  <div
    class={cn(
      "border border-transparent rounded-[8px] h-[100px] flex items-center hover:bg-white/[0.02] active:bg-white/[0.03] w-[380px] gap-[20px] px-[20px] opacity-50 pointer-events-none",
      newProjectState.selectedFlow === "DIY" &&
        "bg-white/[0.03] hover:bg-white/[0.03] border-white/10",
    )}
    onclick={() => {
      newProjectState.selectedFlow = "DIY"
      // routingState.view = "new-project.pick-starter"
    }}
  >
    <div
      class="size-[56px] bg-white/5 rounded-full shrink-0 flex items-center justify-center text-[#5878EA]"
    >
      <Settings />
    </div>
    <div>
      <div class="text-[13px] mb-[6px]">Build my own tech stack / DIY</div>
      <div class="text-[11px] leading-[17px] text-white/50">
        Compose your app from a list of<br />
        technologies, libraries and frameworks.
      </div>
    </div>
  </div>
  <div
    class={cn(
      "border border-transparent rounded-[8px] h-[100px] flex items-center hover:bg-white/[0.02] active:bg-white/[0.03] w-[380px] gap-[20px] px-[20px] opacity-50 pointer-events-none",
      newProjectState.selectedFlow === "Clone / Import" &&
        "bg-white/[0.03] hover:bg-white/[0.03] border-white/10",
    )}
    onclick={() => {
      newProjectState.selectedFlow = "Clone / Import"
      // routingState.view = "new-project.pick-starter"
    }}
  >
    <div
      class="size-[56px] bg-white/5 rounded-full shrink-0 flex items-center justify-center"
    >
      <ImportExistingProject />
    </div>
    <div>
      <div class="text-[13px] mb-[6px]">Import / clone an existing project</div>
      <div class="text-[11px] leading-[17px] text-white/50">
        Clone and deploy a popular open source project,<br />
        or connect your own git repo.
      </div>
    </div>
  </div>
  <div
    class={cn(
      "border border-transparent rounded-[8px] h-[100px] flex items-center hover:bg-white/[0.02] active:bg-white/[0.03] w-[380px] gap-[20px] px-[20px] opacity-50 pointer-events-none",
      newProjectState.selectedFlow === "AI Starter" &&
        "bg-white/[0.03] hover:bg-white/[0.03] border-white/10",
    )}
    onclick={() => {
      newProjectState.selectedFlow = "AI Starter"
      // routingState.view = "new-project.pick-starter"
    }}
  >
    <div
      class="size-[56px] bg-white/5 rounded-full shrink-0 flex items-center justify-center"
    >
      <AiGeneratedStarter />
    </div>
    <div>
      <div class="text-[13px] mb-[6px]">AI-generated starter</div>
      <div class="text-[11px] leading-[17px] text-white/50">
        Describe your project and let AI suggest<br />
        a tech stack and generate boilerplate code.
      </div>
    </div>
  </div>
</div>
