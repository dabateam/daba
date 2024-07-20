// import { sentryVitePlugin } from "@sentry/vite-plugin"
import { defineConfig, externalizeDepsPlugin } from "electron-vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"

export default defineConfig({
  main: {
    plugins: [
      externalizeDepsPlugin(),
      // sentryVitePlugin({
      //   org: "daba-cb",
      //   project: "electron",
      // }),
    ],
    // build: {
    //   sourcemap: true,
    // },
    build: {
      rollupOptions: {
        output: {
          format: "es",
        },
      },
    },
  },

  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        output: {
          format: "es",
        },
      },
    },
  },

  renderer: {
    plugins: [
      svelte({
        onwarn: (warning, handler) => {
          if (warning.code.includes("a11y")) return
          handler?.(warning)
        },
      }),
      // sentryVitePlugin({
      //   org: "daba-cb",
      //   project: "electron",
      // }),
    ],
    // build: {
    //   sourcemap: true,
    // },
    build: {
      rollupOptions: {
        output: {
          format: "es",
        },
      },
    },
  },
})
