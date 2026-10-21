export const AVATARS = {
  enzo: require("@/assets/avatars/enzo.png"),
  nina: require("@/assets/avatars/nina.png"),
  zack: require("@/assets/avatars/zack.png"),
  cleo: require("@/assets/avatars/cleo.png"),
  axel: require("@/assets/avatars/axel.png"),
  freya: require("@/assets/avatars/freya.png"),
  kai: require("@/assets/avatars/kai.png"),
  luca: require("@/assets/avatars/luca.png"),
} as const;

export type AvatarName = keyof typeof AVATARS;
