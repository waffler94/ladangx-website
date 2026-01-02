'use client'
import { Edit, Edit2, Globe, Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { useContext } from 'react'
import { modalList, PopupContext } from './context/PopupProvider'

export default function EditButton() {

    const t = useTranslations()
    const handleOpenLanguageModal = () => {

    }
    return (
        <button onClick={handleOpenLanguageModal} className="hover:scale-110 transition-all text-[24px] size-[40px] bg-[#446A2A] rounded-full flex border-[3px] shadow-[0px_4px_0px_0px_rgba(57,83,39,1)] border-white items-center justify-center size ml-auto hover:cursor-pointer">
            <Pencil className="text-white " size={24} />
        </button>
    )
}
