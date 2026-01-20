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
import { useGetUser } from '@/lib/hooks/useGetUser'
import Image from 'next/image'

export default function page() {
    const t = useTranslations()
    const router = useRouter()
    const { data: userData, isLoading: isLoadingUser } = useGetUser()
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

            <div className="min-h-screen pt-safe  bg-[url('/images/bg4-home.png')] bg-cover bg-bottom ">
                <div className="px-[18px] pb-[22px]">

                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row items-center justify-center gap-x-[10px]">
                            {isLoadingUser ? (
                                <>
                                    <div className="rounded-full size-[46px] bg-gray-300 animate-pulse"></div>
                                    <div>
                                        <div className="h-4 w-12 bg-gray-300 rounded animate-pulse mb-1"></div>
                                        <div className="h-5 w-24 bg-gray-300 rounded animate-pulse"></div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="rounded-full size-[46px] bg-white flex items-center justify-center overflow-hidden">
                                        {userData?.data?.profile_picture_path ? (
                                            <Image
                                                src={userData.data.profile_picture_path}
                                                alt="Profile Picture"
                                                width={46}
                                                height={46}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <div className="rounded-full size-[46px] bg-gray-400"></div>
                                        )}
                                    </div>
                                    <div>
                                        <p>{t("hello")}!</p>
                                        <p className="font-semibold">{userData?.data?.fullname || t("default_user_name")}</p>
                                    </div>
                                </>
                            )}
                        </div>
                        <LanguageGlobe />

                    </div>
                    <div className="mt-[24px] grid grid-cols-2 gap-y-[24px] gap-x-[17px] ">
                        {

                            [
                                {
                                    label: t("E-learning"),
                                    href: "/e-learning",
                                    image: "/images/image17-e-learning.png"
                                },
                                {
                                    label: t("StampQues"),
                                    href: "",
                                    image: "/images/image18-stampques.png"
                                }, {
                                    label: t("Activity"),
                                    href: "",
                                    image: "/images/image19-activity.png"
                                }, {
                                    label: t("Ticket"),
                                    href: "/ticket/date",
                                    image: "/images/image20-tickets.png"
                                }, {
                                    label: t("Map"),
                                    href: "/map",
                                    image: "/images/image21-map.png"
                                }, {
                                    label: t("Ask Chatbot"),
                                    href: "",
                                    image: "/images/image22-adk_chatbot.png"
                                }
                            ].map(
                                (item, index) => {
                                    return (<div key={index} className="rounded-[32px] w-full h-[180px]  relative mb-[30px]">
                                        <div className="rounded-t-[32px] w-full flex items-center justify-center h-[50px] bg-white">
                                            <p className="text-center  font-semibold">{item.label}</p>
                                        </div>
                                        <div>
                                            <Image src={item.image} alt={item.label} width={180} height={130} className="rounded-b-[32px] w-full h-[130px] object-cover" />
                                        </div>
                                        <div className="pb-2 py-1 pl-1 pr-2 w-[85px] group bg-white bottom-[-30px] left-1/2 -translate-x-1/2 absolute  rounded-[22px] shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">
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
