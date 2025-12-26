'use client'
import SubmitButton from '@/components/auth/submit-btn'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Link } from '@/i18n/navigation'
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function VerificationPage({ onSubmit, init_phone_number, errors }) {
    const t = useTranslations()
    const [disableSubmit, setDisableSubmit] = React.useState(false)
    const submitHandler = async (e) => {
        e.preventDefault()
        setDisableSubmit(true)
        await onSubmit(e)
        setDisableSubmit(false)
    }
    return (
        <div className="bg-[#F5FEBB] min-h-screen pt-[17px] px-4 ">
            <Link href="/login" className="rounded-full size-[40px] bg-[#245B00] hover:scale-110 transition-all  items-center justify-center flex border-white border-[3px] shadow-[0px_4px_0px_0px_rgba(57,83,39,1)] ">
                <ChevronLeft className="text-[24px] text-white bg-[#245B00] " />
            </Link>
            <div className="mt-[32px]">
                <h1 className="text-[19px] font-bold mb-[4px]">{t("verification_code")}</h1>
                <p>
                    {t("enter_verification_code_sent")} <span className="font-bold">{init_phone_number}</span>
                </p>
            </div>
            <form onSubmit={submitHandler}>
                <div className="mt-[27px] flex flex-col">
                    <label className="font-bold mb-[8px] block">{t("code")}</label>
                    <div className="flex flex-col w-full ">


                        <InputOTP name="otp" maxLength={6} pattern={REGEXP_ONLY_DIGITS} className="">
                            <InputOTPGroup className="w-[95vw] flex flex-row justify-between">
                                {
                                    Array.from({ length: 6 }).map((_, index) =>
                                        <InputOTPSlot className={`size-[13vw] bg-white rounded-[6px] border  ${(errors?.identifier || errors?.otp_code) ? "border-red-500" : "border-[#CFDDCF]"}`} key={index} index={index} />
                                    )
                                }
                            </InputOTPGroup>

                        </InputOTP>
                        {(errors?.identifier || errors?.otp_code) ? <p className="text-red-500 text-sm mt-1">{(errors?.identifier?.[0] || errors?.otp_code?.[0])}</p> : null}
                    </div>
                    <div className="py-2 pl-1 pr-3 w-full group bg-white mt-[24px]  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">

                        <SubmitButton isDisabled={disableSubmit}  >
                            {t("submit")}
                        </SubmitButton>
                    </div>
                    <button className="font-semibold mx-auto mt-[16px] text-center">
                        {t("resend_code")}
                    </button>

                </div>
            </form>
        </div>
    )
}
