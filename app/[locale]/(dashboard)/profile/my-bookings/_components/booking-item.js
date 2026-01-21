'use client'
import { Calendar, ChevronDown, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import React from 'react'

export default function BookingItem({ visit }) {
    const t = useTranslations();

    // Format date
    const visitDate = new Date(visit.visit_date);
    const formattedDate = visitDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }) + ', ' + visitDate.toLocaleDateString('en-GB', {
        weekday: 'long'
    });

    // Count adults and children
    const adultCount = visit.details.reduce((acc, detail) => {
        if (detail.ticket_type_name.toLowerCase().includes('adult') ||
            detail.ticket_type_name.toLowerCase().includes('senior')) {
            return acc + detail.quantity;
        }
        return acc;
    }, 0);

    const childCount = visit.details.reduce((acc, detail) => {
        if (detail.ticket_type_name.toLowerCase().includes('child')) {
            return acc + detail.quantity;
        }
        return acc;
    }, 0);

    return (
        <div>

            <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
                <div className=" bg-white mb-[24px]">
                    <h2 className="text-lg font-semibold underline ">{t('order_summary')}</h2>

                </div>
                <div className="border-[#CFDDCF] border rounded-[8px] p-4 space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">{formattedDate}</span>
                    </div>
                    {(adultCount > 0 || childCount > 0) && (
                        <div className="flex items-center gap-3 text-sm">
                            <Users className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-700">
                                {adultCount > 0 && `${adultCount} ${adultCount > 1 ? t('adults') : t('adult')}`}
                                {adultCount > 0 && childCount > 0 && ', '}
                                {childCount > 0 && `${childCount} ${childCount > 1 ? t('children') : t('child')}`}
                            </span>
                        </div>
                    )}
                    <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-start gap-2">
                            <span className="text-gray-400">•</span>
                            <span>{t('instant_confirmation')}</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-gray-400">•</span>
                            <span>{t('non_refundable')}</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-gray-400">•</span>
                            <span>{t('admission_ticket')}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full flex items-center justify-center">
                    <Link className="text-[#60756E] hover:underline size-fit   mt-[16px]" href={`/ticket/details/${visit.id}`}>
                        {t("View More")} <ChevronDown className="inline-block ml-1 w-4 h-4 text-gray-600" />
                    </Link>
                </div>

            </div>

        </div>
    )
}
