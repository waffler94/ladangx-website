import BackButton from '@/components/back-button'
import TicketItem from '@/components/ticket/ticket-item'
import { Link, redirect } from '@/i18n/navigation'
import { getCart } from '@/lib/actions'
import { Calendar, ChevronRight, Ticket, UsersRound } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import React from 'react'
import CartTimer from '@/components/ticket/cart-timer'
import CheckoutForm from '@/components/ticket/checkout-form'
import InfoButton from '@/components/info/info-button'

export default async function page({ searchParams }) {
    const t = await getTranslations();
    const { date } = await searchParams;
    const cartData = await getCart({ visit_date: date });
    const locale = await getLocale();

    if (cartData.res_status !== 200 || cartData.data.cart.length == 0) {
        redirect({
            href: '/ticket/types',
            locale: locale
        })

    }


    return (
        <div className="bg-[url('/images/bg16-ticket.png')] bg-cover bg-bottom min-h-screen relative">
            <div className="flex flex-row items-center justify-between w-full pt-[17px] px-[20px]">
                <Link href={`/ticket/types?date=${date}`} className="">
                    <BackButton />
                </Link>
                <h1 className="font-semibold text-[22px]">{t("review_order")}</h1>

                <div className="">
                    <InfoButton />

                </div>
            </div>
            {/* {JSON.stringify(cartData)} */}
            <div className="mt-[31px] w-full px-[20px] pb-[200px]">
                {/* Connected Container */}
                <div className="bg-white rounded-[20px] shadow-md">
                    {/* Cart Header */}
                    <div className="p-[20px]">
                        <div className="flex justify-between items-center mb-[24px]">
                            <h2 className="underline font-semibold">{t("your_cart")}</h2>
                            <CartTimer initialTime={cartData.data?.cart?.timer?.time_left_seconds} />
                        </div>

                        {/* Cart Items */}
                        <div className="space-y-[16px]">
                            {cartData?.data?.cart?.items && cartData.data.cart.items.map((item, index) => (
                                <React.Fragment key={item.cart_item_id}>
                                    {index > 0 && <div className="border-t border-gray-200"></div>}
                                    <TicketItem
                                        passType={item.ticket_type_name}
                                        quantity={item.quantity}
                                        price={parseFloat(item.total_price)}
                                    />
                                </React.Fragment>
                            ))}
                        </div>

                        {/* Booking Details */}
                        <div className="mt-[20px] border border-[#CFDDCF] rounded-[12px] p-[16px]">
                            <div className="flex items-center gap-[8px] mb-[8px]">
                                <Calendar size={20} className="text-gray-700" />
                                <span className="text-[14px] text-gray-700">
                                    {cartData?.data?.cart?.visit_date ? new Date(cartData.data.cart.visit_date).toLocaleDateString('en-GB') : ""}
                                </span>
                            </div>
                            <div className="flex items-center gap-[8px] mb-[12px]">
                                <UsersRound size={20} className="text-gray-700" />
                                <span className="text-[14px] text-gray-700">
                                    {parseInt(cartData?.data?.cart?.total_tickets) || 0} {t("ticket(s)")}
                                </span>
                            </div>
                            <ul className="space-y-[4px] text-[12px] text-gray-600 ml-[4px]">
                                <li className="flex items-start">
                                    <span className="mr-[8px]">•</span>
                                    <span>{t("instant_confirmation")}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-[8px]">•</span>
                                    <span>{t("non_refundable")}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-[8px]">•</span>
                                    <span>{t("admission_ticket")}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200"></div>

                    {/* Vouchers Section */}
                    <div className="p-[20px]">
                        <h2 className="text-[18px] font-semibold mb-[12px]">{t("vouchers")}</h2>
                        <button className="w-full border border-[#CFDDCF] rounded-[12px] p-[16px] flex items-center justify-between">
                            <div className="flex items-center gap-[12px]">
                                <Ticket size={24} />
                                <span className="text-[14px] text-gray-700">{t("voucher_applied")}</span>
                            </div>
                            <ChevronRight size={20} className="text-gray-600" />
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200"></div>

                    {/* Payment Details */}
                    <div className="p-[20px]">
                        <h2 className="text-[18px] font-semibold mb-[16px]">{t("payment_details")}</h2>
                        <div className="space-y-[12px]">
                            <div className="flex justify-between text-[14px]">
                                <span className="text-gray-600">{t("amount")}</span>
                                <span className="font-medium">RM{cartData?.data?.cart?.subtotal || '0.00'}</span>
                            </div>
                            {cartData?.data?.cart?.discount_amount && parseFloat(cartData.data.cart.discount_amount) > 0 && (
                                <div className="flex justify-between text-[14px]">
                                    <span className="text-gray-600">{t("discount")}</span>
                                    <span className="font-medium text-green-600">-RM{cartData.data.cart.discount_amount}</span>
                                </div>
                            )}
                            {cartData?.data?.cart?.tax_breakdown && cartData.data.cart.tax_breakdown.filter(tax => parseFloat(tax.amount) > 0).map((tax, index) => (
                                (
                                    <div key={index} className="flex justify-between text-[14px]">
                                        <span className="text-gray-600">{tax.name.charAt(0).toUpperCase() + tax.name.slice(1)} ({tax.rate}%)</span>
                                        <span className="font-medium">RM{tax.amount}</span>
                                    </div>
                                )
                            ))}
                            <div className="border-t border-gray-200 pt-[12px]">
                                <div className="flex justify-between">
                                    <span className="text-[16px] font-semibold">{t("total_payment")}</span>
                                    <span className="text-[18px] font-semibold text-[#6B8E23]">RM{cartData?.data?.cart?.grand_total || '0.00'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CheckoutForm cartData={cartData} />
        </div>
    )

}