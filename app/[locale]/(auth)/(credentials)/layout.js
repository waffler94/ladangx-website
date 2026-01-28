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
            {/* <div className="relative"> */}
            <div className="bg-[url('/images/bg2-login_register.png')] bg-cover h-[350px] pt-[30px] flex relative px-4">
                {/* <Image src="/images/ladangx_logo1.png" alt="LadangX Logo" width={150} height={165} className="mx-auto z-[2] absolute left-0 right-0 top-[50px]" />
                <Image src="/images/login_bg.jpeg" alt="LadangX Image" width={1000} height={565} className="mx-auto relative" />
                
                <LanguageGlobe className="absolute top-4 right-4 z-[2]" /> */}
                <LanguageGlobe />

            </div>
            <div className="px-4 pt-[22px] bg-white">
                <CredLinks />

            </div>
            {children}
        </div>
    )
}
