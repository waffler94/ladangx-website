"use client";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { useTranslations } from "next-intl";
import React, { useContext, useState } from 'react'
import { PopupContext } from '@/components/context/PopupProvider';
import { Check } from 'lucide-react';

export default function TicketInfo({ open }) {
    const t = useTranslations();
    const { closeAllModal } = useContext(PopupContext);
    return (
        <Dialog open={open} >
            <DialogContent onPointerDownOutside={closeAllModal} showCloseButton={false} className="max-w-none rounded-[24px] w-[90vw] p-0 border-0">
                <DialogTitle></DialogTitle>
                <div className="p-8 w-full lg:w-lg flex flex-col items-center justify-center">
                    <div className="rounded-full size-[50px] bg-[#79A74E] flex items-center justify-center border-[3.7px] border-white shadow-[0px_4px_0px_0px_rgba(104,143,68,1)] ">
                        <Check className="text-[24px] text-white" />
                    </div>
                    <h1 className="text-2xl font-semibold text-center my-4">{t("info")}</h1>
                    <p className="text-gray-600 text-center mb-8">{t("info")}</p>

                </div>

            </DialogContent>
        </Dialog>
    )
}