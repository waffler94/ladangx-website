
import SubmitButton from '@/components/auth/submit-btn'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { cookies } from 'next/headers'
import Image from 'next/image'

export default async function page() {
    const t = await getTranslations()


    return (
        <div className="min-h-screen flex flex-col items-center justify-end px-4 pb-[37px]">
            <Image src="/images/bg1-splash_screen.png" alt="Welcome Background" width={800} height={1733} className="absolute top-0 left-0 w-full h-full object-cover -z-10" />

            <Link href="/login" className="w-full mb-[16px]">
                <div className="pb-2 py-1 pl-1 pr-2 w-full group bg-white mt-[24px]  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">

                    <SubmitButton>
                        {t("get_started")}
                    </SubmitButton>

                </div>
            </Link>
            <Link href="/">
                <p className="text-white hover:underline font-semibold">
                    {t("continue_as_guest")}

                </p>
            </Link>


        </div>
    )
}
