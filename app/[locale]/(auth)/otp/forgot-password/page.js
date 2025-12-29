'use client'
import VerificationPage from '@/components/auth/verification-page'
import { PopupContext } from '@/components/context/PopupProvider'
import { useRouter } from '@/i18n/navigation'
import { register, resendForgotPasswordOtp, resendRegisterOtp, verifyForgotPasswordOtp } from '@/lib/actions'
import { useTranslations } from 'next-intl'
import React, { useContext, useEffect } from 'react'

export default function page() {
    const [phoneNumber, setPhoneNumber] = React.useState()
    const [errors, setErrors] = React.useState({})
    const { openSuccessModal, openFailModal, closeAllModal } = useContext(PopupContext)
    const t = useTranslations()
    const router = useRouter()
    useEffect(() => {
        //get phone number from url param
        localStorage.getItem("forgot_password_phone_number")
        localStorage.getItem("forgot_password_calling_code")
        setPhoneNumber(localStorage.getItem("forgot_password_calling_code") + localStorage.getItem("forgot_password_phone_number"))
    }, [])
    const onSubmit = async (e) => {
        console.log(e)
        setErrors({})
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        const res = await verifyForgotPasswordOtp({
            identifier: localStorage.getItem("forgot_password_identifier"),
            otp_code: data.otp

        })
        console.log(res)
        if (res.status == 422) {
            setErrors(res.errors)
        } else if (res.status == 400) {
            openFailModal({
                title: t("error"),
                description: res.message,
                buttonText: t("try_again"),
                buttonOnClick: () => {
                    closeAllModal()
                },

            })
        }
        else if (res.status == 200) {
            localStorage.setItem("forgot_password_otp_code", data.otp)
            router.push("/otp/forgot-password/reset")
        }


    }

    const onResend = async () => {
        const res = await resendForgotPasswordOtp({
            identifier: localStorage.getItem("forgot_password_identifier")
        })
        console.log(res)
        if (res.status != 200) {
            console.log(res)
        }
    }


    return (
        <VerificationPage init_phone_number={phoneNumber} onSubmit={onSubmit} errors={errors} onResend={onResend} />
    )
}
