import { autoUpdater } from "electron-updater"
import { BrowserWindow } from "electron"

export const setAutoUpdaterNotifiers = (window: BrowserWindow) => {
  function sendStatusToWindow(text) {
    // log.info(text)
    window.webContents.send("message", text)
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
}
