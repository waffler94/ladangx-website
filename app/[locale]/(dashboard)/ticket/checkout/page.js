'use client'
import SubmitButton from '@/components/auth/submit-btn'
import BackButton from '@/components/back-button'
import TicketItem from '@/components/ticket/ticket-item'
import { Link, useRouter } from '@/i18n/navigation'
import { useGetTicketAvailability } from '@/lib/hooks/useGetTicketAvailability'
import { formatToLocalDate } from '@/lib/helper'
import { createUserVisit } from '@/lib/actions'
import { Calendar, ChevronRight, Clock, Ticket, UsersRound } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { useContext } from 'react'
import { modalList, PopupContext } from '@/components/context/PopupProvider'

export default function page() {
    const t = useTranslations()
    const [isSubmitDisable, setIsSubmitDisable] = React.useState(false)
    const [malaysianTickets, setMalaysianTickets] = React.useState({ child: 0, adult: 0, senior: 0 })
    const [date, setDate] = React.useState(null)
    const router = useRouter()
    const [internationalTickets, setInternationalTickets] = React.useState({ child: 0, adult: 0, senior: 0 })
    const [timeLeft, setTimeLeft] = React.useState(600) // 10 minutes in seconds
    const { data, isLoading } = useGetTicketAvailability({ target_date: date ? formatToLocalDate(date) : undefined })
    const { openModal, closeAllModal } = useContext(PopupContext)
    React.useEffect(() => {
        const date = localStorage.getItem('ticket_date')
        const malaysian = localStorage.getItem('malaysian_tickets')
        const international = localStorage.getItem('international_tickets')
        if (date) setDate(new Date(date))
        if (malaysian) setMalaysianTickets(JSON.parse(malaysian))
        if (international) setInternationalTickets(JSON.parse(international))
    }, [])

    React.useEffect(() => {
        if (timeLeft <= 0) return

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft])

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const getGuestSummary = () => {
        const totalAdults = malaysianTickets.adult + internationalTickets.adult
        const totalChildren = malaysianTickets.child + internationalTickets.child
        const totalSeniors = malaysianTickets.senior + internationalTickets.senior

        const parts = []
        if (totalAdults > 0) parts.push(`${totalAdults} ${totalAdults === 1 ? 'adult' : 'adults'}`)
        if (totalChildren > 0) parts.push(`${totalChildren} ${totalChildren === 1 ? 'child' : 'children'}`)
        if (totalSeniors > 0) parts.push(`${totalSeniors} ${totalSeniors === 1 ? 'senior' : 'seniors'}`)

        return parts.join(', ')
    }

    const calculateSubtotal = () => {
        if (!data?.data?.ticket_types) return 0

        let total = 0

        // Malaysian tickets
        if (malaysianTickets.adult > 0) {
            const adultPrice = data.data.ticket_types.malaysia.find(t => t.ticket_type_name.includes('Adult'))?.price || 0
            total += malaysianTickets.adult * adultPrice
        }
        if (malaysianTickets.child > 0) {
            const childPrice = data.data.ticket_types.malaysia.find(t => t.ticket_type_name.includes('Child'))?.price || 0
            total += malaysianTickets.child * childPrice
        }
        if (malaysianTickets.senior > 0) {
            const seniorPrice = data.data.ticket_types.malaysia.find(t => t.ticket_type_name.includes('Senior'))?.price || 0
            total += malaysianTickets.senior * seniorPrice
        }

        // International tickets
        if (internationalTickets.adult > 0) {
            const adultPrice = data.data.ticket_types.international.find(t => t.ticket_type_name.includes('Adult'))?.price || 0
            total += internationalTickets.adult * adultPrice
        }
        if (internationalTickets.child > 0) {
            const childPrice = data.data.ticket_types.international.find(t => t.ticket_type_name.includes('Child'))?.price || 0
            total += internationalTickets.child * childPrice
        }
        if (internationalTickets.senior > 0) {
            const seniorPrice = data.data.ticket_types.international.find(t => t.ticket_type_name.includes('Senior'))?.price || 0
            total += internationalTickets.senior * seniorPrice
        }

        return total
    }

    const calculateTax = (amount) => {
        return amount * 0.06 // 6% tax
    }

    const calculateTotal = () => {
        const subtotal = calculateSubtotal()
        const tax = calculateTax(subtotal)
        return subtotal + tax
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setIsSubmitDisable(true)

        try {
            // Build details array
            const details = []

            // Malaysian tickets
            if (malaysianTickets.adult > 0) {
                const adultTicket = data.data.ticket_types.malaysia.find(t => t.ticket_type_name.includes('Adult'))
                if (adultTicket) {
                    details.push({
                        ticket_type_id: adultTicket.ticket_type_id,
                        quantity: malaysianTickets.adult
                    })
                }
            }
            if (malaysianTickets.child > 0) {
                const childTicket = data.data.ticket_types.malaysia.find(t => t.ticket_type_name.includes('Child'))
                if (childTicket) {
                    details.push({
                        ticket_type_id: childTicket.ticket_type_id,
                        quantity: malaysianTickets.child
                    })
                }
            }
            if (malaysianTickets.senior > 0) {
                const seniorTicket = data.data.ticket_types.malaysia.find(t => t.ticket_type_name.includes('Senior'))
                if (seniorTicket) {
                    details.push({
                        ticket_type_id: seniorTicket.ticket_type_id,
                        quantity: malaysianTickets.senior
                    })
                }
            }

            // International tickets
            if (internationalTickets.adult > 0) {
                const adultTicket = data.data.ticket_types.international.find(t => t.ticket_type_name.includes('Adult'))
                if (adultTicket) {
                    details.push({
                        ticket_type_id: adultTicket.ticket_type_id,
                        quantity: internationalTickets.adult
                    })
                }
            }
            if (internationalTickets.child > 0) {
                const childTicket = data.data.ticket_types.international.find(t => t.ticket_type_name.includes('Child'))
                if (childTicket) {
                    details.push({
                        ticket_type_id: childTicket.ticket_type_id,
                        quantity: internationalTickets.child
                    })
                }
            }
            if (internationalTickets.senior > 0) {
                const seniorTicket = data.data.ticket_types.international.find(t => t.ticket_type_name.includes('Senior'))
                if (seniorTicket) {
                    details.push({
                        ticket_type_id: seniorTicket.ticket_type_id,
                        quantity: internationalTickets.senior
                    })
                }
            }

            // Create visit
            const result = await createUserVisit({
                visit_date: formatToLocalDate(date),
                details
            })
            console.log(result)
            if (result.res_status === 200 || result.res_status === 201) {

                openModal(modalList.successPay.key, { orderId: result.data.id })


            } else {
                throw new Error('Failed to create visit')
            }
        } catch (error) {
            console.error('Error creating visit:', error)
            // You might want to show an error modal here
            setIsSubmitDisable(false)
        }
    }


    if (isLoading) {
        return <div className="bg-[#F5FEBB] min-h-screen relative flex items-center justify-center">Loading...</div>
    }
    return (
        <div className="bg-[#F5FEBB] min-h-screen relative">
            <div className="flex flex-row items-center justify-center w-full pt-[17px] px-[20px]">

                <h1 className="font-semibold text-[22px]">{t("review_order")}</h1>

                <Link href="/ticket/date" className="absolute left-[12px] top-[17px]">
                    <BackButton />
                </Link>
            </div>
            <div className="mt-[31px] w-full px-[20px] pb-[200px]">
                {/* Connected Container */}
                <div className="bg-white rounded-[20px] shadow-md">
                    {/* Cart Header */}
                    <div className="p-[20px]">
                        <div className="flex justify-between items-center mb-[24px]">
                            <h2 className="underline font-semibold">{t("your_cart")}</h2>
                            <div className="flex items-center gap-[6px] text-[#E74C3C]">
                                <Clock size={20} className="text-[#E74C3C]" />
                                <span className="text-[13px] font-semibold">{t("time_left")}: {formatTime(timeLeft)}</span>
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="space-y-[16px]">
                            {/* Malaysian Tickets */}
                            {malaysianTickets.adult >= 1 && (
                                <TicketItem
                                    passType="malaysian_one_day_pass"
                                    categoryType="adult"
                                    quantity={malaysianTickets.adult}
                                    price={malaysianTickets.adult * data.data.ticket_types.malaysia.find(t => t.ticket_type_name.includes('Adult')).price}
                                />
                            )}

                            {malaysianTickets.adult >= 1 && malaysianTickets.child >= 1 && (
                                <div className="border-t border-gray-200"></div>
                            )}

                            {malaysianTickets.child >= 1 && (
                                <TicketItem
                                    passType="malaysian_one_day_pass"
                                    categoryType="child"
                                    quantity={malaysianTickets.child}
                                    price={malaysianTickets.child * data.data.ticket_types.malaysia.find(t => t.ticket_type_name.includes('Child')).price}
                                />
                            )}

                            {((malaysianTickets.adult >= 1 || malaysianTickets.child >= 1) && malaysianTickets.senior >= 1) && (
                                <div className="border-t border-gray-200"></div>
                            )}

                            {malaysianTickets.senior >= 1 && (
                                <TicketItem
                                    passType="malaysian_one_day_pass"
                                    categoryType="senior_citizen"
                                    quantity={malaysianTickets.senior}
                                    price={malaysianTickets.senior * data.data.ticket_types.malaysia.find(t => t.ticket_type_name.includes('Senior')).price}
                                />
                            )}

                            {/* International Tickets */}
                            {((malaysianTickets.adult >= 1 || malaysianTickets.child >= 1 || malaysianTickets.senior >= 1) &&
                                (internationalTickets.adult >= 1 || internationalTickets.child >= 1 || internationalTickets.senior >= 1)) && (
                                    <div className="border-t border-gray-200"></div>
                                )}

                            {internationalTickets.adult >= 1 && (
                                <TicketItem
                                    passType="international_one_day_pass"
                                    categoryType="adult"
                                    quantity={internationalTickets.adult}
                                    price={internationalTickets.adult * data.data.ticket_types.international.find(t => t.ticket_type_name.includes('Adult')).price}
                                />
                            )}

                            {internationalTickets.adult >= 1 && internationalTickets.child >= 1 && (
                                <div className="border-t border-gray-200"></div>
                            )}

                            {internationalTickets.child >= 1 && (
                                <TicketItem
                                    passType="international_one_day_pass"
                                    categoryType="child"
                                    quantity={internationalTickets.child}
                                    price={internationalTickets.child * data.data.ticket_types.international.find(t => t.ticket_type_name.includes('Child')).price}
                                />
                            )}

                            {((internationalTickets.adult >= 1 || internationalTickets.child >= 1) && internationalTickets.senior >= 1) && (
                                <div className="border-t border-gray-200"></div>
                            )}

                            {internationalTickets.senior >= 1 && (
                                <TicketItem
                                    passType="international_one_day_pass"
                                    categoryType="senior_citizen"
                                    quantity={internationalTickets.senior}
                                    price={internationalTickets.senior * data.data.ticket_types.international.find(t => t.ticket_type_name.includes('Senior')).price}
                                />
                            )}
                        </div>

                        {/* Booking Details */}
                        <div className="mt-[20px] border border-[#CFDDCF] rounded-[12px] p-[16px]">
                            <div className="flex items-center gap-[8px] mb-[8px]">
                                <Calendar size={20} className="text-gray-700" />
                                <span className="text-[14px] text-gray-700">{date ? date.toLocaleDateString() : ""}</span>
                            </div>
                            <div className="flex items-center gap-[8px] mb-[12px]">
                                <UsersRound size={20} className="text-gray-700" />
                                <span className="text-[14px] text-gray-700">{getGuestSummary()}</span>
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
                                <span className="font-medium">RM{calculateSubtotal().toFixed(2)}</span>
                            </div>
                            {/* <div className="flex justify-between text-[14px]">
                                <span className="text-gray-600">{t("voucher")}</span>
                                <span className="font-medium text-green-600">-RM10.00</span>
                            </div> */}
                            <div className="flex justify-between text-[14px]">
                                <span className="text-gray-600">{t("tax")} (6%)</span>
                                <span className="font-medium">RM{calculateTax(calculateSubtotal()).toFixed(2)}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-[12px]">
                                <div className="flex justify-between">
                                    <span className="text-[16px] font-semibold">{t("total_payment")}</span>
                                    <span className="text-[18px] font-semibold text-[#6B8E23]">RM{calculateTotal().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 bg-white py-[20px] px-[25px] rounded-t-[20px] w-full drop-shadow-md">

                <form onSubmit={submitHandler}>
                    <div className="">
                        <div className="pb-2 py-1 pl-1 pr-3 w-full group bg-white  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">
                            <SubmitButton isDisabled={isSubmitDisable}>
                                {t("pay_now")}
                            </SubmitButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
