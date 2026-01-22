'use client'
import { Calendar, ChevronDown, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import React, { useState } from 'react'

export default function BookingItem({ visit }) {
    const t = useTranslations();
    const [isOpen, setIsOpen] = useState(false);

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

    // Format created_at date time
    const createdDate = new Date(visit.created_at);
    const formattedDateTime = createdDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }) + ' ' + createdDate.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).toUpperCase();

    return (
            <div className="bg-white rounded-2xl shadow-md p-4 mb-4 overflow-hidden">
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

                {/* Expanded Details Section */}
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="transition-opacity duration-300">
                        <div className="px-[16px] mt-4">
                            <div className="border-t border-gray-200"></div>
                        </div>

                        {/* Details Section */}
                        <div className="py-[24px] space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">{t('references_number')}</span>
                                <span className="font-medium text-[#6F6F6F]">{visit.reference}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">{t('date_time')}</span>
                                <span className="font-medium text-[#6F6F6F]">{formattedDateTime}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">{t('payment_method')}</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-[#6F6F6F]">{t('master_debit_card')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="">
                            <div className="border-t border-gray-200"></div>
                        </div>

                        {/* Ticket Items */}
                        <div className="py-4 space-y-2 text-sm">
                            {visit.details.map((detail, index) => (
                                <div key={index} className="flex justify-between">
                                    <span className="text-gray-700">
                                        {detail.quantity} x {detail.ticket_type_name}
                                    </span>
                                    <span className="font-medium">RM{detail.total_price.toFixed(2)}</span>
                                </div>
                            ))}

                            {visit.subtotal && (
                                <div className="flex justify-between text-gray-700">
                                    <span>{t('subtotal')}</span>
                                    <span>RM{visit.subtotal.toFixed(2)}</span>
                                </div>
                            )}

                            {visit.discount_amount > 0 && (
                                <div className="flex justify-between text-gray-700">
                                    <span>{t('discount')}</span>
                                    <span>-RM{visit.discount_amount.toFixed(2)}</span>
                                </div>
                            )}

                            {visit.tax_breakdown && visit.tax_breakdown.filter(tax => tax.amount > 0).map((tax, index) => (
                                <div key={index} className="flex justify-between text-gray-700">
                                    <span>{t('tax')} ({tax.name} {tax.rate}%)</span>
                                    <span>RM{tax.amount.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="">
                            <div className="border-t border-gray-200"></div>
                        </div>

                        {/* Total */}
                        <div className="py-4">
                            <div className="flex justify-between items-center text-[#446A2A]">
                                <span className="font-semibold">{t('total_payment')}</span>
                                <span className="font-semibold text-lg">RM{(visit.grand_total || visit.total_amount).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    {visit.total_tickets > 0 && visit.pdf_url && (
                        <div className="flex items-center justify-center pb-4">
                            <Link href={visit.pdf_url} target="_blank" className="bg-white text-[#446A2A] font-semibold py-3 underline transition-colors">
                                {t('show_ticket')}
                            </Link>
                        </div>
                    )}

                </div>

                <div className="w-full flex items-center justify-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-[#60756E] hover:underline size-fit mt-[16px] flex items-center gap-1 transition-colors duration-200"
                    >
                        {isOpen ? t("View Less") : t("View More")}
                        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'
                            }`} />
                    </button>
                </div>
            </div>
    )
}
