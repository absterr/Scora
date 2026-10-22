import { BlurTargetView } from "expo-blur";
import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { View } from "react-native";

type Host = {
  targetRef: RefObject<View | null>;
  show: (id: string, node: ReactNode) => void;
  hide: (id: string) => void;
};

type Entry = { id: string; node: ReactNode };

const HostContext = createContext<Host | null>(null);

export const useModalHost = () => {
  const host = useContext(HostContext);
  if (!host) throw new Error("Modal must be rendered inside ModalProvider");
  return host;
};

export default function ModalProvider({ children }: { children: ReactNode }) {
  const targetRef = useRef<View>(null);
  const [entries, setEntries] = useState<Entry[]>([]);

  const host = useMemo<Host>(
    () => ({
      targetRef,
      show: (id, node) =>
        setEntries((prev) =>
          prev.some((e) => e.id === id)
            ? prev.map((e) => (e.id === id ? { id, node } : e))
            : [...prev, { id, node }]
        ),
      hide: (id) => setEntries((prev) => prev.filter((e) => e.id !== id)),
    }),
    []
  );

  return (
    <HostContext.Provider value={host}>
      <View className="flex-1">
        <BlurTargetView ref={targetRef} style={{ flex: 1 }}>
          {children}
        </BlurTargetView>
        {entries.map((e) => (
          <View key={e.id} className="absolute inset-0">
            {e.node}
          </View>
        ))}
      </View>
    </HostContext.Provider>
  );
}
