import { ElectronAPI } from "@electron-toolkit/preload";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: import("../../preload/index.ts").API;
  }
}

export {};
