'use client'

import BackButton from '@/components/back-button'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export default function BackBtn() {
    const router = useRouter()
    const handleBack = () => {
        const isFromCheckout = Cookies.get('isFromCheckout');
        if (isFromCheckout === 'true') {
            Cookies.remove('isFromCheckout');
            router.push('/');
        } else {
            router.back();
        }

    }

    return (
        <button onClick={handleBack} className="absolute left-4">
            <BackButton />
        </button>
    )
}
