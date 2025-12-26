"use client";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { useTranslations } from "next-intl";
import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button';
import { PopupContext } from '@/components/context/PopupProvider';
import { X } from 'lucide-react';
import SubmitButton from '@/components/auth/submit-btn';

export default function Fail({ open, title, description, buttonText, buttonOnClick }) {
    const t = useTranslations();
    const { closeAllModal } = useContext(PopupContext);
    return (
        <Dialog open={open} >

            <DialogContent onPointerDownOutside={closeAllModal} showCloseButton={false} className="max-w-none rounded-[24px] w-[90vw] p-0 border-0">
                <DialogTitle></DialogTitle>
                <div className="p-8 w-full lg:w-lg flex flex-col items-center justify-center">
                    <div className="rounded-full size-[50px] bg-red-500 flex items-center justify-center border-[3.7px] border-white shadow-[0px_4px_0px_0px_rgba(240,6,6,1)] ">
                        <X className="text-[24px] text-white" />

                    </div>

                    <h1 className="text-2xl font-semibold my-4 text-center">{title}</h1>
                    <p className="text-gray-600 mb-8 text-center">{description}</p>
                    <form className="w-full" onSubmit={(e) => { e.preventDefault(); buttonOnClick() }}>
                        <div className="py-2 pl-1 pr-3 w-full group  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">
                            <button
                                type="submit"
                                className="w-full group-hover:scale-105 transition-all  flex justify-center items-center gap-2 font-bold py-3 px-4 rounded-full shadow-[4px_4px_0px_0px_rgba(240,6,6,1)]  text-white bg-red-500 "
                            >
                                {buttonText}
                            </button>
                        </div>
                    </form>
                </div>

            </DialogContent>
        </Dialog>
    )
}