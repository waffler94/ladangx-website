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
    const [formData, setFormData] = React.useState({
        fullname: '',
        email: '',
        phone_number: '',
        calling_code: '+95',
        date_of_birth: '',
        password: '',
        confirm_password: ''
    })
    const router = useRouter()
    const t = useTranslations()

    // Restore saved form data when component mounts
    React.useEffect(() => {
        const savedData = localStorage.getItem('register_form_temp')
        if (savedData) {
            const parsed = JSON.parse(savedData)
            setFormData(parsed)

            // Inject values into form inputs
            if (parsed.fullname) {
                const fullnameInput = document.querySelector('input[name="fullname"]')
                if (fullnameInput) fullnameInput.value = parsed.fullname
            }
            if (parsed.email) {
                const emailInput = document.querySelector('input[name="email"]')
                if (emailInput) emailInput.value = parsed.email
            }
            if (parsed.phone_number) {
                const phoneInput = document.querySelector('input[name="phone_number"]')
                if (phoneInput) phoneInput.value = parsed.phone_number
            }
            if (parsed.calling_code) {
                const callingCodeInput = document.querySelector('input[name="calling_code"]')
                if (callingCodeInput) callingCodeInput.value = parsed.calling_code
            }
            if (parsed.date_of_birth) {
                const dobInput = document.querySelector('input[name="date_of_birth"]')
                if (dobInput) dobInput.value = parsed.date_of_birth
            }
            if (parsed.password) {
                const passwordInput = document.querySelector('input[name="password"]')
                if (passwordInput) passwordInput.value = parsed.password
            }
            if (parsed.confirm_password) {
                const confirmPasswordInput = document.querySelector('input[name="confirm_password"]')
                if (confirmPasswordInput) confirmPasswordInput.value = parsed.confirm_password
            }

            // Remove the temporary saved data after restoring
            localStorage.removeItem('register_form_temp')
        }
    }, [])

    const handleTermsClick = () => {
        // Save current form data
        const form = document.querySelector('form')
        const formDataObj = new FormData(form)
        const data = {
            fullname: formDataObj.get('fullname') || '',
            email: formDataObj.get('email') || '',
            phone_number: formDataObj.get('phone_number') || '',
            calling_code: formDataObj.get('calling_code') || '+95',
            date_of_birth: formDataObj.get('date_of_birth') || '',
            password: formDataObj.get('password') || '',
            confirm_password: formDataObj.get('confirm_password') || ''
        }
        localStorage.setItem('register_form_temp', JSON.stringify(data))
        router.push('/documents/terms')
    }

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
        <div className="px-4 pt-6 pb-10 bg-white pt-safe">
            <form onSubmit={submitHandler} className="gap-y-[12px] flex flex-col">
                <AuthInput label={t("full_name")} type="text" placeholder={t("enter_fullname")} inputName="fullname" error={errors.fullname} />
                <AuthInput label={t("email")} type="email" placeholder={t("enter_email")} inputName="email" error={errors.email} />
                <PhoneInput label={t("phone_number")} type="text" placeholder={t("enter_phone")} inputName="phone_number" error={errors.phone_number} />
                <DateInput label={t("date_of_birth")} placeholder={t("select_date")} inputName="date_of_birth" />
                <PasswordInput inputName={"password"} label={t("password")} placeholder={t("enter_password")} error={errors.password} />
                <PasswordInput inputName={"confirm_password"} label={t("confirm_password")} placeholder={t("enter_password")} error={errors.password} />
                <div className="flex items-center gap-x-2">
                    <Checkbox id="agree_terms" className="data-[state=checked]:bg-[#446A2A]" required />
                    <label htmlFor="agree_terms">{t("agree_to")} <button type="button" onClick={handleTermsClick} className="text-[#446A2A] underline">{t("terms")}</button></label>

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
