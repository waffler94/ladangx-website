'use client'
import { Link } from '@/i18n/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { modalList, PopupContext } from './context/PopupProvider';
import Cookies from 'js-cookie';

export default function PlayButton({ href, label }) {
    const { openModal, closeAllModal } = useContext(PopupContext)
    const [isLogin, setIsLogin] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        setIsLogin(Cookies.get("access_token") ? true : false);
    }, []);



    return (
        <>
            {
                !isMounted ? (
                    <button
                        className="w-full text-[13px] group-hover:scale-105 transition-all  flex justify-center items-center gap-2 font-bold py-3 px-4 rounded-[18px] shadow-[4px_4px_0px_0px_rgba(255,178,95,1)]  text-white bg-[#FFDB0A] ">
                        {label}!
                    </button>
                ) : isLogin ? (
                    <Link href={href}>
                        <button
                            className="w-full text-[13px] group-hover:scale-105 transition-all  flex justify-center items-center gap-2 font-bold py-3 px-4 rounded-[18px] shadow-[4px_4px_0px_0px_rgba(255,178,95,1)]  text-white bg-[#FFDB0A] ">
                            {label}!
                        </button>
                    </Link>
                ) : (
                    <button
                        onClick={() => {
                            openModal(modalList.loginWarn.key);
                        }}
                        className="w-full text-[13px] group-hover:scale-105 transition-all  flex justify-center items-center gap-2 font-bold py-3 px-4 rounded-[18px] shadow-[4px_4px_0px_0px_rgba(255,178,95,1)]  text-white bg-[#FFDB0A] ">
                        {label}!
                    </button>
                )
            }

        </>
    )
}
