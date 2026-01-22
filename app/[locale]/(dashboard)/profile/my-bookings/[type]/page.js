'use client'
import BackButton from '@/components/back-button';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react'
import BookingsLinks from '../_components/bookings-links';
import { useGetVisits } from '@/lib/hooks/useGetVisits';
import BookingItem from '../_components/booking-item';
import Image from 'next/image';
import SubmitButton from '@/components/auth/submit-btn';
import Pagination from '@/components/pagination';

export default function page() {
    const params = useParams();
    const searchParams = useSearchParams();
    const t = useTranslations();
    const { data, isLoading } = useGetVisits({
        filter: params.type,
        page: searchParams.get('page') || 1,
        per_page: 5,
    });

    // if params.type is not 'upcoming' or 'past', redirect to upcoming
    if (params.type !== 'upcoming' && params.type !== 'past') {
        // redirect to upcoming
        if (typeof window !== 'undefined') {
            window.location.href = `/profile/my-bookings/upcoming`;
        }
        return null;
    }

    return (
        <div className="bg-[url('/images/bg17-additional_pages.png')] bg-cover  min-h-screen pt-safe pb-2 px-4 relative pt-safe">
            <div className="flex flex-row items-center justify-center">
                <Link className="absolute left-4" href="/profile">
                    <BackButton />
                </Link>
                <h1 className="text-[22px] font-semibold">{t('my_bookings')}</h1>
                <div />
            </div>
            <div className="mt-6">
                <BookingsLinks />
            </div>
            <div className="mt-4">
                {isLoading ? (<div className="w-full mt-[34px] animate-pulse min-h-[70vh] bg-white rounded-[16px]">

                </div>) :
                    (
                        data?.data?.length <= 0 ? (
                            <div className="w-full mt-[34px] min-h-[70vh] bg-white rounded-[16px]">
                                <div className="mx-[57px] flex-col  min-h-[70vh] flex flex-1 items-center justify-center ">
                                    <Image src="/images/image23-no_booking.png" width={800} height={714} alt="Notification" className="mb-[16px] w-fit h-[187px]" />
                                    <h1 className="font-semibold text-[#313F3A] text-[19px]">{t("no_ticket_yet")}</h1>
                                    <p className="text-[#60756E] mt-2">{t("no_ticket_description")}</p>
                                    <Link href="/ticket/date" className="mt-[17px] w-full">
                                        <div className="py-2 pl-1 pr-2 w-full group  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">

                                            <SubmitButton >
                                                {t("purchase_tickets")}
                                            </SubmitButton>
                                        </div>
                                    </Link>
                                </div>
                            </div>) : (
                            <div>
                                {data?.data?.map((visit) => (
                                    <BookingItem key={visit.id} visit={visit} />
                                ))}
                                {/* {JSON.stringify(data)} */}
                            </div>
                        )
                    )


                }
            </div>
            {data?.pagination && (
                <Pagination
                    current_page={data.pagination.current_page}
                    total_pages={data.pagination.last_page}
                />
            )}
        </div>
    );
}
