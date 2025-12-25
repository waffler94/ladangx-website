import AuthInput from '@/components/auth/auth-input'
import DateInput from '@/components/auth/date-input'
import PasswordInput from '@/components/auth/password-input'
import PhoneInput from '@/components/auth/phone-input'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function page() {
    const t = useTranslations()
    return (
        <div className="px-4 pt-6 pb-10">
            <form className="gap-y-[12px] flex flex-col">
                <AuthInput label={t("full_name")} type="text" placeholder={t("enter_first_name")} inputName="first_name" />
                <AuthInput label={t("email")} type="text" placeholder={t("enter_email")} inputName="email" />
                <PhoneInput label={t("phone_number")} type="text" placeholder={t("enter_phone")} inputName="phone_number" />
                <DateInput label={t("date_of_birth")} placeholder={t("select_date")} inputName="date_of_birth" />
                <PasswordInput inputName={"password"} label={t("password")} placeholder={t("enter_password")} />
                <PasswordInput inputName={"confirm_password"} label={t("confirm_password")} placeholder={t("enter_password")} />
                <button
                    type="submit"
                    className="w-full hover:scale-105 transition-all mt-[24px]  flex justify-center font-bold py-3 px-4 rounded-full shadow-[4px_4px_0px_0px_rgba(57,83,39,1)]  text-white bg-[#446A2A] "
                >
                    {t("register")}
                </button>

            </form>
            <div className='text-center mt-[16px] font-medium hover:underline'>
                <Link href="/">
                    {t("continue_guest")}

                </Link>
            </div>




        </div>
    )
}
