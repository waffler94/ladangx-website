'use client'
import PhoneInput from '@/components/auth/phone-input'
import SubmitButton from '@/components/auth/submit-btn'
import VerificationPage from '@/components/auth/verification-page'
import { PopupContext } from '@/components/context/PopupProvider'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Link, useRouter } from '@/i18n/navigation'
import { requestForgotPasswordOtp } from '@/lib/actions'
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { useContext } from 'react'

export default function page() {
    const t = useTranslations()
    const [errors, setErrors] = React.useState({})
    const [disableSubmit, setDisableSubmit] = React.useState(false)
    const { openFailModal, closeAllModal } = useContext(PopupContext)
    const router = useRouter()
    const submitHandler = async (e) => {
        e.preventDefault()
        setErrors({})
        setDisableSubmit(true)
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        console.log(data)

        const res = await requestForgotPasswordOtp({
            phone_number: data.phone_number,
            calling_code: data.calling_code,
        })
        console.log(res)

        if (res.status === 422) {
            setErrors(res.errors)
        } else if (res.status === 404) {
            openFailModal({ title: t("error"), description: res.message, buttonText: t("ok"), buttonOnClick: () => { closeAllModal() } })
        } else if (res.status === 200) {
            localStorage.setItem("forgot_password_phone_number", data.phone_number)
            localStorage.setItem("forgot_password_calling_code", data.calling_code)
            localStorage.setItem("forgot_password_identifier", res.data.identifier)
            router.push("/otp/forgot-password")
        } else {
            console.log(res)
        }
        setDisableSubmit(false)
    }
    return (
        <div className="bg-[#F5FEBB] min-h-screen pt-[17px] px-4 ">
            <Link href="/login" className="rounded-full size-[40px] bg-[#245B00] hover:scale-110 transition-all  items-center justify-center flex border-white border-[3px] shadow-[0px_4px_0px_0px_rgba(57,83,39,1)] ">
                <ChevronLeft className="text-[24px] text-white bg-[#245B00] " />
            </Link>
            <div className="mt-[32px]">
                <h1 className="text-[19px] font-bold mb-[4px]">{t("forgot_password")}</h1>
                <p>
                    {t("please_enter_phone")}
                </p>
            </div>
            <form onSubmit={submitHandler}>
                <div className="mt-[27px] flex flex-col">
                    <div className="flex flex-col w-full ">

                        <PhoneInput label={t("phone_number")} type="text" placeholder={t("enter_phone")} inputName="phone_number" error={errors.phone_number} />
                    </div>
                    <div className="pb-2 py-1 pl-1 pr-3 w-full group bg-white mt-[24px]  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">

                        <SubmitButton isDisabled={disableSubmit}  >
                            {t("send_code")}
                        </SubmitButton>
                    </div>


                </div>
            </form>
        </div>
    )
}
