"use client";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { useTranslations } from "next-intl";
import React, { useContext, useState } from 'react'
import { PopupContext } from '@/components/context/PopupProvider';

export default function ExampleModal({ open }) {
    const t = useTranslations();
    const { closeAllModal } = useContext(PopupContext);
    return (
        <Dialog open={open} >

            <DialogContent onPointerDownOutside={closeAllModal} showCloseButton={false} className="max-w-none rounded-none w-auto p-0 border-0">
                <DialogTitle></DialogTitle>
                <div className="p-8 w-full lg:w-lg flex flex-col items-center justify-center">
                    <div>
                        Example.js at app/modal/
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}