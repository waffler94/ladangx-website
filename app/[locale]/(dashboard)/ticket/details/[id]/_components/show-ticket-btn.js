'use client'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function ShowTicketButton() {
    const t = useTranslations()

    return (
        <button className=" bg-white   text-[#446A2A] font-semibold py-3 underline  transition-colors">
            {t('show_ticket')}
        </button>
    )
}
