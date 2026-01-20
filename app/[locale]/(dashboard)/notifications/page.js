import BottomNavBar from "@/components/bottom-nav-bar";
import LanguageGlobe from "@/components/language-globe";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function page() {
    const t = useTranslations();
    return (
        <>
            <div className="min-h-screen  bg-[url('/images/bg4-home.png')] bg-cover bg-bottom   pt-[17px] pb-[12px] px-4 pt-safe">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-[22px] font-semibold">{t("notification")}</h1>
                    <div>
                        <LanguageGlobe />
                    </div>
                </div>
                <div className="w-full mt-[34px] min-h-[70vh] bg-white rounded-[16px]">
                    <div className="mx-[57px] flex-col  min-h-[70vh] flex flex-1 items-center justify-center ">
                        <Image src="/images/image12-notification.png" width={800} height={714} alt="Notification" className="mb-[16px]" />
                        <h1 className="font-semibold text-[#313F3A] text-[19px]">{t("no_notification_title")}</h1>
                        <p className="text-[#60756E]">{t("no_notification_description")}</p>
                    </div>
                </div>
            </div>

            <BottomNavBar />

        </>

    );
}
