const vertical = { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } } as const;

export const gradients = {
  linear01: {
    colors: ["#32B6FF", "#6939EE"],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  linear02: {
    colors: ["rgba(45,65,238,0.6)", "rgba(11,11,11,0)"],
    ...vertical,
  },
  linear03: { colors: ["#BF2ECC", "#F8ABFF"], ...vertical },
  linear04: { colors: ["#E13065", "#FFB5CB"], ...vertical },
  linear05: { colors: ["#08A563", "#C5FFE7"], ...vertical },
  linear06: { colors: ["#345FFD", "#C2CFFF"], ...vertical },
  linear07: { colors: ["#D89C02", "#FFF2D2"], ...vertical },

  cardFilled05: { colors: ["#DFE9FF", "#D7D9E4"], ...vertical },
} as const;
