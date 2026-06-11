'use client'
import BackButton from '@/components/back-button'
import { Link, usePathname } from '@/i18n/navigation'
import { useTranslations } from 'next-intl';
import React from 'react'

export default function layout({ children }) {
    const t = useTranslations();
    const pathname = usePathname();
    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="fixed inset-0 z-0 bg-[url('/images/bg17-additional_pages.png')] bg-cover bg-bottom" />
            <div className="relative z-10 min-h-screen pt-safe px-4">
                <div className="flex flex-row items-center justify-center">
                    <button className="absolute left-4" onClick={() => window.history.back()}>
                        <BackButton />

                    </button>
                    <h1 className="text-[22px] font-semibold">{pathname.includes('terms') ? t('terms_and_conditions') : t('privacy_policy')}</h1>
                    <div />
                </div>

                <div className="mt-[31px]">
                    {children}

                </div>
            </div>
        </div>
    )
}
