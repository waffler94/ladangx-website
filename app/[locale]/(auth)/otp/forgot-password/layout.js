'use client'
import { useRouter } from '@/i18n/navigation'
import React, { useEffect } from 'react'

export default function layout({ children }) {
    const router = useRouter()
    useEffect(() => {
        if (!localStorage.getItem("forgot_password_phone_number")) {
            router.push("/login")
        }
    })
    return (
        <>{children}</>
    )
}
