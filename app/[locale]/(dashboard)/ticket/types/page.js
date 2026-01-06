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
import { formatToLocalDate } from '@/lib/helper'
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
    const { data: cartData, isLoading: isCartLoading } = useGetCart({ visit_date: searchParams.get('date') });

    const isNewCart = cartData?.res_status != 200;
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
        router.push('/ticket/checkout?date=' + searchParams.get('date'));
        setIsSubmitDisable(false);
    }

    return (
        <div className="bg-[#F5FEBB] min-h-screen relative pb-[120px]">
            <div className="flex flex-row items-center justify-between w-full pt-[17px] px-[20px]">
                <Link href="/ticket/date" className="">
                    <BackButton />
                </Link>
                <h1 className="font-semibold text-[22px]">{t("select_ticket")}</h1>
                <div className="">
                    <InfoButton />

                </div>
            </div>

            <div className="mt-[31px] w-full px-[20px]">
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

                            {ticketList.data[categoryName].map((ticket, index) => (
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
                                            onClick={() => updateTicket(ticket.id, 'plus')}
                                            className="rounded-full size-[40px] bg-[#5C7A47] hover:scale-110 transition-all items-center justify-center flex border-white border-[2px] shadow-[0px_3px_0px_0px_rgba(57,83,39,1)]"
                                            type="button"
                                        >
                                            <Plus className="text-white" size={20} />
                                        </button>
                                        <span className="text-xl font-semibold w-8 text-center">
                                            {ticketQuantities[ticket.id] || 0}
                                        </span>
                                        <button
                                            onClick={() => updateTicket(ticket.id, 'minus')}
                                            className="rounded-full size-[40px] bg-[#5C7A47] hover:scale-110 transition-all items-center justify-center flex border-white border-[2px] shadow-[0px_3px_0px_0px_rgba(57,83,39,1)]"
                                            type="button"
                                        >
                                            <Minus className="text-white" size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}


            </div>
            <div className="fixed bottom-0 bg-white py-[20px] px-[25px] rounded-t-[20px] w-full drop-shadow-md">
                <div className="text-[13px] text-[#60756E]">
                    <h1>
                        {t("your_selection")}
                    </h1>
                </div>
                <div className="text-[13px] flex flex-row justify-between gap-x-[50px] items-center">
                    <p>
                        {ticketList?.data && Object.values(ticketList.data)
                            .flat()
                            .filter(ticket => ticketQuantities[ticket.id] > 0)
                            .map(ticket => `${ticket.name} x${ticketQuantities[ticket.id]}`)
                            .join(' · ') || t("empty")}
                    </p>
                    <p className="text-[#313F3A] ">
                        RM {ticketList?.data && Object.values(ticketList.data)
                            .flat()
                            .filter(ticket => ticketQuantities[ticket.id] > 0)
                            .reduce((total, ticket) => total + (ticket.price * ticketQuantities[ticket.id]), 0)
                            .toFixed(2) || '0.00'}
                    </p>
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
