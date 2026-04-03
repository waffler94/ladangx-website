'use client'
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import Spinner from '@/components/spinner'
import { useRouter } from '@/i18n/navigation'

export default function Page() {
    const t = useTranslations()
    const searchParams = useSearchParams()
    const rawUrl = searchParams.get('url')
    const paymentUrl = rawUrl ? decodeURIComponent(rawUrl) : null
    const router = useRouter()
    useEffect(() => {
        if (paymentUrl) {
            window.open(paymentUrl, '_blank')
        } else {
            router.push('/')
        }



    }, [paymentUrl])

    return (
        <div className="flex flex-col items-center justify-center h-[100dvh] bg-[url('/images/bg4-home.png')] bg-cover bg-bottom pt-safe gap-y-[16px]">
            {paymentUrl ? (
                <>
                    <Spinner size={40} color="#446A2A" />
                    <p className="text-[#313F3A] font-semibold text-[16px]">{t('redirecting_to_payment')}</p>
                    <a href={paymentUrl} target="_blank" rel="noopener noreferrer" className="text-[#446A2A] underline">
                        {t('click_here_if_not_redirected')}
                    </a>
                </>
            ) : (
                <Spinner size={40} color="#446A2A" />
            )}
        </div>
    )
}

