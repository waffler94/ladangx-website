'use client'
import BackButton from '@/components/back-button'
import { Link, usePathname } from '@/i18n/navigation'
import { useTranslations } from 'next-intl';
import React from 'react'

export default function layout({ children }) {
    const t = useTranslations();
    const pathname = usePathname();
    return (
        <div className="bg-[url('/images/bg17-additional_pages.png')] bg-cover min-h-screen pt-safe px-4 relative ">
            <div className="flex flex-row items-center justify-center">
                <Link className="absolute left-4" href="/profile">
                    <BackButton />
                </Link>
                <h1 className="text-[22px] font-semibold">{pathname.includes('terms') ? t('terms_and_conditions') : t('privacy_policy')}</h1>
                <div />
            </div>

            <div className="mt-[31px]">
                {children}

            </div>
        </div>
    )
}
