import type { FC } from "react";
import type { SvgProps } from "react-native-svg";

import {
  China,
  France,
  Germany,
  Indonesia,
  Italy,
  Spain,
  UnitedKingdom,
} from "@/components/icons/flags";

export const LANGUAGES: { label: string; value: string; Icon: FC<SvgProps> }[] =
  [
    { label: "English", value: "en", Icon: UnitedKingdom },
    { label: "Spanish", value: "es", Icon: Spain },
    { label: "French", value: "fr", Icon: France },
    { label: "German", value: "de", Icon: Germany },
    { label: "Italian", value: "it", Icon: Italy },
    { label: "Chinese", value: "zh", Icon: China },
    { label: "Indonesian", value: "id", Icon: Indonesia },
  ];

// Offsets are standard time and ignore daylight saving.
export const TIME_ZONES = [
  { label: "Pacific Time", value: "America/Los_Angeles", meta: "UTC-08:00" },
  { label: "Mountain Time", value: "America/Denver", meta: "UTC-07:00" },
  { label: "Central Time", value: "America/Chicago", meta: "UTC-06:00" },
  { label: "Eastern Time", value: "America/New_York", meta: "UTC-05:00" },
  { label: "Greenwich Mean Time", value: "Europe/London", meta: "UTC+00:00" },
  { label: "West Africa Time", value: "Africa/Lagos", meta: "UTC+01:00" },
  { label: "Central European Time", value: "Europe/Paris", meta: "UTC+01:00" },
  { label: "Gulf Standard Time", value: "Asia/Dubai", meta: "UTC+04:00" },
  { label: "India Standard Time", value: "Asia/Kolkata", meta: "UTC+05:30" },
  { label: "Western Indonesia Time", value: "Asia/Jakarta", meta: "UTC+07:00" },
  { label: "Singapore Time", value: "Asia/Singapore", meta: "UTC+08:00" },
  { label: "Japan Standard Time", value: "Asia/Tokyo", meta: "UTC+09:00" },
  {
    label: "Australian Eastern Time",
    value: "Australia/Sydney",
    meta: "UTC+10:00",
  },
];
