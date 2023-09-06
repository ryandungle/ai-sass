"use client";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  MusicIcon,
  Settings,
  VideoIcon,
} from "lucide-react";

const ModulesConfig = {
  dashboard: {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
  },
  conversation: {
    heading: {
      title: "Conversation",
      description: "Our most advanced conversation model.",
    },
    label: "Conversation",
    icon: MessageSquare,
    iconColor: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
    color: "text-violet-500",
  },
  image: {
    heading: {
      title: "Image Generator",
      description: "Our most advanced image model.",
    },
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  // video: {
  //   label: "Video Generation",
  //   icon: VideoIcon,
  //   href: "/video",
  //   color: "text-orange-700",
  //   bgColor: "bg-orange-700/10",
  // },
  // music: {
  //   label: "Music Generation",
  //   icon: MusicIcon,
  //   href: "/music",
  //   color: "text-emerald-700",
  //   bgColor: "bg-emerald-700/10",
  // },
  code: {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
  settings: {
    label: "Settings",
    icon: Settings,
    href: "/setting",
    color: "text-white-700",
    bgColor: "bg-white-700/10",
  },
};

export { ModulesConfig };
