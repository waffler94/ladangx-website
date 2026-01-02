'use client'
import BottomNavBar from '@/components/bottom-nav-bar'
import LanguageGlobe from '@/components/language-globe'
import PlayButton from '@/components/play-btn'
import { Link, redirect, useRouter } from '@/i18n/navigation'
import { getAccessToken } from '@/lib/axios'
import { useTranslations } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import React, { useEffect } from 'react'
import Cookies from 'js-cookie'

export default function page() {
    const t = useTranslations()
    const router = useRouter()
    useEffect(() => {
        const token = Cookies.get('access_token');
        const isWelcome = sessionStorage.getItem('is_welcome');
        if (!token && !isWelcome) {
            sessionStorage.setItem('is_welcome', 'true');
            router.push('/welcome');
        }

    }, []);
    return (
        <>

            <div className="min-h-screen  bg-[#76BFDC] ">
                <div className="px-[18px] py-[22px]">

                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row items-center justify-center gap-x-[10px]">
                            <div className="rounded-full size-[46px] bg-gray-400">

                            </div>
                            <div>
                                <p>{t("hello")}!</p>
                                <p className="font-semibold">Nicole Wong</p>
                            </div>

                        </div>
                        <LanguageGlobe />

                    </div>
                    <div className="mt-[24px] grid grid-cols-2 gap-y-[24px] gap-x-[17px] ">
                        {

                            [
                                {
                                    label: t("E-learning"),
                                    href: "/e-learning"
                                },
                                {
                                    label: t("StampQues"),
                                    href: ""
                                }, {
                                    label: t("Activity"),
                                    href: ""
                                }, {
                                    label: t("Ticket"),
                                    href: "/ticket"
                                }, {
                                    label: t("Map"),
                                    href: "/map"
                                }, {
                                    label: t("Ask Chatbot"),
                                    href: ""
                                }
                            ].map(
                                (item, index) => {
                                    return (<div key={index} className="rounded-[32px] w-full h-[180px] bg-gray-200 relative mb-[30px]">
                                        <div className="rounded-t-[32px] w-full flex items-center justify-center h-[50px] bg-white">
                                            <p className="text-center  font-semibold">{item.label}</p>
                                        </div>
                                        <div className="pb-2 py-1 pl-1 pr-2 w-[65px] group bg-white bottom-[-30px] left-1/2 -translate-x-1/2 absolute  rounded-[22px] shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">
                                            <PlayButton href={item.href} label={t("play_btn")} />
                                        </div>
                                    </div>)
                                }

                            )
                        }

                    </div>


                </div>
                <BottomNavBar />

            </div>


        </>

    )
}
