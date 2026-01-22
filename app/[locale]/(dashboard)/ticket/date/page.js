'use client'
import SubmitButton from '@/components/auth/submit-btn'
import BackButton from '@/components/back-button'
import { PopupContext } from '@/components/context/PopupProvider'
import InfoButton from '@/components/info/info-button'
import { Calendar } from '@/components/ui/calendar'
import { Link, useRouter } from '@/i18n/navigation'
import { getTicketDateAvailability } from '@/lib/actions'
import { formatToLocalDate } from '@/lib/helper'
import { useTranslations } from 'next-intl'
import React, { useContext, useEffect } from 'react'
import "./daypicker.css"

export default function page() {
    const [isSubmitDisable, setIsSubmitDisable] = React.useState(false);
    const { openFailModal, closeAllModal } = useContext(PopupContext)
    const [date, setDate] = React.useState()
    const t = useTranslations()
    const router = useRouter()

    useEffect(() => {
        const storedDate = localStorage.getItem('ticket_date')
        if (storedDate) {
            setDate(new Date(storedDate))
        }
    }, [])

    const onSelectDate = async (e) => {
        if (!e) return
        setIsSubmitDisable(true)

        const localDate = formatToLocalDate(e)
        const res = await getTicketDateAvailability({ target_date: localDate })
        console.log(res)

        if (res.data.is_closed) {
            openFailModal({
                title: t("date_unavailable_title"),
                description: res.data.closure_reason,
                buttonText: t("ok"),
                buttonOnClick: closeAllModal,

            })
            setIsSubmitDisable(false)
            return
        }
        setDate(e)
        setIsSubmitDisable(false)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (!date) {
            openFailModal({
                title: t("no_date_selected"),
                description: t("no_date_desc"),
                buttonText: t("ok"),
                buttonOnClick: closeAllModal,

            })
        }
        localStorage.setItem('ticket_date', date?.toISOString())
        router.push("/ticket/types?date=" + formatToLocalDate(date))
    }

    return (
        <div className="bg-[url('/images/bg16-ticket.png')] bg-cover bg-bottom min-h-screen relative pt-safe">
            <div className="flex flex-row items-center justify-between w-full pt-[17px] px-[20px] flex-shrink-0">
                <Link href="/" className="">
                    <BackButton />
                </Link>
                <h1 className="font-semibold text-[22px]">{t("select_visit_date")}</h1>


                <div className="">
                    <InfoButton />

                </div>

            </div>

            <div className="flex flex-col px-[20px] max-w-[500px] mx-auto  pb-32">

                <Calendar
                    onSelect={onSelectDate}
                    selected={date}
                    mode="single"

                    disabled={(date) => {
                        const yesterday = new Date();
                        yesterday.setDate(yesterday.getDate() - 1);
                        return date < yesterday;
                    }}
                    fixedWeeks
                    className="rounded-md border shadow-sm mt-[31px] w-full aspect-square    bg-white"

                />


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
