"use client";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { useTranslations } from "next-intl";
import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button';
import { PopupContext } from '@/components/context/PopupProvider';
import { Check } from 'lucide-react';

export default function Success({ open, title, description, buttonText, buttonOnClick }) {
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


                    <h1 className="text-2xl font-semibold text-center my-4">{title}</h1>
                    <p className="text-gray-600 text-center mb-8">{description}</p>
                    <form className="w-full" onSubmit={(e) => { e.preventDefault(); buttonOnClick() }}>
                        <div className="py-2 pl-1 pr-3 w-full group  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">
                            <button
                                type="submit"
                                className="w-full group-hover:scale-105 transition-all  flex justify-center items-center gap-2 font-bold py-3 px-4 rounded-full shadow-[4px_4px_0px_0px_rgba(57,83,39,1)]  text-white bg-[#446A2A] "
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