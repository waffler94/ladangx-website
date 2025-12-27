'use client'
import PasswordInput from '@/components/auth/password-input'
import SubmitButton from '@/components/auth/submit-btn'
import { PopupContext } from '@/components/context/PopupProvider'
import { Link, useRouter } from '@/i18n/navigation'
import { resetPassword } from '@/lib/actions'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { useContext } from 'react'

export default function page() {
    const [errors, setErrors] = React.useState({})
    const [disableSubmit, setDisableSubmit] = React.useState(false)
    const router = useRouter()

    const { openSuccessModal, openFailModal, closeAllModal } = useContext(PopupContext)
    const t = useTranslations()
    const submitHandler = async (e) => {
        e.preventDefault()
        setDisableSubmit(true)
        setErrors({})
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        console.log(data)

        const res = await resetPassword({
            phone_number: localStorage.getItem("forgot_password_phone_number"),
            identifier: localStorage.getItem("forgot_password_identifier"),
            password: data.new_password,
            password_confirmation: data.new_password_confirmation,
            otp_code: localStorage.getItem("forgot_password_otp_code")

        })
        if (res.status == 422) {
            setErrors(res.errors)
        } else if (res.status == 200) {
            //clear all forgot password related localstorage
            localStorage.removeItem("forgot_password_phone_number")
            localStorage.removeItem("forgot_password_identifier")
            localStorage.removeItem("forgot_password_otp_code")
            //redirect to login
            openSuccessModal({
                title: t("reset_password"),
                description: t("your_password_has_been_reset"),
                buttonText: t("proceed_to_login"),
                buttonOnClick: () => {
                    closeAllModal()
                }
            })
            router.push("/login")

        }
        console.log(res)
        setDisableSubmit(false)
    }
    return (
        <div className="bg-[#F5FEBB] min-h-screen pt-[17px] px-4 ">
            <Link href="/login" className="rounded-full size-[40px] bg-[#245B00] hover:scale-110 transition-all  items-center justify-center flex border-white border-[3px] shadow-[0px_4px_0px_0px_rgba(57,83,39,1)] ">
                <ChevronLeft className="text-[24px] text-white bg-[#245B00] " />
            </Link>
            <div className="mt-[32px]">
                <h1 className="text-[19px] font-bold mb-[4px]">{t("reset_password")}</h1>
                <p className="text-[#60756E]">
                    {t("please_enter_new_password")}
                </p>
            </div>
            <form onSubmit={submitHandler}>
                <div className="mt-[27px] flex flex-col gap-y-[24px]">
                    <PasswordInput inputName={"new_password"} label={t("new_password")} placeholder={t("enter_new_password")} error={errors.password} />
                    <PasswordInput inputName={"new_password_confirmation"} label={t("confirm_new_password")} placeholder={t("enter_new_password")} error={errors.password} />
                    <div className="pb-2 py-1 pl-1 pr-3 w-full group bg-white mt-[24px]  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">

                        <SubmitButton isDisabled={disableSubmit}  >
                            {t("submit")}
                        </SubmitButton>
                    </div>


                </div>
            </form>
        </div>
    )
}
