"use client";

import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils";
import { LayoutDashboard, MessageSquare, ImageIcon, VideoIcon, Music, Code, Settings } from 'lucide-react'
import { FreeCounter } from "./free-counter";

const montserrate = Montserrat({ 
    weight: "600", 
    subsets:["latin"] 
});

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        herf: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        herf: "/conversation",
        color: "text-violet-500",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        herf: "/image",
        color: "text-pink-700",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        herf: "/video",
        color: "text-orange-700",
    },
    {
        label: "Music Generation",
        icon: Music,
        herf: "/music",
        color: "text-emerald-500",
    },
    {
        label: "Code Generation",
        icon: Code,
        herf: "/code",
        color: "text-green-700",
    },
    {
        label: "Settings",
        icon: Settings,
        herf: "/settings",
    },
];

interface SidebarProps {
    apiLimitCount: number;
    isPro: boolean;
};

const Sidebar = ({
    apiLimitCount = 0,
    isPro = false,
}: SidebarProps) => {
    const pathname = usePathname();

    return ( 
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image
                         fill
                         alt="Logo"
                         src="/logo.png" />
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrate.className)}>
                        Genius
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            href={route.herf}
                            key={route.herf}
                            className={cn("text-sm group flex p-3 w-full       justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg     transition", 
                            pathname === route.herf ? "text-white bg-white/10" : "text-zinc-400"
                         )}
                         >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)}/>
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <FreeCounter
              isPro={isPro}
              apiLimitCount = {apiLimitCount}
            />
        </div>
     );
}
 
export default Sidebar;