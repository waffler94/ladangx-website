'use client'
import SubmitButton from '@/components/auth/submit-btn';
import { PopupContext } from '@/components/context/PopupProvider';
import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { useGetCart } from '@/lib/hooks/useGetCart';
import { ChevronDown, Calendar, UsersRound } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useContext, useEffect } from 'react'
import TicketItem from '@/components/ticket/ticket-item';
import CartTimer from '@/components/ticket/cart-timer';
import { Link, usePathname, useRouter } from '@/i18n/navigation';

export default function CartDrawer({ open }) {
    const t = useTranslations();
    const { closeAllModal } = useContext(PopupContext);
    const { data, isLoading } = useGetCart();
    const router = useRouter();
    const pathname = usePathname()

    const handleReviewOrder = (e) => {
        e.preventDefault();
        if (data?.data?.cart?.visit_date) {
            router.push(`/ticket/checkout?date=${data.data.cart.visit_date}`);
            closeAllModal();
        }
    };

    useEffect(() => {
        closeAllModal();

    }, [pathname]);

    useEffect(() => {
        if (open && data && data.res_status === 500) {
            router.push('/ticket/date');
            closeAllModal();
        }
    }, [data, open]);

    return (
        <Drawer open={open} dismissible={false}>
            <DrawerContent onPointerDownOutside={closeAllModal}>
                <DrawerTitle></DrawerTitle>
                <div className="p-[20px] max-h-[80vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-[24px]">
                        <h1 className="underline font-semibold">
                            {t("your_cart")}
                        </h1>
                        <button onClick={closeAllModal}>
                            <ChevronDown size={24} />
                        </button>
                    </div>

                    {isLoading && (
                        <div className="bg-gray-300 w-full rounded-lg h-[200px] animate-pulse">
                        </div>
                    )}



                    {!isLoading && data.res_status == 200 && (
                        <div className="space-y-[20px]">
                            {/* Cart Items */}
                            <div className="space-y-[16px]">
                                {data?.data?.cart?.items && data.data.cart.items.map((item, index) => (
                                    <React.Fragment key={item.cart_item_id}>
                                        {index > 0 && <div className="border-t border-gray-200"></div>}
                                        <TicketItem
                                            passType={item.ticket_type_name}
                                            quantity={item.quantity}
                                            price={parseFloat(item.total_price)}
                                            date={data?.data?.cart?.visit_date}
                                        />
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Booking Details */}
                            <div className="border border-[#CFDDCF] rounded-[12px] p-[16px]">
                                <div className="flex items-center gap-[8px] mb-[8px]">
                                    <Calendar size={20} className="text-gray-700" />
                                    <span className="text-[14px] text-gray-700">
                                        {data?.data?.cart?.visit_date
                                            ? new Date(data.data.cart.visit_date).toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                weekday: 'long'
                                            })
                                            : ""}
                                    </span>
                                </div>
                                <div className="flex items-center gap-[8px] mb-[12px]">
                                    <UsersRound size={20} className="text-gray-700" />
                                    <span className="text-[14px] text-gray-700">
                                        {data?.data?.cart?.items
                                            ? data.data.cart.items.map(item =>
                                                `${item.quantity} ${item.ticket_type_name.toLowerCase()}`
                                            ).join(', ')
                                            : ""}
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

                            {/* Timer */}
                            <div className="flex items-center gap-[8px]">
                                <CartTimer initialTime={data.data.cart.timer.time_left_seconds} />
                            </div>

                            {/* Review Order Button */}
                            <form onSubmit={handleReviewOrder}>

                                <div className="pb-2 py-1 pl-1 pr-3 w-full group bg-white rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">
                                    <SubmitButton >
                                        {t("review_order")}
                                    </SubmitButton>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </DrawerContent>
        </Drawer >
    )
}
