'use client';
import { usePathname } from '@/i18n/navigation';
import { Bell, Home, ShoppingCart, Smile } from 'lucide-react'
import React from 'react'

export default function BottomNavBar() {
    const pathname = usePathname();
    return (
        <>
            <div className="h-[100px]">

            </div>
            <div className="fixed bottom-0 w-full h-[100px] rounded-t-[20px] grid gap-x-[18px] py-[16px] px-[20px] bg-white grid-cols-4 ">
                {
                    [
                        {
                            icon: <Home size={30} className="text-white" />,
                            href: "/home",
                            activeClassName: "bg-[#D23535] shadow-[0px_2px_0px_rgba(181,19,19,1)]",
                            className: "bg-red-500 shadow-[0px_4px_0px_rgba(181,19,19,1)]"
                        },
                        {
                            icon: <ShoppingCart size={30} className="text-white" />,
                            href: "#",
                            activeClassName: "bg-[#46849D] shadow-[0px_2px_0px_rgba(41,98,121,1)]",
                            className: "bg-[#76BFDC] shadow-[0px_4px_0px_rgba(70,166,204,1)]"
                        },
                        {
                            icon: <Bell size={30} className="text-white" />,
                            href: "#",
                            activeClassName: "bg-[#D5980C] shadow-[0px_2px_0px_rgba(167,88,15,1)]",
                            className: "bg-[#FFBE29] shadow-[0px_4px_0px_rgba(255,132,19,1)]"
                        },
                        {
                            icon: <Smile size={30} className="text-white" />,
                            href: "#",
                            activeClassName: "bg-[#4E6D31] shadow-[0px_2px_0px_rgba(55,78,34,1)]",
                            className: "bg-[#79A74E] shadow-[0px_4px_0px_rgba(104,143,68,1)]"
                        },
                    ].map((item, index) => {
                        const isActive = pathname.includes(item.href);

                        return (
                            <div key={index} className={`size-full   rounded-[16px] flex items-center justify-center transition-all cursor-pointer ${!isActive && "hover:translate-y-1 hover:shadow-none"} ${isActive ? item.activeClassName : item.className} `}>
                                {item.icon}
                            </div>
                        )
                    })
                }



            </div>
        </>

    )
}
