'use client'
import AuthInput from '@/components/auth/auth-input'
import DateInput from '@/components/auth/date-input'
import PasswordInput from '@/components/auth/password-input'
import PhoneInput from '@/components/auth/phone-input'
import SubmitButton from '@/components/auth/submit-btn'
import { Checkbox } from '@/components/ui/checkbox'
import { Link } from '@/i18n/navigation'
import { requestRegisterOtp } from '@/lib/actions'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function page() {
    const [disableSubmit, setDisableSubmit] = React.useState(false)
    const [errors, setErrors] = React.useState({})
    const t = useTranslations()
    const submitHandler = async (e) => {
        e.preventDefault()
        setDisableSubmit(true)
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        console.log(data)
        const res = await requestRegisterOtp({
            calling_code: data.calling_code,
            phone_number: data.phone_number,
            fullname: data.fullname,
            password: data.password,
            password_confirmation: data.confirm_password
        })
        console.log(res)
        if (res.status === 422) {
            setErrors(res.errors)
        }
        setDisableSubmit(false)
    }
    return (
        <div className="px-4 pt-6 pb-10">
            <form onSubmit={submitHandler} className="gap-y-[12px] flex flex-col">
                <AuthInput label={t("full_name")} type="text" placeholder={t("enter_fullname")} inputName="fullname" error={errors.fullname} />
                <AuthInput label={t("email")} type="email" placeholder={t("enter_email")} inputName="email" error={errors.email} required={true} />
                <PhoneInput label={t("phone_number")} type="text" placeholder={t("enter_phone")} inputName="phone_number" error={errors.phone_number} />
                <DateInput label={t("date_of_birth")} placeholder={t("select_date")} inputName="date_of_birth" />
                <PasswordInput inputName={"password"} label={t("password")} placeholder={t("enter_password")} error={errors.password} />
                <PasswordInput inputName={"confirm_password"} label={t("confirm_password")} placeholder={t("enter_password")} error={errors.password} />
                <div className="flex items-center gap-x-2">
                    <Checkbox id="agree_terms" className="data-[state=checked]:bg-[#446A2A]" required />
                    <label htmlFor="agree_terms">{t("agree_to")} <Link href="#" className="text-[#446A2A] underline">{t("terms")}</Link></label>

                </div>
                <div className="py-2 pl-1 pr-3 w-full group  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">
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
