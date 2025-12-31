'use client'
import BackButton from '@/components/back-button'
import { Link, useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import React, { useContext, useEffect, useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import SubmitButton from '@/components/auth/submit-btn'
import { PopupContext } from '@/components/context/PopupProvider'

export default function page() {
    const { openFailModal, closeAllModal } = useContext(PopupContext)
    const router = useRouter()
    const [isSubmitDisable, setIsSubmitDisable] = useState(false);
    const [malaysianTickets, setMalaysianTickets] = useState({
        child: 0,
        adult: 0,
        senior: 0
    })

    const [internationalTickets, setInternationalTickets] = useState({
        child: 0,
        adult: 0,
        senior: 0
    })

    useEffect(() => {
        // init the ticket from localstorage
        const savedMalaysian = localStorage.getItem('malaysian_tickets')
        const savedInternational = localStorage.getItem('international_tickets')
        if (savedMalaysian) {
            setMalaysianTickets(JSON.parse(savedMalaysian))
        }
        if (savedInternational) {
            setInternationalTickets(JSON.parse(savedInternational))
        }

    }, [])

    const updateTicket = (type, category, operation) => {
        const setter = type === 'malaysian' ? setMalaysianTickets : setInternationalTickets
        setter(prev => ({
            ...prev,
            [category]: operation === 'plus' ? prev[category] + 1 : Math.max(0, prev[category] - 1)
        }))
    }
    const t = useTranslations()
    const submitHandler = (e) => {
        // detect if all ticket is 0 then error
        e.preventDefault()
        const totalTickets = Object.values(malaysianTickets).reduce((a, b) => a + b, 0) +
            Object.values(internationalTickets).reduce((a, b) => a + b, 0)
        if (totalTickets === 0) {
            openFailModal({
                title: t("no_ticket_title"),
                description: t("no_ticket_desc"),
                buttonText: t("ok"),
                buttonOnClick: closeAllModal
            })
            return
        }
        localStorage.setItem('malaysian_tickets', JSON.stringify(malaysianTickets))
        localStorage.setItem('international_tickets', JSON.stringify(internationalTickets))
        router.push("/ticket/checkout")

    }
    return (
        <div className="bg-[#F5FEBB] min-h-screen relative">
            <div className="flex flex-row items-center justify-center w-full pt-[17px] px-[20px]">

                <h1 className="font-semibold text-[22px]">{t("select_ticket")}</h1>

                <Link href="/ticket/date" className="absolute left-[12px] top-[17px]">
                    <BackButton />
                </Link>
            </div>
            <div className="mt-[31px] w-full px-[20px] ">
                {/* Malaysian Section */}
                <div className="bg-white rounded-lg p-4 shadow-md rounded-b-none">
                    <h2 className="text-lg font-semibold mb-4 underline">Malaysian ( My Kad ) : One Day Pass</h2>

                    {/* Child */}
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="font-medium text-gray-800">Child</p>
                            <p className="text-sm text-gray-500">3 - 12 Years Old</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => updateTicket('malaysian', 'child', 'plus')}
                                className="rounded-full size-[40px] bg-[#5C7A47] hover:scale-110 transition-all items-center justify-center flex border-white border-[2px] shadow-[0px_3px_0px_0px_rgba(57,83,39,1)]"
                            >
                                <Plus className="text-white" size={20} />
                            </button>
                            <span className="text-xl font-semibold w-8 text-center">{malaysianTickets.child}</span>
                            <button
                                onClick={() => updateTicket('malaysian', 'child', 'minus')}
                                className="rounded-full size-[40px] bg-[#5C7A47] hover:scale-110 transition-all items-center justify-center flex border-white border-[2px] shadow-[0px_3px_0px_0px_rgba(57,83,39,1)]"
                            >
                                <Minus className="text-white" size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Adult */}
                    <div className="flex justify-between items-center mb-4 ">
                        <div>
                            <p className="font-medium text-gray-800">Adult</p>
                            <p className="text-sm text-gray-500">13 - 59 Years Old</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => updateTicket('malaysian', 'adult', 'plus')}
                                className="rounded-full size-[40px] bg-[#5C7A47] hover:scale-110 transition-all items-center justify-center flex border-white border-[2px] shadow-[0px_3px_0px_0px_rgba(57,83,39,1)]"
                            >
                                <Plus className="text-white" size={20} />
                            </button>
                            <span className="text-xl font-semibold w-8 text-center">{malaysianTickets.adult}</span>
                            <button
                                onClick={() => updateTicket('malaysian', 'adult', 'minus')}
                                className="rounded-full size-[40px] bg-[#5C7A47] hover:scale-110 transition-all items-center justify-center flex border-white border-[2px] shadow-[0px_3px_0px_0px_rgba(57,83,39,1)]"
                            >
                                <Minus className="text-white" size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Senior Citizen */}
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium text-gray-800">Senior Citizen</p>
                            <p className="text-sm text-gray-500">60 years above</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => updateTicket('malaysian', 'senior', 'plus')}
                                className="rounded-full size-[40px] bg-[#5C7A47] hover:scale-110 transition-all items-center justify-center flex border-white border-[2px] shadow-[0px_3px_0px_0px_rgba(57,83,39,1)]"
                            >
                                <Plus className="text-white" size={20} />
                            </button>
                            <span className="text-xl font-semibold w-8 text-center">{malaysianTickets.senior}</span>
                            <button
                                onClick={() => updateTicket('malaysian', 'senior', 'minus')}
                                className="rounded-full size-[40px] bg-[#5C7A47] hover:scale-110 transition-all items-center justify-center flex border-white border-[2px] shadow-[0px_3px_0px_0px_rgba(57,83,39,1)]"
                            >
                                <Minus className="text-white" size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* International Section */}
                <div className="bg-white rounded-lg p-4 shadow-md rounded-t-none">
                    <h2 className="text-lg font-semibold mb-4 underline">International : One Day Pass</h2>

                    {/* Child */}
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="font-medium text-gray-800">Child</p>
                            <p className="text-sm text-gray-500">3 - 12 Years Old</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => updateTicket('international', 'child', 'plus')}
                                className="rounded-full size-[40px] bg-[#5C7A47] hover:scale-110 transition-all items-center justify-center flex border-white border-[2px] shadow-[0px_3px_0px_0px_rgba(57,83,39,1)]"
                            >
                                <Plus className="text-white" size={20} />
                            </button>
                            <span className="text-xl font-semibold w-8 text-center">{internationalTickets.child}</span>
                            <button
                                onClick={() => updateTicket('international', 'child', 'minus')}
                                className="rounded-full size-[40px] bg-[#5C7A47] hover:scale-110 transition-all items-center justify-center flex border-white border-[2px] shadow-[0px_3px_0px_0px_rgba(57,83,39,1)]"
                            >
                                <Minus className="text-white" size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Adult */}
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="font-medium text-gray-800">Adult</p>
                            <p className="text-sm text-gray-500">13 - 59 Years Old</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => updateTicket('international', 'adult', 'plus')}
                                className="rounded-full size-[40px] bg-[#5C7A47] hover:scale-110 transition-all items-center justify-center flex border-white border-[2px] shadow-[0px_3px_0px_0px_rgba(57,83,39,1)]"
                            >
                                <Plus className="text-white" size={20} />
                            </button>
                            <span className="text-xl font-semibold w-8 text-center">{internationalTickets.adult}</span>
                            <button
                                onClick={() => updateTicket('international', 'adult', 'minus')}
                                className="rounded-full size-[40px] bg-[#5C7A47] hover:scale-110 transition-all items-center justify-center flex border-white border-[2px] shadow-[0px_3px_0px_0px_rgba(57,83,39,1)]"
                            >
                                <Minus className="text-white" size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Senior Citizen */}
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium text-gray-800">Senior Citizen</p>
                            <p className="text-sm text-gray-500">60 years above</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => updateTicket('international', 'senior', 'plus')}
                                className="rounded-full size-[40px] bg-[#5C7A47] hover:scale-110 transition-all items-center justify-center flex border-white border-[2px] shadow-[0px_3px_0px_0px_rgba(57,83,39,1)]"
                            >
                                <Plus className="text-white" size={20} />
                            </button>
                            <span className="text-xl font-semibold w-8 text-center">{internationalTickets.senior}</span>
                            <button
                                onClick={() => updateTicket('international', 'senior', 'minus')}
                                className="rounded-full size-[40px] bg-[#5C7A47] hover:scale-110 transition-all items-center justify-center flex border-white border-[2px] shadow-[0px_3px_0px_0px_rgba(57,83,39,1)]"
                            >
                                <Minus className="text-white" size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 bg-white py-[20px] px-[25px] rounded-t-[20px] w-full drop-shadow-md">

                <form onSubmit={submitHandler}>
                    <div className="">
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
