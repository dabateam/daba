import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { tippy } from "./tippy";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getRandomId = (length: number = 10) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const invoke = window.electron.ipcRenderer.invoke;

export function clickOutside<T extends HTMLElement>(
  element: T,
  callbackFunction: (element: T) => void,
) {
  function onClick(event) {
    if (!element.contains(event.target)) {
      callbackFunction(element);
    }
  }

  document.body.addEventListener("click", onClick);

  return {
    update(newCallbackFunction) {
      callbackFunction = newCallbackFunction;
    },
    destroy() {
      document.body.removeEventListener("click", onClick);
    },
  };
}

export { tippy };
