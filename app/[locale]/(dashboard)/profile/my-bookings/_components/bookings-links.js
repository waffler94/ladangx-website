'use client'
import React from 'react'
import { Link, usePathname } from '@/i18n/navigation'

export default function BookingsLinks() {
    const pathname = usePathname()

    const links = [
        {
            label: 'Upcoming',
            href: '/profile/my-bookings/upcoming'
        },
        {
            label: 'Past',
            href: '/profile/my-bookings/past'
        }
    ]

    return (
        <div className="flex justify-around items-center w-full ">
            {links.map((link, index) => {
                const isActive = pathname === link.href

                return (
                    <Link
                        key={index}
                        href={link.href}
                        className={`pb-2 text-sm font-medium transition-colors relative ${isActive
                            ? 'text-[#446A2A]'
                            : 'text-[#60756E]'
                            }`}
                    >
                        {link.label}
                        {isActive && (
                            <span className="absolute bottom-0 left-0 w-1/3 mx-auto right-0 h-0.5 bg-[#79A74E]" />
                        )}
                    </Link>
                )
            })}
        </div>
    )
}
