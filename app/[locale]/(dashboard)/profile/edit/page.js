'use client'
import AuthInput from '@/components/auth/auth-input';
import PhoneInput from '@/components/auth/phone-input';
import SubmitButton from '@/components/auth/submit-btn';
import BackButton from '@/components/back-button'
import { Link, useRouter } from '@/i18n/navigation'
import { updateUser } from '@/lib/actions';
import { useTranslations } from 'next-intl';
import React, { useContext, useState } from 'react'
import { useGetUser } from '@/lib/hooks/useGetUser';
import { PopupContext } from '@/components/context/PopupProvider';

export default function Page() {
    const t = useTranslations();
    const { data: userData, isLoading } = useGetUser();
    const user = userData?.data;
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [errors, setErrors] = useState({});
    const { openSuccessModal, closeAllModal } = useContext(PopupContext);
    const router = useRouter();

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsSubmitDisabled(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const res = await updateUser({
            fullname: data.full_name,
            email: data.email,
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

    if (isLoading || !user) {
        return <div className="bg-[url('/images/bg17-additional_pages.png')] bg-cover min-h-screen pt-[17px] px-4">Loading...</div>;
    }

    return (
        <div className="bg-[url('/images/bg17-additional_pages.png')] bg-cover min-h-screen pt-[17px] px-4 relative ">
            <div className="flex flex-row items-center justify-center">
                <Link className="absolute left-4" href="/profile">
                    <BackButton />
                </Link>
                <h1 className="text-[22px] font-semibold">{t('edit_profile')}</h1>
                <div />
            </div>
            <div className="mt-[36px] flex flex-col ">
                <div className="bg-gray-400 rounded-full size-[80px] mx-auto " />
                <div className="mt-[19px] ">
                    <form className="space-y-[24px]" onSubmit={submitHandler}>
                        <AuthInput inputName="full_name" label={t("full_name")} initialValue={user.fullname} error={errors.fullname} />
                        <AuthInput inputName="email" label={t("email")} initialValue={user.email} error={errors.email} />
                        <PhoneInput inputName="phone_number" label={t("phone_number")} initialValue={user.phone_number} disabled={true} />
                        <AuthInput inputName="birth_date" label={t("birth_date")} type="email" initialValue={user.date_of_birth} disabled={true} />

                        <div className="pb-2 py-1 pl-1 pr-3 w-full group bg-white mt-[24px] rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">
                            <SubmitButton isDisabled={isSubmitDisabled}>
                                {t("save_changes")}
                            </SubmitButton>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}
