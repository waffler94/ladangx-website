"use client";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { useLocale, useTranslations } from "next-intl";
import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button';
import { PopupContext } from '@/components/context/PopupProvider';
import { Check, Globe, LogIn } from 'lucide-react';
import { useRouter, usePathname } from '@/i18n/navigation';

export default function LoginWarnModal({ open }) {
    const t = useTranslations();
    const { closeAllModal } = useContext(PopupContext);
    const router = useRouter();
    return (
        <Dialog open={open} >
            <DialogContent onPointerDownOutside={closeAllModal} showCloseButton={false} className="max-w-none rounded-[24px] w-[90vw] p-0 border-0">
                <DialogTitle></DialogTitle>
                <div className="p-8 w-full lg:w-lg flex flex-col items-center justify-center">
                    <div className="transition-all mx-auto  size-[50px] bg-[#446A2A] rounded-full flex border-[3px] shadow-[4px_4px_0px_0px_rgba(57,83,39,1)] border-white items-center justify-center size ml-auto hover:cursor-pointer">
                        <LogIn className="text-white" size={28} />
                    </div>
                    <h1 className="text-[19px] font-semibold text-center mt-[24px] mb-[8px]">{t('login_modal_title')}</h1>
                    <p className="text-[#838383] text-[13px]">{t('login_modal_desc')}</p>
                    <form className="w-full mt-[24px]" onSubmit={(e) => {
                        e.preventDefault();
                        closeAllModal();
                        router.push("/login")
                    }}>
                        <div className="py-2 pl-1 pr-3 w-full group  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">
                            <button
                                type="submit"
                                className="w-full group-hover:scale-105 transition-all  flex justify-center items-center gap-2 font-bold py-3 px-4 rounded-full shadow-[4px_4px_0px_0px_rgba(57,83,39,1)]  text-white bg-[#446A2A] "
                            >
                                {t("login_now")}
                            </button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}