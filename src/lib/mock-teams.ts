import type { AvatarName } from "@/lib/avatars";
import { gradients } from "@/lib/gradients";

export type Member = { name: string; email: string; avatar: AvatarName };

export type Gradient = {
  colors: readonly [string, string];
  start: { x: number; y: number };
  end: { x: number; y: number };
};

export type Team = {
  id: string;
  name: string;
  author: string;
  description: string;
  gradient: Gradient;
  admin: Member;
  members: Member[];
};

const admin: Member = {
  name: "Mark Burghschent",
  email: "markburg@gmail.com",
  avatar: "enzo",
};

export const TEAMS: Team[] = [
  {
    id: "content-studio",
    name: "Content Studio",
    author: "Winter Aconite",
    description:
      "Plan, create, and manage all blog posts, social media content, and multimedia assets together.",
    gradient: gradients.linear06,
    admin,
    members: [
      {
        name: "Andrew Michael Smith",
        email: "andrew.michael.smith@gmail.com",
        avatar: "nina",
      },
      {
        name: "Jennifer Williams",
        email: "jenniferwilliams@gmail.com",
        avatar: "zack",
      },
      {
        name: "Nathan Robert Anderson",
        email: "nathanrobertanderson@gmail.com",
        avatar: "cleo",
      },
    ],
  },
  {
    id: "nero-project",
    name: "Weekly Meet - Nero Project",
    author: "Winter Aconite",
    description:
      "Keep everyone aligned with the latest updates, goals, and outcomes from this week’s Nero Project meet.",
    gradient: gradients.linear03,
    admin,
    members: [
      { name: "Axel Brooks", email: "axelbrooks@gmail.com", avatar: "axel" },
      {
        name: "Freya Lindqvist",
        email: "freyalindqvist@gmail.com",
        avatar: "freya",
      },
    ],
  },
  {
    id: "kuaci-rebus",
    name: "Kuaci Rebus",
    author: "Winter Aconite",
    description: "Aliens room-",
    gradient: gradients.linear08,
    admin,
    members: [
      { name: "Kai Tanaka", email: "kaitanaka@gmail.com", avatar: "kai" },
      { name: "Luca Moretti", email: "lucamoretti@gmail.com", avatar: "luca" },
    ],
  },
];
