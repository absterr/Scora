import { useEffect, useState, type FC, type RefObject } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import type { SvgProps } from "react-native-svg";

import { cn } from "@/lib/utils";

export type ActionMenuItem = {
  label: string;
  icon: FC<SvgProps>;
  onPress?: () => void;
};

type ActionMenuProps = {
  visible: boolean;
  onClose: () => void;
  anchorRef: RefObject<View | null>;
  items: ActionMenuItem[];
};

type Anchor = { x: number; y: number; width: number; height: number };

const GAP = 12;
const MENU_SHADOW = { boxShadow: "0 2px 4px rgba(24,24,24,0.08)" };

export default function ActionMenu({
  visible,
  onClose,
  anchorRef,
  items,
}: ActionMenuProps) {
  const [anchor, setAnchor] = useState<Anchor | null>(null);

  useEffect(() => {
    if (!visible) {
      setAnchor(null);
      return;
    }
    anchorRef.current?.measureInWindow((x, y, width, height) =>
      setAnchor({ x, y, width, height })
    );
  }, [visible, anchorRef]);

  return (
    <Modal
      visible={visible && anchor !== null}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      {anchor ? (
        <View
          className="absolute rounded-xl border border-brand-100 bg-snow-500 py-1 dark:border-grey-500 dark:bg-grey-700"
          style={[
            MENU_SHADOW,
            {
              top: anchor.y + anchor.height + GAP,
              left: anchor.x,
              width: anchor.width,
            },
          ]}
        >
          {items.map(({ label, icon: Icon, onPress }) => (
            <Pressable
              key={label}
              accessibilityRole="menuitem"
              className="px-1.5 py-px"
              onPress={() => {
                onClose();
                onPress?.();
              }}
            >
              {({ pressed }) => (
                <View
                  className={cn(
                    "h-[38px] flex-row items-center gap-2 rounded-xl border px-2.5",
                    pressed
                      ? "border-brand-200 bg-white/60 dark:border-brand-300 dark:bg-snow-300/[0.04]"
                      : "border-transparent"
                  )}
                >
                  <Icon
                    width={16}
                    height={16}
                    className={
                      pressed
                        ? "text-ink-500 dark:text-snow-600"
                        : "text-ink-400 dark:text-grey-100"
                    }
                  />
                  <Text
                    className={cn(
                      "flex-1 font-display-regular text-sm leading-5",
                      pressed
                        ? "text-ink-500 dark:text-snow-600"
                        : "text-ink-400 dark:text-grey-100"
                    )}
                    style={{ letterSpacing: -0.084 }}
                  >
                    {label}
                  </Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      ) : null}
    </Modal>
  );
}
