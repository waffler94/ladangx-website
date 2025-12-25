'use client'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Link } from '@/i18n/navigation'
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function page() {
    const t = useTranslations()
    const [init_phone_number, setInitPhoneNumber] = React.useState('+60 12-3456789')
    return (
        <div className="bg-[#F5FEBB] min-h-screen pt-[17px] px-4 ">
            <Link href="/login" className="rounded-full size-[40px] bg-[#245B00] hover:scale-110 transition-all  items-center justify-center flex border-white border-[3px] shadow-[0px_4px_0px_0px_rgba(57,83,39,1)] ">
                <ChevronLeft className="text-[24px] text-white bg-[#245B00] " />
            </Link>
            <div>
                <h1 className="text-[19px] font-bold mb-[4px]">{t("verification_code")}</h1>
                <p>
                    {t("enter_verification_code_sent")} <span className="font-bold">{init_phone_number}</span>
                </p>
            </div>
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                {
                    Array.from({ length: 6 }).map((_, index) =>
                        <InputOTPSlot className="size-[50px] bg-white rounded-[6px] border border-[#CFDDCF]" key={index} index={index} />
                    )
                }


            </InputOTP>
        </div>
    )
}
