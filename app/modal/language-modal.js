"use client";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { useLocale, useTranslations } from "next-intl";
import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button';
import { PopupContext } from '@/components/context/PopupProvider';
import { Check, Globe } from 'lucide-react';
import { useRouter, usePathname } from '@/i18n/navigation';

export default function LanguageModal({ open }) {
    const t = useTranslations();
    const { closeAllModal } = useContext(PopupContext);
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale()
    const [selectedLanguage, setSelectedLanguage] = useState(locale);
    const languages = [
        { code: 'en', name: 'EN' },
        { code: 'my', name: "BM" },

    ]
    return (
        <Dialog open={open} >

            <DialogContent onPointerDownOutside={closeAllModal} showCloseButton={false} className="max-w-none rounded-[24px] w-[90vw] p-0 border-0">
                <DialogTitle></DialogTitle>
                <div className="p-8 w-full lg:w-lg flex flex-col items-center justify-center">
                    <div className="transition-all mx-auto  size-[50px] bg-[#446A2A] rounded-full flex border-[3px] shadow-[4px_4px_0px_0px_rgba(57,83,39,1)] border-white items-center justify-center size ml-auto hover:cursor-pointer">
                        <Globe className="text-[#446A2A] text-[30px] bg-white rounded-full" />
                    </div>


                    <h1 className="text-2xl font-semibold text-center my-[24px]">{t('languages')}</h1>
                    <div className="w-full space-y-[16px] mb-[24px]">
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                type="button"
                                onClick={() => setSelectedLanguage(language.code)}
                                className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 hover:bg-gray-50 transition-all"
                            >
                                <div className="size-[24px] rounded-full bg-gray-200 flex-shrink-0"></div>

                                <span className="text-[19px] font-semibold flex-grow text-left">
                                    {language.name}
                                </span>

                                {/* Checkmark indicator */}
                                <div className={`size-[20px] rounded-full flex items-center justify-center transition-all ${selectedLanguage === language.code
                                    ? 'bg-[#446A2A]'
                                    : 'border-[1px] border-gray-300'
                                    }`}>
                                    {selectedLanguage === language.code && (
                                        <Check className="text-white size-[12px]" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                    <form className="w-full" onSubmit={(e) => {
                        e.preventDefault();
                        router.push(pathname, { locale: selectedLanguage });
                        closeAllModal();
                    }}>
                        <div className="py-2 pl-1 pr-3 w-full group  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">
                            <button
                                type="submit"
                                className="w-full group-hover:scale-105 transition-all  flex justify-center items-center gap-2 font-bold py-3 px-4 rounded-full shadow-[4px_4px_0px_0px_rgba(57,83,39,1)]  text-white bg-[#446A2A] "
                            >
                                {t("save_changes")}
                            </button>
                        </div>
                    </form>
                </div>

            </DialogContent>
        </Dialog>
    )
}