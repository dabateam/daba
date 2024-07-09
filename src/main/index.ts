import { app, shell, BrowserWindow, nativeTheme } from "electron"
import { join } from "path"
import { electronApp, optimizer, is } from "@electron-toolkit/utils"
import icon from "../../resources/icon.png?asset"
import "./handlers"
import windowStateManager from "electron-window-state"
import { autoUpdater } from "electron-updater"
import log from "electron-log/main"

log.transports.file.level = "debug"
autoUpdater.logger = log

export let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  nativeTheme.themeSource = "dark"

  // Create the browser window.
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
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
    frame: false,
    // transparent: true,
    trafficLightPosition: {
      x: 10,
      y: 10,
    },
    titleBarStyle: "customButtonsOnHover",
    darkTheme: true,
    backgroundColor: "#242424",
  })

  function sendStatusToWindow(text) {
    log.info(text)
    mainWindow?.webContents.send("message", text)
  }

  autoUpdater.on("checking-for-update", () => {
    sendStatusToWindow("Checking for update...")
  })
  autoUpdater.on("update-available", (_) => {
    sendStatusToWindow("Update available.")
  })
  autoUpdater.on("update-not-available", (_) => {
    sendStatusToWindow("Update not available.")
  })
  autoUpdater.on("error", (err) => {
    sendStatusToWindow("Error in auto-updater. " + err)
  })
  autoUpdater.on("download-progress", (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond
    log_message = log_message + " - Downloaded " + progressObj.percent + "%"
    log_message =
      log_message +
      " (" +
      progressObj.transferred +
      "/" +
      progressObj.total +
      ")"
    sendStatusToWindow(log_message)
  })
  autoUpdater.on("update-downloaded", (_) => {
    sendStatusToWindow("Update downloaded")
  })

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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron")

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  autoUpdater.checkForUpdatesAndNotify()

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
