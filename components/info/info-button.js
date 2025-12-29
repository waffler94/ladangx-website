'use client'
import React, { useContext } from 'react'
import { modalList, PopupContext } from '../context/PopupProvider'
import { Info } from 'lucide-react'

export default function InfoButton() {
    const { openModal, closeAllModal } = useContext(PopupContext)

    return (
        <button onClick={() => { openModal(modalList.ticketInfo.key) }} className="size-[50px] rounded-full bg-gray-500 flex items-center justify-center">
            <Info className="text-white" size={32} />
        </button>
    )
}
