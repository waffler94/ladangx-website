"use client";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { useTranslations } from "next-intl";
import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button';
import { PopupContext } from '@/components/context/PopupProvider';

export default function Success({ open, title, description, buttonText, buttonOnClick }) {
    const t = useTranslations();
    const { closeAllModal } = useContext(PopupContext);
    return (
        <Dialog open={open} >

            <DialogContent onPointerDownOutside={closeAllModal} showCloseButton={false} className="max-w-none rounded-none w-auto p-0 border-0">
                <DialogTitle></DialogTitle>
                <div className="p-8 w-full lg:w-lg flex flex-col items-center justify-center">
                    <div>
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="29.9994" cy="30.0001" r="25.7143" fill="#07AE61" />
                            <path d="M39.1512 21.7257C39.7528 21.1226 40.7296 21.1205 41.3329 21.7217C41.936 22.3232 41.9381 23.3001 41.337 23.9034L26.2636 39.0169C25.9746 39.3065 25.5819 39.4685 25.1728 39.469C24.7632 39.4692 24.3695 39.3065 24.0799 39.0169L16.5241 31.4612C15.9217 30.8586 15.9216 29.882 16.5241 29.2794C17.1266 28.677 18.1034 28.677 18.7059 29.2794L25.1687 35.7423L39.1512 21.7257Z" fill="white" />
                        </svg></div>

                    <h1 className="text-2xl font-semibold text-center my-4">{title}</h1>
                    <p className="text-gray-600 text-center mb-8">{description}</p>
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