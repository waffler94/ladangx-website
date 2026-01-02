'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function CredLinks() {
    const t = useTranslations()
    const pathname = usePathname()

    // Check if current path contains login or register
    const isLoginPage = pathname.includes('/login')
    const isRegisterPage = pathname.includes('/register')

    return (
        <div className="grid grid-cols-2 gap-2 bg-gray-200 rounded-full p-[8px] w-full">
            <Link
                href="/login"
                className={` py-2 text-center rounded-full transition-all ${isLoginPage
                    ? 'bg-white text-[#313F3A] font-semibold shadow-sm'
                    : 'bg-transparent text-gray-500'
                    }`}
            >
                {t("login")}
            </Link>
            <Link
                href="/register"
                className={` py-2 text-center rounded-full transition-all ${isRegisterPage
                    ? 'bg-white text-[#313F3A] font-semibold shadow-sm'
                    : 'bg-transparent text-gray-500'
                    }`}
            >
                {t("register")}
            </Link>
        </div>
    )
}
