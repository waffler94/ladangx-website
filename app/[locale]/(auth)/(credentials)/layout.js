import CredLinks from '@/components/auth/cred-links'
import { redirect } from '@/i18n/navigation'
import { getPathname } from '@/lib/getPathname'
import { getServerSideToken } from '@/lib/getServerSideToken'
import { Globe, GlobeIcon } from 'lucide-react'
import { getLocale } from 'next-intl/server'
import React from 'react'

export default async function layout({ children }) {
    const token = await getServerSideToken();
    const locale = await getLocale();
    if (token) {
        redirect({
            href: "/",
            locale: locale
        })
    }

    return (
        <div className="max-w-lg mx-auto ">
            <div className="bg-[#76BFDC] h-[400px] pt-[30px] flex relative px-4">
                <div className="text-center  absolute left-1/2 -translate-1/2 top-[60px] font-bold text-white text-[40px]">
                    LadangX
                </div>
                <div className="hover:scale-110 transition-all text-[24px] size-[40px] bg-[#446A2A] rounded-full flex border-[3px] shadow-[4px_4px_0px_0px_rgba(57,83,39,1)] border-white items-center justify-center size ml-auto hover:cursor-pointer">
                    <Globe className="text-[#446A2A] bg-white rounded-full" />
                </div>

            </div>
            <div className="px-4 pt-[22px] ">
                <CredLinks />

            </div>
            {children}
        </div>
    )
}
