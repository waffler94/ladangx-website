'use client'
import Image from 'next/image'
import React from 'react'
import { useTranslations } from 'use-intl'

export default function VoucherCard({
    leftTitle,
    voucherTitle,
    icon,
    points,
    description,
    id,
    onClick
}) {
    const t = useTranslations()

    const handleClick = () => {
        if (onClick) {
            onClick(id)
        }
    }

    return (
        <div onClick={onClick ? handleClick : undefined} className={`relative w-full aspect-[800/241] ${onClick ? 'cursor-pointer' : ''}`}>
            <Image
                src="/images/image14-voucher.png"
                width={800}
                height={241}
                alt="voucher bg"
                className="size-full object-cover"
            />
            <div className="absolute top-0 left-0 bottom-0 w-[27.76%]">
                <div className="flex flex-col items-center size-full justify-center">
                    <i className={`${icon} text-white text-[32px]`} />
                    <h1 className="font-semibold text-white">{leftTitle}</h1>
                </div>
            </div>
            <div className="absolute top-0 left-[27.76%] bottom-0 w-[calc(100%-27.76%)]">
                <div className="py-[20px] px-[11px] flex flex-col justify-between h-full">
                    <div className="flex flex-row justify-between items-start">
                        <h1 className="font-semibold text-black">{voucherTitle}</h1>
                        {onClick && (
                            <button
                                onClick={handleClick}
                                className="w-[63px] text-[13px] group-hover:scale-105 transition-all flex justify-center items-center gap-2 font-bold py-1 px-2 rounded-[18px] shadow-[0px_4px_0px_0px_rgba(255,178,95,1)] text-white bg-[#FFDB0A]"
                            >
                                {t("redeem")}
                            </button>
                        )}
                    </div>
                    <p className="font-semibold text-[13px] text-[#446A2A]">{points}</p>
                    <p className="text-[13px] text-[#60756E]">{description}</p>
                </div>
            </div>
        </div>
    )
}
