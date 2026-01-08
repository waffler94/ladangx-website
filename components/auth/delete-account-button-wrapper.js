'use client'
import { useRouter } from '@/i18n/navigation'
import Cookies from 'js-cookie'
import React, { useContext } from 'react'
import { modalList, PopupContext } from '../context/PopupProvider'

export default function DeleteAccountButtonWrapper({ children }) {
    const { openModal } = useContext(PopupContext);
    const handleDeleteAccount = () => {
        openModal(modalList.deleteAccount.key);

    }
    return (
        <button onClick={handleDeleteAccount}>
            {children}
        </button>
    )
}
