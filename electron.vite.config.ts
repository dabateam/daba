import { sentryVitePlugin } from "@sentry/vite-plugin"
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
      sentryVitePlugin({
        org: "daba-cb",
        project: "electron",
      }),
    ],
    build: {
      sourcemap: true,
    },
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
      sentryVitePlugin({
        org: "daba-cb",
        project: "electron",
      }),
    ],
    build: {
      sourcemap: true,
    },
  },
})
