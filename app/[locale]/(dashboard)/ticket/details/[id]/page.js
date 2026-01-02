import { getVisitDetails } from '@/lib/actions';
import { Calendar, Users, CreditCard } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react'
import ShowTicketButton from './_components/show-ticket-btn';
import { Link } from '@/i18n/navigation';
import BackButton from '@/components/back-button';

export default async function page({ params }) {
    const { id } = params;
    const t = await getTranslations();
    const res = await getVisitDetails({ id: id });

    const visit = res.data.visit;
    const qrCodes = res.data.qr_codes;

    // Format date
    const visitDate = new Date(visit.visit_date);
    const formattedDate = visitDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
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

    // Format date and time for display
    const formattedDateTime = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }) + ' ' + new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });



    return (
        <div className="bg-[#F5FEBB] min-h-screen relative">
            <div className="flex flex-row items-center justify-center w-full pt-[17px] px-[20px]">

                <h1 className="font-semibold text-[22px]">{t("review_order")}</h1>

                <Link href="/ticket/types" className="absolute left-[12px] top-[17px]">
                    <BackButton />
                </Link>
            </div>
            <div className="px-[20px] pb-[200px]">

                <div className="bg-white rounded-3xl shadow-lg max-w-md mx-auto w-full mt-[31px] overflow-hidden">
                    {/* QR Code Section */}
                    <div className=" bg-white pt-[24px] text-center">
                        <h2 className="text-lg font-semibold ">{t('scan_at_entrance')}</h2>
                        <div className="bg-white inline-block  relative">
                            {/* <QRCodeSVG
                            value={qrCodes[0]?.qr_string || ''}
                            size={200}
                            level="H"
                            imageSettings={{
                                src: "/logo.png",
                                height: 40,
                                width: 40,
                                excavate: true,
                            }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-white px-2 py-1 rounded text-xs font-bold text-red-500">
                                LADANG X
                            </div>
                        </div> */}
                        </div>
                    </div>

                    {/* Booking Info Card */}
                    <div className="px-[16px] pb-[24px]">
                        <div className="border-[#CFDDCF] border rounded-[8px] p-4 space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <Calendar className="w-5 h-5 text-gray-600" />
                                <span className="text-gray-700">{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Users className="w-5 h-5 text-gray-600" />
                                <span className="text-gray-700">
                                    {adultCount > 0 && `${adultCount} ${adultCount > 1 ? t('adults') : t('adult')}`}
                                    {adultCount > 0 && childCount > 0 && ', '}
                                    {childCount > 0 && `${childCount} ${childCount > 1 ? t('children') : t('child')}`}
                                </span>
                            </div>
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
                    </div>
                    <div className="px-[16px] ">
                        <div className="border-t border-gray-200"></div>
                    </div>

                    {/* Details Section */}
                    <div className="px-6 py-[24px] space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">{t('references_number')}</span>
                            <span className="font-medium text-[#6F6F6F]">{visit.reference}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">{t('date_time')}</span>
                            <span className="font-medium text-[#6F6F6F]">{formattedDateTime}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 ">{t('payment_method')}</span>
                            <div className="flex items-center gap-2">

                                <span className="font-medium text-[#6F6F6F]">{t('master_debit_card')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="px-6">
                        <div className="border-t border-gray-200"></div>
                    </div>

                    {/* Ticket Items */}
                    <div className="px-6 py-4 space-y-2 text-sm">
                        {visit.details.map((detail, index) => (
                            <div key={index} className="flex justify-between">
                                <span className="text-gray-700">
                                    {detail.quantity} x {detail.ticket_type_name}
                                </span>
                                <span className="font-medium">RM{detail.total_price.toFixed(2)}</span>
                            </div>
                        ))}

                        <div className="flex justify-between text-gray-700">
                            <span>{t('discount')}</span>
                            <span>-RM0.00</span>
                        </div>

                        <div className="flex justify-between text-gray-700">
                            <span>{t('tax')}</span>
                            <span>(RM0.00)</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="px-6">
                        <div className="border-t border-gray-200"></div>
                    </div>

                    {/* Total */}
                    <div className="px-6 py-4">
                        <div className="flex justify-between items-center text-[#446A2A]">
                            <span className="font-semibold">{t('total_payment')}</span>
                            <span className="font-semibold text-lg">RM{visit.total_amount.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Download Button */}
                    <div className="flex items-center justify-center pb-6">
                        <ShowTicketButton />
                    </div>
                </div>
            </div>
        </div>
    )
}
