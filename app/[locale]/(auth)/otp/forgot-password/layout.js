'use client'
import React, { useEffect } from 'react'

export default function layout({ children }) {
    useEffect(() => {
        if (!localStorage.getItem("forgot_password_phone_number")) {
            router.push("/login")
        }
    })
    return (
        <>{children}</>
    )
}
