'use client'
import React, { useEffect } from 'react'

export default function layout({ children }) {
    useEffect(() => {
        if (!localStorage.getItem("register_phone_number")) {
            router.push("/register")
        }
    })
    return (
        <>{children}</>
    )
}
