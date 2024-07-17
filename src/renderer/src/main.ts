import { mount } from "svelte"
import "./app.css"
import App from "./App.svelte"
import * as Sentry from "@sentry/electron/renderer"

Sentry.init({
  dsn: "https://edda02cbb30d167fcbaeabdfa0c08e65@o4507617273970688.ingest.us.sentry.io/4507617285439488",

  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})

const app = mount(App, {
  target: document.getElementById("app")!,
})

export default app
