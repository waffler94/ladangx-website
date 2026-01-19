import CredLinks from '@/components/auth/cred-links'
import LanguageGlobe from '@/components/language-globe'
import { redirect } from '@/i18n/navigation'
import { getPathname } from '@/lib/getPathname'
import { getServerSideToken } from '@/lib/getServerSideToken'
import { Globe, GlobeIcon } from 'lucide-react'
import { getLocale } from 'next-intl/server'
import Image from 'next/image'
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
            <div className="bg-[url('/images/bg2-login_register.png')] bg-cover h-[350px] pt-[30px] flex relative px-4">
                {/* <div className="text-center  absolute left-1/2 -translate-1/2 top-[60px] font-bold text-white text-[40px]">
                    <Image src="/images/ladangx_logo1.png" alt="LadangX Logo" width={400} height={165} className="mx-auto " />
                </div> */}
                <LanguageGlobe />

            </div>
            <div className="px-4 pt-[22px] bg-white">
                <CredLinks />

            </div>
            {children}
        </div>
    )
}
