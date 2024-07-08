export type Technology = { id: string; label: string; image?: string; category: string };

export type AppType = {
  label: string;
  id: string;
  icon?: ConstructorOfATypedSvelteComponent;
  disabled?: boolean;
  defaultName?: string;
};
