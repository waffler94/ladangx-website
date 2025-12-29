'use client'
import React, { useContext, useEffect } from 'react'
import { modalList, PopupContext } from './context/PopupProvider'
import { useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { LogIn } from 'lucide-react'

export default function NoneLoginPage() {
    const t = useTranslations()
    const router = useRouter()
    const { closeAllModal } = useContext(PopupContext)
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-sky-50 bg-[radial-gradient(#bae6fd_2px,transparent_2px)] [background-size:24px_24px] pb-12"
        >
            <div className="p-8  rounded-[38px] w-full lg:w-lg flex flex-col items-center justify-center">
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
        </div>
    )
}
