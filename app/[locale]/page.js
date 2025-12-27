import SubmitButton from '@/components/auth/submit-btn'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function page() {
    const t = useTranslations()
    return (
        <div className="min-h-screen bg-[#76BFDC] flex flex-col items-center justify-end px-4 pb-[37px]">

            <Link href="/login" className="w-full mb-[16px]">
                <div className="pb-2 py-1 pl-1 pr-2 w-full group bg-white mt-[24px]  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">

                    <SubmitButton>
                        {t("get_started")}
                    </SubmitButton>

                </div>
            </Link>
            <Link href="/home">
                <p className="text-white">
                    {t("continue_as_guest")}

                </p>
            </Link>


        </div>
    )
}
