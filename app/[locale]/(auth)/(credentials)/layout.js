import CredLinks from '@/components/auth/cred-links'
import React from 'react'

export default function layout({ children }) {
    return (
        <div className="max-w-lg mx-auto ">
            <div className="bg-gray-500 h-[400px] pt-[30px] flex relative px-4">
                <div className="text-center  absolute left-1/2 -translate-1/2 top-[60px] font-bold text-white text-[40px]">
                    LadangX
                </div>
                <div className="size-fit text-[40px] ml-auto hover:cursor-pointer">
                    🌍
                </div>

            </div>
            <div className="px-4 pt-[22px] ">
                <CredLinks />

            </div>
            {children}
        </div>
    )
}
