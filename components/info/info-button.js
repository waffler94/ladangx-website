'use client'
import React, { useContext } from 'react'
import { modalList, PopupContext } from '../context/PopupProvider'
import { Info } from 'lucide-react'
import Image from 'next/image'

export default function InfoButton() {
    const { openModal, closeAllModal } = useContext(PopupContext)

    return (
        <button onClick={() => { openModal(modalList.ticketInfo.key) }} className="  flex items-center justify-center">
            <Image src="/images/image10-info1.png" width={400} height={392} className="size-[50px]" alt="Info" />
        </button>
    )
}
