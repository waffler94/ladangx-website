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
import Image from 'next/image';

export default function Page() {
    const t = useTranslations();
    const { data: userData, isLoading } = useGetUser();
    const user = userData?.data;
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [errors, setErrors] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);
    const { openSuccessModal, closeAllModal } = useContext(PopupContext);
    const router = useRouter();

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicturePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsSubmitDisabled(true);
        const formData = new FormData(e.target);

        // Remove the profile_picture field from form if no new file selected
        if (!profilePicture) {
            formData.delete('profile_picture');
        }

        const res = await updateUser(formData);
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
        return <div className="bg-[url('/images/bg17-additional_pages.png')] bg-cover min-h-screen pt-safe px-4">Loading...</div>;
    }

    return (
        <div className="bg-[url('/images/bg17-additional_pages.png')] bg-cover min-h-screen pt-safe px-4 relative pt-safe">
            <div className="flex flex-row items-center justify-center">
                <Link className="absolute left-4" href="/profile">
                    <BackButton />
                </Link>
                <h1 className="text-[22px] font-semibold">{t('edit_profile')}</h1>
                <div />
            </div>
            <div className="mt-[36px] flex flex-col ">
                <div className="bg-white rounded-full overflow-hidden w-[80px] h-[80px] flex items-center justify-center mx-auto relative z-10 cursor-pointer" onClick={() => document.getElementById('profile-picture-input').click()}>
                    <Image
                        src={profilePicturePreview || userData.data.profile_picture_path}
                        alt="Profile Picture"
                        width={80}
                        height={80}
                        className="p-2 object-contain "
                    />
                    <div className="size-[24px] absolute bottom-0 right-0">
                        <Image src="/icons/button/edit_profile.svg" alt="edit icon" className="size-full" width={24} height={24} />
                    </div>

                </div>
                <div className="mt-[19px] ">
                    <form className="space-y-[24px]" onSubmit={submitHandler}>

                        <input
                            type="file"
                            id="profile-picture-input"
                            name="profile_picture"
                            accept="image/*"
                            onChange={handleProfilePictureChange}
                            className="hidden"
                        />


                        <AuthInput inputName="fullname" label={t("full_name")} initialValue={user.fullname} error={errors.fullname} />
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
