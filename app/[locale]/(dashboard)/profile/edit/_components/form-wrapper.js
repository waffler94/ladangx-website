'use client'
import SubmitButton from '@/components/auth/submit-btn'
import { PopupContext } from '@/components/context/PopupProvider'
import { useRouter } from '@/i18n/navigation'
import { updateUser } from '@/lib/actions'
import { useTranslations } from 'next-intl'
import React, { useContext } from 'react'

export default function FormWrapper({ children }) {
    const t = useTranslations()
    const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(false)
    const { openSuccessModal, closeAllModal } = useContext(PopupContext);
    const router = useRouter();
    const submitHandler = async (e) => {
        e.preventDefault()
        // get the form
        setIsSubmitDisabled(true)
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        const res = await updateUser({
            fullname: data.full_name,
            email: data.email,
        })
        if (res.status == 200) {
            openSuccessModal({
                title: t("success"),
                description: res.message,
                buttonText: t("ok"),
                buttonOnClick: () => { closeAllModal(); router.push('/profile') },
                outsideOnClick: () => { }

            })
        }
        setIsSubmitDisabled(false)
    }
    return (
        <form className="space-y-[24px]" onSubmit={submitHandler}>
            {children}
            <div className="pb-2 py-1 pl-1 pr-3 w-full group bg-white mt-[24px]  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">


                <SubmitButton isDisabled={isSubmitDisabled}>
                    {t("save_changes")}
                </SubmitButton></div>
        </form>
    )
}
