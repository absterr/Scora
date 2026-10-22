import { useSyncExternalStore } from "react";

export type LastMeeting = {
  name: string;
  endedAt: number;
  durationSec: number;
  participants: string[];
};

let current: LastMeeting | null = null;
const listeners = new Set<() => void>();

export const setLastMeeting = (meeting: LastMeeting) => {
  current = meeting;
  listeners.forEach((l) => l());
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const useLastMeeting = () =>
  useSyncExternalStore(subscribe, () => current);

export const formatClock = (sec: number) =>
  `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
