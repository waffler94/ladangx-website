'use client'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function ShowTicketButton() {
    const t = useTranslations()
    const showTicketHandler = () => {
        console.log('show ticket')
    }
    return (
        <button onClick={showTicketHandler} className=" bg-white   text-[#446A2A] font-semibold py-3 underline  transition-colors">
            {t('show_ticket')}
        </button>
    )
}
