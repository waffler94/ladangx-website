import LanguageGlobe from '@/components/language-globe'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function page() {
    const t = useTranslations()
    return (
        <div className="min-h-screen bg-[#76BFDC] px-[18px] pt-[22px]">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center justify-center gap-x-[10px]">
                    <div className="rounded-full size-[46px] bg-gray-400">

                    </div>
                    <div>
                        <p>{t("hello")}!</p>
                        <p>Nicole Wong</p>
                    </div>

                </div>
                <LanguageGlobe />

            </div>
            <div className="mt-[24px] grid grid-cols-2 gap-y-[24px] gap-x-[17px] ">
                {
                    Array.from({ length: 6 }).map(
                        (item, index) => {
                            return (<div key={index} className="rounded-[32px] w-full h-[180px] bg-white relative mb-[30px]">
                                <div className="pb-2 py-1 pl-1 pr-2 w-[65px] group bg-white bottom-[-30px] left-1/2 -translate-x-1/2 absolute  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">

                                    <button
                                        className="w-full text-[13px] group-hover:scale-105 transition-all  flex justify-center items-center gap-2 font-bold py-3 px-4 rounded-full shadow-[4px_4px_0px_0px_rgba(255,178,95,1)]  text-white bg-[#FFDB0A] "

                                    >
                                        {t("play_btn")}!
                                    </button>
                                </div>
                            </div>)
                        }

                    )
                }

            </div>


        </div>
    )
}
