'use client'
import { useRouter } from '@/i18n/navigation'
import Cookies from 'js-cookie'
import React, { useContext } from 'react'
import { modalList, PopupContext } from '../context/PopupProvider'

export default function LogoutButtonWrapper({ children }) {
    const { openModal } = useContext(PopupContext);
    const handleLogout = () => {
        openModal(modalList.logout.key);

    }
    return (
        <button onClick={handleLogout}>
            {children}
        </button>
    )
}
