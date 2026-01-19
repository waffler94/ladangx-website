import BottomNavBar from "@/components/bottom-nav-bar";
import LanguageGlobe from "@/components/language-globe";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import VouchersLinks from "./_components/vouchers-links";
import { Link } from "@/i18n/navigation";
import BackButton from "@/components/back-button";

export default function page({ children }) {
    const t = useTranslations();
    return (
        <>
            <div className="min-h-screen  bg-[url('/images/bg4-home.png')] bg-cover bg-bottom   pt-[17px] pb-[12px] px-4">
                <div className="flex flex-row items-center justify-center">
                    <Link className="absolute left-4" href="/profile">
                        <BackButton />
                    </Link>
                    <h1 className="text-[22px] font-semibold">{t('edit_profile')}</h1>
                    <div />
                </div>

                <div className="mt-[36px] flex flex-col ">
                    <VouchersLinks />
                    <div className="mt-[24px]">
                        {children}
                    </div>
                </div>

            </div>


        </>

    );
}
