import { useColorScheme } from "nativewind";
import { useState, type ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import { notchPath } from "@/lib/notch";

type PanelColors = { fill: string; stroke?: string };

type NotchedPanelProps = {
  light: PanelColors;
  dark: PanelColors;
  bottomRadius?: number;
  className?: string;
  children?: ReactNode;
};

export default function NotchedPanel({
  light,
  dark,
  bottomRadius = 0,
  className,
  children,
}: NotchedPanelProps) {
  const { colorScheme } = useColorScheme();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const { fill, stroke } = colorScheme === "dark" ? dark : light;

  return (
    <View
      className={className}
      onLayout={({ nativeEvent }) => setSize(nativeEvent.layout)}
    >
      {size.width > 0 ? (
        <Svg
          width={size.width}
          height={size.height}
          style={StyleSheet.absoluteFill}
        >
          <Path
            d={notchPath(size.width, size.height, bottomRadius)}
            fill={fill}
            stroke={stroke ?? "none"}
            strokeWidth={1}
          />
        </Svg>
      ) : null}
      <View className="absolute inset-x-0 top-3 items-center">
        <View className="size-3.5 rounded-full border-[1.17px] border-brand-200 bg-brand-50 dark:border dark:border-snow-300/[0.11] dark:bg-snow-300/[0.04]" />
      </View>
      {children}
    </View>
  );
}
