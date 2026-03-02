import DeleteAccountButtonWrapper from '@/components/auth/delete-account-button-wrapper'
import LogoutButtonWrapper from '@/components/auth/logout-button-wrapper'
import BottomNavBar from '@/components/bottom-nav-bar'
import EditButton from '@/components/edit-button'
import LanguageGlobe from '@/components/language-globe'
import LanguageToggle from '@/components/LanguageToggle'
import { Link } from '@/i18n/navigation'
import { getUser } from '@/lib/actions'
import { ArrowRightIcon, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import React, { Suspense } from 'react'

export default async function page() {
    const t = await getTranslations()
    const user = await getUser();

    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    const formattedDate = `${nextMonth.getDate().toString().padStart(2, '0')}/${(nextMonth.getMonth() + 1).toString().padStart(2, '0')}/${nextMonth.getFullYear()}`;

    return (
        <>
            <div className="bg-[url('/images/bg4-home.png')] bg-cover bg-bottom min-h-screen pb-[12px] px-4 pt-safe">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-[22px] font-semibold">{t('profile')}</h1>
                    <div>
                        <LanguageGlobe />
                    </div>
                </div>
                <div className="mt-[28px]">
                    <Suspense fallback={<div className="bg-gray-300 rounded-[16px] h-[100px] w-full animate-pulse"></div>}>

                        <div className="bg-[url('/images/image15-frame_profile.png')] bg-cover bg-center relative text-white rounded-[16px]  w-full px-[20px] py-[15px] flex flex-col ">
                            <div className="flex flex-row gap-x-[16px] items-center ">

                                <div className="bg-white rounded-full overflow-hidden w-[80px] h-[80px] flex items-center justify-center relative z-10 ">
                                    <Image src={user.data.profile_picture_path} alt="Profile Picture" width={80} height={80} className="p-2 object-cover " />
                                </div>

                                <div className="relative z-10 ">
                                    <p className="mb-1 text-[19px] font-semibold">
                                        {user.data.fullname || t("default_user_name")}
                                    </p>
                                    <div className="flex flex-row items-center gap-x-[8px]">
                                        <div className="rounded-full size-[22px] bg-white border-white border-[1px]">
                                            <Image src="/images/image16-stamp.png" alt="points icon" className="size-full" width={22} height={22} />
                                        </div>
                                        <p className="font-semibold text-[19px]">{user.data.points_balance || 0} pts</p>

                                    </div>

                                </div>

                            </div>
                            <div className="bg-[#F6F3E1] mt-[12px] p-[8px] w-full rounded-md text-[#60756E] text-[11px] flex items-center ">
                                <i className="icon-date text-[16px] mr-[4px]" />
                                {t("point_expired_text", {
                                    points: user.data.points_expiring_30_days,
                                    date: formattedDate
                                })}
                            </div>

                            <Link href="/profile/edit" className="absolute top-[20px] right-[15px]">
                                <EditButton />
                            </Link>


                        </div>

                    </Suspense>

                    <div className="flex flex-col mt-[24px] gap-y-[20px]">
                        {
                            [
                                {
                                    image: "/icons/colour/change_password.svg",
                                    label: t("change_password"),
                                    href: "/profile/change-password"
                                }, {
                                    image: "/icons/colour/tickets.svg",
                                    label: t("my_bookings"),
                                    href: "/profile/my-bookings/upcoming"
                                }, {
                                    image: "/icons/colour/redeem_voucher.svg",
                                    label: t("redeem_voucher"),
                                    href: "/profile/vouchers/available"
                                }, {
                                    image: "/icons/colour/privacy_policy.svg",
                                    label: t("privacy_policy"),
                                    href: "/documents/privacy-policy"
                                }, {
                                    image: "/icons/colour/terms_conditions.svg",
                                    label: t("terms_and_conditions"),
                                    href: "/documents/terms"
                                },
                            ].map((item, index) => {
                                return (
                                    <Link href={item.href} key={index} className="w-full">
                                        <div className="bg-white rounded-[16px] w-full h-[60px] hover:scale-[101%] transition-all flex flex-row items-center justify-between px-[20px] shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)]">
                                            <div className="flex flex-row items-center gap-x-[9px]">


                                                <div className="size-[24px]   ">
                                                    <Image src={item.image} alt={item.label} width={24} height={24} />
                                                </div>
                                                <p className="font-semibold">{item.label}</p>
                                            </div>
                                            <ChevronRight size={20} />
                                        </div>
                                    </Link>
                                )
                            })
                        }
                        <DeleteAccountButtonWrapper>

                            <div className="bg-white rounded-[16px] w-full h-[60px] hover:scale-[101%] transition-all flex flex-row items-center justify-between px-[20px] shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)]">

                                <div className="flex flex-row items-center gap-x-[9px]">


                                    <div className="size-[24px] ">
                                        <Image src="/icons/colour/delete.svg" alt={t('delete_account')} width={24} height={24} />
                                    </div>
                                    <p className="font-semibold">{t('delete_account')}</p>
                                </div>
                                <ChevronRight size={20} />
                            </div>
                        </DeleteAccountButtonWrapper>


                        <LogoutButtonWrapper>
                            <div className="bg-white rounded-[16px] w-full h-[60px] hover:scale-[101%] transition-all flex flex-row items-center justify-between px-[20px] shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)]">

                                <div className="flex flex-row items-center gap-x-[9px]">


                                    <div className="size-[24px] ">
                                        <Image src="/icons/colour/logout.svg" alt={t('logout')} width={24} height={24} />
                                    </div>
                                    <p className="font-semibold">{t('logout')}</p>
                                </div>
                                <ChevronRight size={20} />
                            </div>
                        </LogoutButtonWrapper>
                    </div>


                </div>

            </div>
            <BottomNavBar />
        </>
    )
}
