'use client'
import BackButton from '@/components/back-button'
import { Link, useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import React, { useContext, useEffect, useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import SubmitButton from '@/components/auth/submit-btn'
import { PopupContext } from '@/components/context/PopupProvider'
import { addToCart, getTicketList, updateCart } from '@/lib/actions'
import { useGetTicketList } from '@/lib/hooks/useGetTicketTypes'
import { formatToLocalDate, calculatePromoPrice } from '@/lib/helper'
import { useGetCart } from '@/lib/hooks/useGetCart'
import { useSearchParams } from 'next/navigation'
import InfoButton from '@/components/info/info-button'

export default function page() {
    const searchParams = useSearchParams()
    const t = useTranslations();
    const router = useRouter()
    const [isSubmitDisable, setIsSubmitDisable] = useState(false);
    const { openFailModal, closeAllModal } = useContext(PopupContext);
    const { data: ticketList, isLoading: ticketListLoading } = useGetTicketList({ nationality: "" });
    const { data: cartData, isLoading: isCartLoading, refresh } = useGetCart({ visit_date: searchParams.get('date') });

    const isNewCart = cartData?.res_status != 200 || cartData.data.cart.length == 0;
    const [ticketQuantities, setTicketQuantities] = useState({});

    useEffect(() => {
        if (!searchParams.get('date')) {
            router.push('/ticket/date')
        }
    }, []);

    useEffect(() => {
        if (!isNewCart && cartData?.data?.cart?.items) {
            console.log("Update")
            const quantities = {};
            cartData?.data?.cart?.items.forEach(item => {
                quantities[item.ticket_type_id] = item.quantity;
            });
            setTicketQuantities(quantities);
        }
    }, [isCartLoading]);

    const updateTicket = (ticketId, action) => {
        setTicketQuantities(prev => {
            const currentQuantity = prev[ticketId] || 0;
            const newQuantity = action === 'plus' ? currentQuantity + 1 : Math.max(0, currentQuantity - 1);
            return { ...prev, [ticketId]: newQuantity };
        });
    };




    const submitHandler = async (e) => {
        e.preventDefault();
        setIsSubmitDisable(true);

        // Check if all quantities are 0
        const hasTickets = Object.values(ticketQuantities).some(quantity => quantity > 0);
        if (!hasTickets) {
            openFailModal({
                title: t("no_items_selected"),
                description: t("please_select_at_least_one_item"),
                buttonText: t("ok"),
                buttonOnClick: closeAllModal,
            });
            setIsSubmitDisable(false);
            return;
        }

        let res
        if (isNewCart) {
            res = await addToCart({
                visit_date: searchParams.get('date'),
                details: [
                    ...Object.entries(ticketQuantities)
                        .filter(([_, quantity]) => quantity > 0)
                        .map(([ticket_id, quantity]) => ({ ticket_type_id: ticket_id, quantity })),
                ]
            });
        } else {
            res = await updateCart({
                cart_id: cartData.data.cart_id,
                details: [
                    ...Object.entries(ticketQuantities)
                        .map(([ticket_id, quantity]) => ({ ticket_type_id: ticket_id, quantity })),
                ]
            })
        }
        console.log(res);
        if (res.res_status !== 200 && res.res_status !== 201) {
            openFailModal({
                title: t("error_occurred"),
                description: t("try_again_later"),
                buttonText: t("ok"),
                buttonOnClick: closeAllModal,
            });
            setIsSubmitDisable(false);
            return;
        }
        refresh();
        router.push('/ticket/checkout?date=' + searchParams.get('date'));
        setIsSubmitDisable(false);
    }

    return (
        <div className="bg-[url('/images/bg16-ticket.png')] bg-cover bg-bottom min-h-screen relative pb-[120px] pt-safe">
            <div className="flex flex-row items-center justify-between w-full pt-[17px] px-[20px]">
                <Link href="/ticket/date" className="">
                    <BackButton />
                </Link>
                <h1 className="font-semibold text-[22px]">{t("select_ticket")}</h1>
                <div className="">
                    <InfoButton />

                </div>
            </div>
            <div className="mt-[31px] w-full px-[20px] pb-[120px]">
                {ticketListLoading || isCartLoading && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg p-4 h-[200px] shadow-md animate-pulse">
                        </div>

                        <div className="bg-white rounded-lg p-4 h-[200px] shadow-md animate-pulse">
                        </div>
                    </div>
                )}

                {!ticketListLoading && ticketList?.data && Object.keys(ticketList.data).map((categoryName) => (
                    <div key={categoryName} className="mb-6">
                        <div className="bg-white rounded-lg p-4 shadow-md">
                            <h2 className="text-lg font-semibold mb-4 underline">
                                {categoryName}
                            </h2>

                            {ticketList.data[categoryName].map((ticket, index) => {
                                const quantity = ticketQuantities[ticket.id] || 0;
                                const itemTotal = calculatePromoPrice(quantity, ticket.price, ticket.promos);

                                return (
                                    <div
                                        key={ticket.id}
                                        className={`flex justify-between items-center ${index < ticketList.data[categoryName].length - 1 ? 'mb-4' : ''}`}
                                    >
                                        <div>
                                            <p className="font-medium text-gray-800">{ticket.name}</p>
                                            <p className="text-sm text-gray-500">RM {ticket.price}</p>
                                        </div>
                                        <div className="flex items-center gap-3">

                                            <button
                                                onClick={() => updateTicket(ticket.id, 'minus')}
                                                className="rounded-full size-[40px] bg-[#5C7A47] hover:scale-110 transition-all items-center justify-center flex border-white border-[2px] shadow-[0px_3px_0px_0px_rgba(57,83,39,1)]"
                                                type="button"
                                            >
                                                <Minus className="text-white" size={20} />
                                            </button>
                                            <span className="text-xl font-semibold w-8 text-center">
                                                {ticketQuantities[ticket.id] || 0}
                                            </span>
                                            <button
                                                onClick={() => updateTicket(ticket.id, 'plus')}
                                                className="rounded-full size-[40px] bg-[#5C7A47] hover:scale-110 transition-all items-center justify-center flex border-white border-[2px] shadow-[0px_3px_0px_0px_rgba(57,83,39,1)]"
                                                type="button"
                                            >
                                                <Plus className="text-white" size={20} />
                                            </button>

                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}


            </div>
            <div className="fixed bottom-0 bg-white py-[20px] px-[25px] rounded-t-[20px] w-full drop-shadow-md">
                <div className="text-[13px] text-[#60756E] mb-2">
                    <h1>
                        {t("your_selection")}
                    </h1>
                </div>
                <div className="text-[13px] space-y-1 mb-3">
                    {ticketList?.data && Object.values(ticketList.data)
                        .flat()
                        .filter(ticket => ticketQuantities[ticket.id] > 0)
                        .map(ticket => {
                            const quantity = ticketQuantities[ticket.id];
                            const itemTotal = calculatePromoPrice(quantity, ticket.price, ticket.promos);
                            return (
                                <div key={ticket.id} className="flex justify-between items-center">
                                    <span className="text-gray-700">
                                        {ticket.name} x{quantity}
                                    </span>
                                    <span className="text-[#313F3A] font-medium">
                                        RM {itemTotal.toFixed(2)}
                                    </span>
                                </div>
                            );
                        })}
                    {ticketList?.data && Object.values(ticketList.data).flat().filter(ticket => ticketQuantities[ticket.id] > 0).length === 0 && (
                        <p className="text-gray-500">{t("empty")}</p>
                    )}
                </div>
                <div className="border-t border-gray-200 pt-2 mb-2">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-[14px]">{t("total")}</span>
                        <span className="text-[#313F3A] font-semibold text-[16px]">
                            RM {ticketList?.data && Object.values(ticketList.data)
                                .flat()
                                .filter(ticket => ticketQuantities[ticket.id] > 0)
                                .reduce((total, ticket) => {
                                    const quantity = ticketQuantities[ticket.id];
                                    const price = calculatePromoPrice(quantity, ticket.price, ticket.promos);
                                    return total + price;
                                }, 0)
                                .toFixed(2) || '0.00'}
                        </span>
                    </div>
                </div>

                <form onSubmit={submitHandler}>
                    <div className=" mt-[16px]">
                        <div className="pb-2 py-1 pl-1 pr-3 w-full group bg-white  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">
                            <SubmitButton isDisabled={isSubmitDisable}>
                                {t("next")}
                            </SubmitButton>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}
