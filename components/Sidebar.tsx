"use client";

import { ModulesConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = Object.values(ModulesConfig);

export default function Sidebar() {
  const pathName = usePathname();

  return (
    <div className="px-3 py-2 flex-1">
      <Link href="/dashboard" className="flex items-center pl-3 mb-14">
        <div className="relative w-8 h-8 mr-4">
          <Image fill alt="Logo" src="/logo.png" />
        </div>
        <h1 className={cn("text-2xl font-bold", montserrat.className)}>
          Genius
        </h1>
      </Link>
      <div className="space-y-1">
        {routes.map((route) => {
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointerhover:text-white hover:bg-white/10 rounded-lg transition",
                pathName === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3 ", route.color)} />
                {route.label}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
