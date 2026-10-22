export type Status = "ongoing" | "upcoming" | "last";

export type Meeting = {
  id: string;
  name: string;
  date: string; // yyyy-mm-dd, local
  start: number; // minutes from midnight
  duration: number; // minutes
  timezone: string;
  repeat: string;
  invitees: string[];
  passcode: string;
  usePersonalId: boolean;
  requireId: boolean;
  waitingRoom: boolean;
};

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const pad = (n: number) => String(n).padStart(2, "0");

export const toKey = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const keyToDate = (key: string) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const addDays = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

export const getWeek = (d: Date) =>
  Array.from({ length: 7 }, (_, i) => addDays(d, i - d.getDay()));

export const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const formatLongDate = (key: string) => {
  const d = keyToDate(key);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

export const formatTime = (minutes: number) => {
  const m = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  return `${pad(h % 12 || 12)}:${pad(m % 60)} ${h >= 12 ? "PM" : "AM"}`;
};

export const formatDateInput = (raw: string) => {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)]
    .filter(Boolean)
    .join("/");
};

export const parseDateInput = (value: string) => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return null;
  const [d, m, y] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const date = new Date(y, m - 1, d);
  return date.getMonth() === m - 1 && date.getDate() === d ? date : null;
};

export const getStatus = (meeting: Meeting, now = new Date()): Status => {
  const [y, m, d] = meeting.date.split("-").map(Number);
  const start = new Date(y, m - 1, d, 0, meeting.start).getTime();
  const end = start + meeting.duration * 60000;
  const t = now.getTime();
  return t < start ? "upcoming" : t < end ? "ongoing" : "last";
};

export const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => ({
  label: formatTime(i * 30),
  value: String(i * 30),
}));

export const DURATIONS = [
  { label: "15 minutes", value: "15" },
  { label: "30 minutes", value: "30" },
  { label: "45 minutes", value: "45" },
  { label: "1 hour", value: "60" },
  { label: "1 hour 30 minutes", value: "90" },
  { label: "2 hours", value: "120" },
];

export const TIMEZONES = [
  { label: "Pacific Time (UTC -08:00)", value: "pt" },
  { label: "Eastern Time (UTC -05:00)", value: "et" },
  { label: "Coordinated Universal Time (UTC +00:00)", value: "utc" },
  { label: "West Africa Time (UTC +01:00)", value: "wat" },
];

export const REPEATS = [
  { label: "Does not repeat", value: "Does not repeat" },
  { label: "Daily", value: "Daily" },
  { label: "Weekly", value: "Weekly" },
  { label: "Monthly", value: "Monthly" },
];
