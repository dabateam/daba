import { defineConfig, externalizeDepsPlugin } from "electron-vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import fs from "fs-extra"

export default defineConfig({
  main: {
    plugins: [
      externalizeDepsPlugin(),
      {
        name: "copy-custom-folder",
        writeBundle() {
          fs.copySync("src/main/templates", "out/main/templates")
        },
      },
    ],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    plugins: [
      svelte({
        onwarn: (warning, handler) => {
          if (warning.code.includes("a11y")) return
          handler?.(warning)
        },
      }),
    ],
  },
})
