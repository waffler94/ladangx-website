'use client'
import SubmitButton from '@/components/auth/submit-btn'
import VerificationPage from '@/components/auth/verification-page'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Link } from '@/i18n/navigation'
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function page() {
    const t = useTranslations()
    const [init_phone_number, setInitPhoneNumber] = React.useState('+60 12-3456789')
    const onSubmit = async (e) => {
        e.preventDefault()
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("Submitted")
    }
    return (
        <VerificationPage onSubmit={onSubmit} init_phone_number={init_phone_number} />
    )
}
