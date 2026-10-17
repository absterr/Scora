const BUMP_HEIGHT = 25.46;
const TOP_RADIUS = 24;
const NOTCH_RADIUS = 42;
const NOTCH_CENTER_Y = 42;
const FILLET_RADIUS = 32;

// Concave fillet circles are tangent to the body edge and to the notch circle
const dy = NOTCH_CENTER_Y - (BUMP_HEIGHT - FILLET_RADIUS);
const base = Math.sqrt((NOTCH_RADIUS + FILLET_RADIUS) ** 2 - dy ** 2);
const k = NOTCH_RADIUS / (NOTCH_RADIUS + FILLET_RADIUS);
const tangentX = base * k;
const tangentY = NOTCH_CENTER_Y - dy * k;

export const notchPath = (w: number, h: number, bottomRadius = 0) => {
  const c = w / 2;
  const r = bottomRadius;
  const f = FILLET_RADIUS;
  const bottom =
    r > 0
      ? [
          `V${h - r}`,
          `A${r} ${r} 0 0 1 ${w - r} ${h}`,
          `H${r}`,
          `A${r} ${r} 0 0 1 0 ${h - r}`,
        ]
      : [`V${h}`, "H0"];

  return [
    `M0 ${h - r}`,
    `V${BUMP_HEIGHT + TOP_RADIUS}`,
    `A${TOP_RADIUS} ${TOP_RADIUS} 0 0 1 ${TOP_RADIUS} ${BUMP_HEIGHT}`,
    `H${c - base}`,
    `A${f} ${f} 0 0 0 ${c - tangentX} ${tangentY}`,
    `A${NOTCH_RADIUS} ${NOTCH_RADIUS} 0 0 1 ${c + tangentX} ${tangentY}`,
    `A${f} ${f} 0 0 0 ${c + base} ${BUMP_HEIGHT}`,
    `H${w - TOP_RADIUS}`,
    `A${TOP_RADIUS} ${TOP_RADIUS} 0 0 1 ${w} ${BUMP_HEIGHT + TOP_RADIUS}`,
    ...bottom,
    "Z",
  ].join(" ");
};
