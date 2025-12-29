'use client'
import VerificationPage from '@/components/auth/verification-page'
import { PopupContext } from '@/components/context/PopupProvider'
import { useRouter } from '@/i18n/navigation'
import { register, resendRegisterOtp } from '@/lib/actions'
import Cookies from 'js-cookie'
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
        localStorage.getItem("register_phone_number")
        localStorage.getItem("register_calling_code")
        setPhoneNumber(localStorage.getItem("register_calling_code") + localStorage.getItem("register_phone_number"))

    }, [])
    const onSubmit = async (e) => {
        console.log(e)
        setErrors({})
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        const res = await register({
            calling_code: localStorage.getItem("register_calling_code"),
            phone_number: localStorage.getItem("register_phone_number"),
            identifier: localStorage.getItem("register_identifier"),
            email: localStorage.getItem("register_email"),
            fullname: localStorage.getItem("register_fullname"),
            password: localStorage.getItem("register_password"),
            password_confirmation: localStorage.getItem("register_password_confirmation"),
            date_of_birth: localStorage.getItem("register_dob").split('/').reverse().join('-'),
            otp_code: data.otp,
        })
        console.log(res)
        if (res.status == 422) {
            setErrors(res.errors)
        } else if (res.status == 200) {
            Cookies.set('access_token', res.data.token);
            openSuccessModal({
                title: t("register_success"),
                description: t("you_have_successfully_registered"),
                buttonText: t("go_to_home"),
                buttonOnClick: () => {
                    closeAllModal()
                    router.push("/home")
                },
                outsideOnClick: () => {
                    closeAllModal()
                    router.push("/home")
                }
            })
            localStorage.removeItem("register_phone_number")
            localStorage.removeItem("register_calling_code")
            localStorage.removeItem("register_email")
            localStorage.removeItem("register_fullname")
            localStorage.removeItem("register_password")
            localStorage.removeItem("register_password_confirmation")
            localStorage.removeItem("register_dob")
            localStorage.removeItem("register_identifier")
        }


    }
    const onResend = async () => {
        const res = await resendRegisterOtp({
            identifier: localStorage.getItem("register_identifier")
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
