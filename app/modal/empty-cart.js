"use client";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { useTranslations } from "next-intl";
import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button';
import { PopupContext } from '@/components/context/PopupProvider';
import { Check, ShoppingCart } from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import Image from 'next/image';

export default function EmptyCart({ open, data }) {
    const { orderId } = data
    const t = useTranslations();
    const router = useRouter()
    const { closeAllModal } = useContext(PopupContext);
    return (
        <Dialog open={open} >
            <DialogContent onPointerDownOutside={closeAllModal} showCloseButton={false} className="max-w-none rounded-[24px] w-[90vw] p-0 border-0">
                <DialogTitle></DialogTitle>
                <Image src="/images/image3-information.png" width={800} height={254} alt="Success" className="absolute -translate-y-[99%]" />

                <div className="p-8 w-full lg:w-lg flex flex-col items-center justify-center">
                    <div className="rounded-full size-[50px] bg-[#446A2A] flex items-center justify-center border-[3.7px] border-white shadow-[0px_4px_0px_0px_rgba(104,143,68,1)] ">
                        <ShoppingCart className="text-[24px] text-white" />
                    </div>
                    <h1 className="text-2xl font-semibold text-center mt-[24px]">{t("empty_cart_modal_title")}</h1>
                    <p className="text-gray-600 text-center mt-[8px] mb-[24px]">{t("empty_cart_modal_desc")}</p>
                    <Link href="/ticket/date" className="block w-full">
                        <div className="py-2 pl-1 pr-3 w-full group  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">
                            <button
                                type="submit"
                                className="w-full group-hover:scale-105 transition-all  flex justify-center items-center gap-2 font-semibold py-3 px-4 rounded-full shadow-[4px_4px_0px_0px_rgba(57,83,39,1)]  text-white bg-[#446A2A] "
                            >
                                {t("go_to_ticket")}
                            </button>
                        </div>
                    </Link>

                </div>

            </DialogContent>
        </Dialog>
    )
}