'use client';
import BackButton from "@/components/back-button";
import ChatWidget from "@/components/chat-widget";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function ChatbotPage() {
    const t = useTranslations();
    return (
        <div className="pt-safe flex flex-col bg-[#446A2A]">

            <div className="flex flex-row items-center pb-[12px] bg-[#446A2A] justify-between relative w-full pt-[17px] px-[20px]">
                <Link href="/" className="">
                    <BackButton />
                </Link>
                <h1 className="font-semibold text-[22px] absolute text-white left-1/2 -translate-x-1/2">
                    {t("LadangX Chatbot")}
                </h1>
            </div>
            <ChatWidget />

        </div>

    );
}