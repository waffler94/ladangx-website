"use client";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { useTranslations } from "next-intl";
import React, { useContext, useState } from 'react'
import { PopupContext } from '@/components/context/PopupProvider';
import { Check, Info } from 'lucide-react';
import SubmitButton from '@/components/auth/submit-btn';

export default function TicketInfo({ open }) {
    const t = useTranslations();
    const { closeAllModal } = useContext(PopupContext);
    const termsList = t.raw('terms_condition_list');

    return (
        <Dialog open={open} >
            <DialogContent onPointerDownOutside={closeAllModal} showCloseButton={false} className="max-w-none rounded-[24px] w-[90vw] p-0 border-0">
                <DialogTitle></DialogTitle>
                <div className="p-8 w-full lg:w-lg flex flex-col items-center justify-center">
                    <div className="size-[50px] rounded-full bg-gray-500 flex items-center justify-center">
                        <Info className="text-white" size={32} />
                    </div>
                    <h1 className="text-[19px] font-semibold text-center my-4">{t("terms_condition")}</h1>
                    <ul className="text-gray-600 text-sm space-y-3 list-disc list-inside mb-8 max-h-[60vh] overflow-y-auto">
                        {termsList && termsList.map((term, index) => (
                            <li key={index} className="leading-relaxed">{term}</li>
                        ))}
                    </ul>
                    <div className="pb-2 py-1 pl-1 pr-3 w-full group bg-white  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">
                        <form className="block w-full" onSubmit={closeAllModal}>
                            <SubmitButton >
                                {t("ok")}
                            </SubmitButton>
                        </form>

                    </div>
                </div>


            </DialogContent>
        </Dialog>
    )
}