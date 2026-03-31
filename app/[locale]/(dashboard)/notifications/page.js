'use client'
import React from "react";
import BottomNavBar from "@/components/bottom-nav-bar";
import LanguageGlobe from "@/components/language-globe";
import Pagination from "@/components/pagination";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link, useRouter } from "@/i18n/navigation";
import { useGetNotifications } from "@/lib/hooks/useGetNotifications";
import { markNotificationRead } from "@/lib/actions";

function NotificationItem({ item, onRefresh }) {
    const locale = useLocale();
    const router = useRouter();
    const title = item.title?.[locale] ?? item.title?.en ?? "";
    const content = item.content?.[locale] ?? item.content?.en ?? "";

    const handleClick = async () => {
        try {
            if (!item.is_read) {
                markNotificationRead({ notification: item.id });
            }
        } finally {
            if (item.url_slug) {
                router.push("/" + item.url_slug);
            } else {
                onRefresh?.();
            }
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`cursor-pointer bg-white rounded-[12px] w-full px-[16px] py-[14px] shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)] transition-all hover:scale-[101%] ${!item.is_read ? "border-l-[4px] border-[#446A2A]" : ""}`}
        >
            <div className="flex flex-row items-start justify-between gap-x-[8px]">
                <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-[15px] ${!item.is_read ? "text-[#313F3A]" : "text-[#60756E]"}`}>
                        {title}
                    </h3>
                    <p className="text-[#60756E] text-[13px] mt-[4px] leading-[1.4]">{content}</p>
                </div>
                {!item.is_read && (
                    <div className="size-[8px] rounded-full bg-[#446A2A] mt-[6px] flex-shrink-0" />
                )}
            </div>
            <p className="text-[#60756E] text-[11px] mt-[8px]">{item.created_at}</p>
        </div>
    );
}

export default function Page() {
    const t = useTranslations();
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1");
    const isReadParam = searchParams.get("is_read");
    const isReadFilter = isReadParam !== null ? parseInt(isReadParam) : undefined;

    const { data: notificationsData, isLoading, refresh } = useGetNotifications({
        page,
        per_page: 10,
        is_read: isReadFilter,
    });

    const notifications = notificationsData?.data ?? [];
    const totalPages = notificationsData
        ? notificationsData.next_page_url ? page + 1 : page
        : 1;

    const filterTabs = [
        { label: t("notification_all"), param: null },
        { label: t("notification_unread"), param: "0" },
        { label: t("notification_read"), param: "1" },
    ];

    const getFilterUrl = (param) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("page");
        if (param === null) {
            params.delete("is_read");
        } else {
            params.set("is_read", param);
        }
        const qs = params.toString();
        return qs ? `/notifications?${qs}` : "/notifications";
    };

    return (
        <>
            <div className="min-h-screen bg-[url('/images/bg4-home.png')] bg-cover bg-bottom pb-[80px] px-4 pt-safe">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-[22px] font-semibold">{t("notification")}</h1>
                    <div>
                        <LanguageGlobe />
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-row items-center gap-x-[8px] mt-[16px]">
                    {filterTabs.map((tab, index) => {
                        const isActive = isReadParam === tab.param;
                        return (
                            <Link
                                key={index}
                                href={getFilterUrl(tab.param)}
                                className={`px-[16px] py-[6px] rounded-full text-[13px] font-medium transition-all ${isActive
                                    ? "bg-[#446A2A] text-white shadow-[0px_2px_0px_rgba(57,83,39,1)]"
                                    : "bg-white text-[#60756E] shadow-[0px_2px_0px_rgba(0,0,0,0.1)]"
                                    }`}
                            >
                                {tab.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Notifications List */}
                <div className="w-full mt-[16px]">
                    {isLoading ? (
                        <div className="flex flex-col gap-[12px]">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="bg-white rounded-[12px] h-[80px] animate-pulse" />
                            ))}
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="w-full mt-[18px] min-h-[70vh] bg-white rounded-[16px]">
                            <div className="mx-[57px] flex-col min-h-[70vh] flex flex-1 items-center justify-center">
                                <Image src="/images/image12-notification.png" width={800} height={714} alt="Notification" className="mb-[16px]" />
                                <h1 className="font-semibold text-[#313F3A] text-[19px]">{t("no_notification_title")}</h1>
                                <p className="text-[#60756E]">{t("no_notification_description")}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-[12px]">
                            {notifications.map((item) => (
                                <NotificationItem key={item.id} item={item} onRefresh={refresh} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {!isLoading && notifications.length > 0 && (
                    <Pagination current_page={page} total_pages={totalPages} />
                )}
            </div>

            <BottomNavBar />
        </>
    );
}

