import { app, shell, BrowserWindow, nativeTheme } from "electron"
import { join } from "path"
import { electronApp, optimizer, is } from "@electron-toolkit/utils"
// import icon from "../../resources/icon.png?asset"
import windowStateManager from "electron-window-state"
import { autoUpdater } from "electron-updater"
import { setAutoUpdaterNotifiers } from "./autoUpdater"
// import * as Sentry from "@sentry/electron/main"

// todo: only enable sentry in production
// Sentry.init({
//   dsn: "https://edda02cbb30d167fcbaeabdfa0c08e65@o4507617273970688.ingest.us.sentry.io/4507617285439488",
// })

import log from "electron-log/main"
import { setupHandlers } from "./handlers"

log.transports.file.level = "debug"
console.log = log.log

export let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  nativeTheme.themeSource = "dark"

  const windowState = windowStateManager({
    defaultWidth: 1100,
    defaultHeight: 800,
  })
  mainWindow = new BrowserWindow({
    width: windowState.width,
    height: windowState.height,
    x: windowState.x,
    y: windowState.y,
    show: false,
    autoHideMenuBar: true,
    // ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
    frame: false,
    trafficLightPosition: {
      x: 10,
      y: 10,
    },
    titleBarStyle: "customButtonsOnHover",
    darkTheme: true,
    backgroundColor: "#242424",
  })

  setAutoUpdaterNotifiers(mainWindow)

  // initialize window state
  windowState.manage(mainWindow)
  // and save state when exiting
  mainWindow.on("close", () => {
    mainWindow && windowState.saveState(mainWindow)
  })

  mainWindow.on("ready-to-show", () => {
    mainWindow?.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: "deny" }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"])
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId("com.electron")

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  setupHandlers()

  createWindow()

  autoUpdater.checkForUpdatesAndNotify()

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
