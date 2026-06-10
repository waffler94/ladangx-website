"use client";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { useLocale, useTranslations } from "next-intl";
import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button';
import { PopupContext } from '@/components/context/PopupProvider';
import { Check, Globe, LogIn, Trash } from 'lucide-react';
import { useRouter, usePathname } from '@/i18n/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';
import PasswordInput from '@/components/auth/password-input';
import { deleteAccount } from '@/lib/actions';

export default function DeleteAccountModal({ open }) {
    const t = useTranslations();
    const { closeAllModal } = useContext(PopupContext);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        const formData = new FormData(e.currentTarget);
        const password = formData.get('password')?.toString() || '';
        const res = await deleteAccount({ password });

        if (res.status === 422) {
            setErrors(res.errors || { password: res.message || 'Wrong password' });
        } else if (res.status === 200) {
            Cookies.remove('access_token');
            closeAllModal();
            router.push('/login');
            router.refresh();
        }

        setIsSubmitting(false);
    };

    return (
        <Dialog open={open} >
            <DialogContent onPointerDownOutside={closeAllModal} showCloseButton={false} className="max-w-none rounded-[24px] w-[90vw] p-0 border-0">
                <DialogTitle></DialogTitle>
                <Image src="/images/image2-failed.png" width={800} height={254} alt="Fail" className="absolute -translate-y-full" />

                <div className="p-8 w-full lg:w-lg flex flex-col items-center justify-center">
                    <div className="transition-all mx-auto  size-[50px] bg-[#FE3939] rounded-full flex border-[3px] shadow-[4px_4px_0px_0px_rgba(240,6,6,1)] border-white items-center justify-center size ml-auto ">
                        <Trash className="text-white" size={28} />
                    </div>
                    <h1 className="text-[19px] font-semibold text-center mt-[24px] mb-[8px]">{t('delete_acc_modal_title')}</h1>
                    <p className="text-[#838383] text-[13px]">{t('delete_acc_modal_desc')}</p>
                    <form className="w-full mt-[24px]" onSubmit={submitHandler}>
                        <PasswordInput inputName="password" label={t("current_password")} error={errors.password} />
                        <div className="py-2 pl-1 pr-3 w-full group  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full group-hover:scale-105 transition-all  flex justify-center items-center gap-2 font-bold py-3 px-4 rounded-full shadow-[4px_4px_0px_0px_rgba(240,6,6,1)]  text-white bg-[#FE3939] disabled:opacity-70"
                            >
                                {isSubmitting ? t("loading") : t("yes")}
                            </button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}