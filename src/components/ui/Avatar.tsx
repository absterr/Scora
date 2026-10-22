import { Image, Text, View, type ImageSourcePropType } from "react-native";

import { cn } from "@/lib/utils";

type AvatarProps = {
  name: string;
  source?: ImageSourcePropType;
  size?: number;
  className?: string;
  textClassName?: string;
};

// Expanded or randomised in the future
const COLORS = [
  "bg-warning-400",
  "bg-error-300",
  "bg-brand-200",
  "bg-brand-300",
];

const colorFor = (name: string) =>
  COLORS[
    [...name].reduce((sum, c) => sum + c.charCodeAt(0), 0) % COLORS.length
  ];

const initialsFor = (name: string) =>
  name
    .split("@")[0]
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

export default function Avatar({
  name,
  source,
  size = 24,
  className,
  textClassName,
}: AvatarProps) {
  return (
    <View
      className={cn(
        "items-center justify-center overflow-hidden rounded-full border-[0.6px] border-white",
        colorFor(name),
        className
      )}
      style={{ width: size, height: size }}
    >
      {source ? (
        <Image source={source} className="size-full" />
      ) : (
        <Text
          className={cn("font-display-medium text-white", textClassName)}
          style={{ fontSize: size * 0.35, lineHeight: size * 0.5 }}
        >
          {initialsFor(name)}
        </Text>
      )}
    </View>
  );
}
