import runTippy from "tippy.js";
import type { Props } from "tippy.js";

export type TippyProps = Partial<Props>;

export interface TippyReturn {
  update: (newProps: TippyProps) => void;
  destroy: () => void;
}

export type Tippy = (element: HTMLElement, props?: TippyProps) => TippyReturn;

export const tippy: Tippy = (element, props) => {
  const { destroy, setProps: update } = runTippy(element, props);
  return {
    destroy,
    update,
  };
};

export type CreateTippy = (defaultProps: TippyProps) => Tippy;

export const createTippy: CreateTippy = (defaultProps) => (element, props) =>
  tippy(element, { ...props, ...defaultProps });
