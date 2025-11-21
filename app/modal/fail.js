"use client";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { useTranslations } from "next-intl";
import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button';
import { PopupContext } from '@/components/context/PopupProvider';

export default function Fail({ open, title, description, buttonText, buttonOnClick }) {
    const t = useTranslations();
    const { closeAllModal } = useContext(PopupContext);
    return (
        <Dialog open={open} >

            <DialogContent onPointerDownOutside={closeAllModal} showCloseButton={false} className="max-w-none rounded-none w-auto p-0 border-0">
                <DialogTitle></DialogTitle>
                <div className="p-8 w-full lg:w-lg flex flex-col items-center justify-center">
                    <div>
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="29.9994" cy="30.0001" r="25.7143" fill="#ED1D26" />
                            <path d="M21.7628 38.9076L38.9057 21.7648M38.9057 38.9076L21.7629 21.7647" stroke="#DFDFEC" strokeWidth="3.03046" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                    </div>

                    <h1 className="text-2xl font-semibold my-4 text-center">{title}</h1>
                    <p className="text-gray-600 mb-8 text-center">{description}</p>
                    <form className="w-full" onSubmit={(e) => { e.preventDefault(); buttonOnClick() }}>
                        <Button type="submit"  >
                            {buttonText}
                        </Button>
                    </form>
                </div>

            </DialogContent>
        </Dialog>
    )
}