'use client'
import BackButton from "@/components/back-button";
import Pagination from "@/components/pagination";
import { Link } from "@/i18n/navigation";
import { useGetUserQuizStatus } from "@/lib/hooks/useGetUserQuizStatus";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function page() {
    const t = useTranslations();
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || 1;
    const itemsPerPage = 20;
    const [searchQuery, setSearchQuery] = React.useState("");
    const { data: quizData, isLoading: isLoadingQuiz } = useGetUserQuizStatus();
    const filteredData = quizData?.data?.filter((quiz) =>
        quiz.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalPages = filteredData ? Math.ceil(filteredData.length / itemsPerPage) : 0;

    return (
        <div className="bg-[url('/images/bg7-stampques.png')] bg-cover bg-[50%_0px]  min-h-screen relative pb-[120px] pt-safe">
            <div className="flex flex-row items-center justify-between relative w-full pt-[17px] px-[20px]">
                <Link href="/" className="">
                    <BackButton />
                </Link>
                <h1 className="font-semibold text-[22px] absolute left-1/2 -translate-x-1/2">
                    {t("select_ticket")}
                </h1>
            </div>
            <div className="mt-[210px] w-full px-[20px]    ">
                <div className="relative">
                    <i className="icon-search text-[24px] absolute left-[15px] top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder={t("search_ticket_placeholder")}
                        className=" w-full h-[44px] rounded-full px-[45px] outline-none bg-white/90 placeholder:text-gray-400 focus:outline-none "
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-5 w-full gap-x-[14px] gap-y-[16px] mt-[16px]">
                    {isLoadingQuiz ? (
                        // Skeleton loading state
                        Array.from({ length: 15 }).map((_, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="size-[55px] bg-gray-300 rounded-full animate-pulse" />
                                <div className="w-full h-4 bg-gray-300 rounded mt-2 animate-pulse" />
                            </div>
                        ))
                    ) : (
                        filteredData?.map((quiz) => (
                            <Link
                                key={quiz.field_item_id}
                                href={`/quiz/${quiz.slug}`}
                                className="flex flex-col items-center"
                            >
                                <div>
                                    <Image
                                        src={quiz.is_completed ? "/images/done-quiz.png" : "/images/gray-quiz.png"}
                                        width={500}
                                        height={500}
                                        className="size-[55px]"
                                        alt={quiz.name}
                                    />
                                </div>
                                <p className="text-center text-xs">{quiz.name}</p>
                            </Link>
                        ))
                    )}
                </div>
                <Pagination current_page={parseInt(page)} items_per_page={itemsPerPage}
                    total_pages={totalPages}

                />
            </div>
        </div>
    );
}
