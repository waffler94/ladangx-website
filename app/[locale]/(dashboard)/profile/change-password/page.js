
'use client'
import BackButton from '@/components/back-button'
import { Link, useRouter } from '@/i18n/navigation'
import { updateUserPassword } from '@/lib/actions';
import { useTranslations } from 'next-intl';
import React, { useContext, useState } from 'react'
import PasswordInput from '@/components/auth/password-input';
import SubmitButton from '@/components/auth/submit-btn';
import { PopupContext } from '@/components/context/PopupProvider';

export default function Page() {
    const t = useTranslations();
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const { openSuccessModal, closeAllModal } = useContext(PopupContext);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsSubmitDisabled(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const res = await updateUserPassword({
            old_password: data.current_password,
            password: data.new_password,
            password_confirmation: data.confirm_new_password,
        });
        console.log(res);
        if (res.status == 422) {
            setErrors(res.errors);
        } else if (res.status == 200) {
            openSuccessModal({
                title: t("success"),
                description: res.message,
                buttonText: t("ok"),
                buttonOnClick: () => { closeAllModal(); router.push('/profile') },
                outsideOnClick: () => { }
            });
        }
        setIsSubmitDisabled(false);
    };

    return (

        <div className="bg-[url('/images/bg17-additional_pages.png')] bg-cover  min-h-screen pt-[17px] px-4 relative pt-safe">
            <div className="flex flex-row items-center justify-center">
                <Link className="absolute left-4" href="/profile">
                    <BackButton />
                </Link>
                <h1 className="text-[22px] font-semibold">{t('change_password')}</h1>
                <div />
            </div>
            <div className="mt-[36px] flex flex-col ">
                <form className="space-y-[24px]" onSubmit={submitHandler}>
                    <PasswordInput inputName="current_password" label={t("current_password")} error={errors?.old_password} />
                    <PasswordInput inputName="new_password" label={t("new_password")} error={errors?.password} />
                    <PasswordInput inputName="confirm_new_password" label={t("confirm_new_password")} error={errors?.password} />

                    <div className="pb-2 py-1 pl-1 pr-3 w-full group bg-white mt-[24px] rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">
                        <SubmitButton isDisabled={isSubmitDisabled}>
                            {t("save_changes")}
                        </SubmitButton>
                    </div>
                </form>
            </div>
        </div >
    )
}
