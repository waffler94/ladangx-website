'use client'
import BackButton from "@/components/back-button";
import Pagination from "@/components/pagination";
import { Link } from "@/i18n/navigation";
import { useGetFieldActivities } from "@/lib/hooks/useGetFieldActivities";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function page() {
    const t = useTranslations();
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1");
    const itemsPerPage = 20;
    const { data: activitiesData, isLoading } = useGetFieldActivities({ page, per_page: itemsPerPage });
    const items = activitiesData?.data || [];
    const totalPages = activitiesData?.pagination?.last_page || 0;

    const [downloadingId, setDownloadingId] = useState(null);

    const handleDownload = async (url, name, id) => {
        try {
            setDownloadingId(id);

            const res = await fetch(url, { mode: "cors" });
            if (!res.ok) throw new Error("Fetch failed");

            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = name || "artwork";
            document.body.appendChild(a);
            a.click();
            a.remove();

            URL.revokeObjectURL(blobUrl);
        } catch (err) {
            window.open(url, "_blank", "noopener,noreferrer");
            console.log("Download fallback:", err);
        } finally {
            setDownloadingId(null);
        }
    };

    return (
        <div className="bg-[url('/images/bg15-activity.png')] bg-cover bg-[50%_-40px] bg-[#B3CF61] bg-no-repeat  min-h-screen relative pb-[120px] pt-safe">
            <div className="flex flex-row items-center justify-between relative w-full pt-[17px] px-[20px]">
                <Link href="/" className="">
                    <BackButton />
                </Link>
                <h1 className="font-semibold text-[22px] absolute left-1/2 -translate-x-1/2">
                    {t("Activity")}
                </h1>


            </div>
            <div className="mt-[300px] w-full px-[20px]">
                <div className="flex flex-col w-full">
                    <div className="flex flex-row gap-x-4 items-center mx-auto">
                        <h1 className="text-[#313F3A] text-center text-[22px] font-bold">{t("Get the Artwork")}!</h1>

                        <Image src="/images/painting.png" alt="paint icon" width={50} height={50} className="size-[27px]" />
                    </div>
                    <div className="mt-[16px] grid grid-cols-2 gap-[12px]">
                        {isLoading
                            ? Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="bg-white rounded-[16px] aspect-[3/4] animate-pulse" />
                            ))
                            : items.map((item) => (
                                <div key={item.id} className="bg-white rounded-[16px] flex flex-col items-center overflow-hidden shadow-sm">
                                    <div className="w-full flex-1 relative">
                                        <Image
                                            src={item.thumbnail || item.image}
                                            alt={item.name}
                                            width={400}
                                            height={400}
                                            className="w-full h-full object-contain p-[12px]"
                                        />
                                    </div>
                                    <div className="pb-[14px]">
                                        <button
                                            onClick={() => handleDownload(item.image, item.name, item.id)}
                                            disabled={downloadingId === item.id}
                                            className="text-[13px] hover:scale-105 transition-all flex justify-center items-center gap-2 font-bold py-1 px-4 rounded-[18px] shadow-[0px_4px_0px_0px_rgba(255,178,95,1)] text-white bg-[#FFDB0A] disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            {downloadingId === item.id ? t("Preparing...") : t("Download")}
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <Pagination
                    current_page={page}
                    items_per_page={itemsPerPage}
                    total_pages={totalPages}
                />
            </div>
        </div>
    );
}
