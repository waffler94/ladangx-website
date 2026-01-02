'use client'
import AuthInput from '@/components/auth/auth-input'
import DateInput from '@/components/auth/date-input'
import PasswordInput from '@/components/auth/password-input'
import PhoneInput from '@/components/auth/phone-input'
import SubmitButton from '@/components/auth/submit-btn'
import { Checkbox } from '@/components/ui/checkbox'
import { Link, useRouter } from '@/i18n/navigation'
import { requestRegisterOtp } from '@/lib/actions'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function page() {
    const [disableSubmit, setDisableSubmit] = React.useState(false)
    const [errors, setErrors] = React.useState({})
    const router = useRouter()
    const t = useTranslations()

    const submitHandler = async (e) => {
        e.preventDefault()
        setErrors({})
        setDisableSubmit(true)
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        const res = await requestRegisterOtp({
            calling_code: data.calling_code,
            phone_number: data.phone_number,
            email: data.email,
            fullname: data.fullname,
            password: data.password,
            password_confirmation: data.confirm_password
        })
        if (res.status === 422) {
            setErrors(res.errors)
        } else if (res.status === 200) {
            //redirect to otp page
            console.log(res)
            localStorage.setItem("register_phone_number", data.phone_number)
            localStorage.setItem("register_calling_code", data.calling_code)
            localStorage.setItem("register_email", data.email)
            localStorage.setItem("register_fullname", data.fullname)
            localStorage.setItem("register_password", data.password)
            localStorage.setItem("register_password_confirmation", data.confirm_password)
            localStorage.setItem("register_dob", data.date_of_birth)
            localStorage.setItem("register_identifier", res.data.identifier)
            router.push("/otp/register")
        }
        setDisableSubmit(false)
    }
    return (
        <div className="px-4 pt-6 pb-10">

            <form onSubmit={submitHandler} className="gap-y-[12px] flex flex-col">
                <AuthInput label={t("full_name")} type="text" placeholder={t("enter_fullname")} inputName="fullname" error={errors.fullname} />
                <AuthInput label={t("email")} type="email" placeholder={t("enter_email")} inputName="email" error={errors.email} />
                <PhoneInput label={t("phone_number")} type="text" placeholder={t("enter_phone")} inputName="phone_number" error={errors.phone_number} />
                <DateInput label={t("date_of_birth")} placeholder={t("select_date")} inputName="date_of_birth" />
                <PasswordInput inputName={"password"} label={t("password")} placeholder={t("enter_password")} error={errors.password} />
                <PasswordInput inputName={"confirm_password"} label={t("confirm_password")} placeholder={t("enter_password")} error={errors.password} />
                <div className="flex items-center gap-x-2">
                    <Checkbox id="agree_terms" className="data-[state=checked]:bg-[#446A2A]" required />
                    <label htmlFor="agree_terms">{t("agree_to")} <Link href="#" className="text-[#446A2A] underline">{t("terms")}</Link></label>

                </div>
                <div className="pb-2 py-1 pl-1 pr-3 w-full group  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">
                    <SubmitButton isDisabled={disableSubmit} >
                        {t("register")}
                    </SubmitButton>
                </div>

            </form>
            <div className='text-center mt-[16px] font-medium hover:underline'>
                <Link href="/">
                    {t("continue_guest")}
                </Link>
            </div>




        </div>
    )
}
