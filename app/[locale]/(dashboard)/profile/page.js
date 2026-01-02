import EditButton from '@/components/edit-button'
import LanguageGlobe from '@/components/language-globe'
import LanguageToggle from '@/components/LanguageToggle'
import { Link } from '@/i18n/navigation'
import { getUser } from '@/lib/actions'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import React, { Suspense } from 'react'

export default async function page() {
    const t = await getTranslations()
    const user = await getUser();
    return (
        <div className="bg-[#F5FEBB] min-h-screen pt-[17px] px-4 ">
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-[22px] font-semibold">{t('profile')}</h1>
                <div>
                    <LanguageGlobe />
                </div>
            </div>
            <div className="mt-[28px]">
                <Suspense fallback={<div className="bg-gray-300 rounded-[16px] h-[100px] w-full animate-pulse"></div>}>

                    <div className="bg-[#446A2A] relative shadow-[0px_4px_0px_0px_rgba(218,226,218,1)] text-white rounded-[16px] items-center  w-full px-[20px] py-[15px] flex flex-row gap-x-[16px]">
                        <div className="bg-white rounded-full w-[80px] h-[80px] flex items-center justify-center">
                            <Image src={user.data.profile_picture_path} alt="Profile Picture" width={80} height={80} className="p-2 object-contain " />
                        </div>
                        <div>
                            <p className="mb-1 text-[19px] font-semibold">
                                {user.data.fullname || t("default_user_name")}
                            </p>
                            <div className="flex flex-row items-center gap-x-[8px]">
                                <div className="rounded-full size-[22px] bg-[#E4B726] border-white border-[2px]">

                                </div>
                                <p className="font-semibold text-[19px]">0 pts</p>
                            </div>
                        </div>
                        <Link href="/profile/edit" className="absolute top-[20px] right-[15px]">
                            <EditButton />
                        </Link>


                    </div>
                </Suspense>

                <div className="flex flex-col">

                </div>


            </div>
        </div>
    )
}
