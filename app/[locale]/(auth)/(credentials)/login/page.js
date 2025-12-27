'use client'
import AuthInput from '@/components/auth/auth-input'
import PasswordInput from '@/components/auth/password-input'
import PhoneInput from '@/components/auth/phone-input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Link, useRouter } from '@/i18n/navigation'
import { login } from '@/lib/actions'
import Cookies from 'js-cookie'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function page() {
    const t = useTranslations()
    const [errors, setErrors] = React.useState([])
    const router = useRouter();
    const submitHandler = async (e) => {
        e.preventDefault();
        setErrors({})
        // get all input values
        const formData = new FormData(e.target);
        const phoneNumber = formData.get('phone_number');
        const password = formData.get('password');
        const calling_code = formData.get('calling_code');

        const res = await login({
            phone_number: phoneNumber,
            password: password,
            calling_code: calling_code
        })
        console.log(res)
        if (res.status === 422) {
            setErrors(res.errors);
        }


        if (res.status === 200) {
            Cookies.set('access_token', res.data.token);
            router.push('/')
        }


    }
    return (
        <div className="px-4 pt-6 pb-10 flex flex-col">
            <form onSubmit={submitHandler} className=" gap-y-[12px] flex flex-col">
                <PhoneInput error={errors?.account} />
                <PasswordInput inputName={"password"} label={t("password")} placeholder={t("enter_password")} error={errors?.account} />
                <Link href="/forgot-password" className="text-[#245B00] ml-auto font-semibold hover:underline">
                    {t("forgot_password")}
                </Link>
                <div className="mt-[20px]">
                    <div className="py-2 pl-1 pr-2 w-full group  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">


                        <button
                            type="submit"
                            className="w-full group-hover:scale-105 transition-all  flex justify-center font-bold py-3 px-4 rounded-full shadow-[4px_4px_0px_0px_rgba(57,83,39,1)]  text-white bg-[#446A2A] "
                        >
                            {t("login")}
                        </button>
                    </div>

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
