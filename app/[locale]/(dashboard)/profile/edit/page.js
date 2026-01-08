import AuthInput from '@/components/auth/auth-input';
import PhoneInput from '@/components/auth/phone-input';
import SubmitButton from '@/components/auth/submit-btn';
import BackButton from '@/components/back-button'
import { Link } from '@/i18n/navigation'
import { getUser } from '@/lib/actions';
import { getTranslations } from 'next-intl/server';
import React from 'react'
import CheckoutWrapper from './_components/checkout-wrapper';

export default async function page() {
    const t = await getTranslations();
    const user = (await getUser()).data;
    return (
        <div className="bg-[#F5FEBB] min-h-screen pt-[17px] px-4 relative ">
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
                    <CheckoutWrapper>
                        <AuthInput inputName="full_name" label={t("full_name")} initialValue={user.fullname} />
                        <AuthInput inputName="email" label={t("email")} initialValue={user.email} />
                        <PhoneInput inputName="phone_number" label={t("phone_number")} initialValue={user.phone_number} disabled={true} />
                        <AuthInput inputName="birth_date" label={t("birth_date")} type="email" initialValue={user.date_of_birth} disabled={true} />

                    </CheckoutWrapper>

                </div>
            </div>
        </div >
    )
}
