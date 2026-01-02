
import SubmitButton from '@/components/auth/submit-btn'
import BackButton from '@/components/back-button'
import { modalList, PopupContext } from '@/components/context/PopupProvider'
import InfoButton from '@/components/info/info-button'
import { Link } from '@/i18n/navigation'
import { getTicketList } from '@/lib/actions'
import { Info } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import React, { useContext } from 'react'

export default async function page() {
    const t = await getTranslations()
    const ticketTypes = (await getTicketList()).data
    return (
        <div className="bg-[#F5FEBB] min-h-screen relative">
            <div className="flex flex-row items-center justify-center w-full pt-[17px] px-[20px]">

                <h1 className="font-semibold text-[22px]">{t("ticket")}</h1>

                <Link href="/" className="absolute left-[12px] top-[17px]">
                    <BackButton />
                </Link>
            </div>
            <div className="grid grid-cols-3 gap-2 p-4 mt-[21px] px-[20px]">
                {/* Header */}
                <div className="col-span-3 text-center text-white bg-[#804118]">
                    <h1>{t("price")}</h1>
                </div>

                {/* Column Headers */}
                <div></div>
                <div className="text-center bg-[#A1942E] text-white">My Kad</div>
                <div className="text-center bg-[#A1942E] text-white">Normal</div>

                {/* Malaysia Tickets */}
                {ticketTypes?.malaysia?.map((ticket, index) => {
                    const internationalTicket = ticketTypes?.international?.find(
                        (intTicket) => intTicket.name === ticket.name
                    ) || ticketTypes?.international?.[index];

                    return (
                        <React.Fragment key={ticket.id}>
                            <div className="bg-[#804118] text-white px-[12px]">{ticket.name}</div>
                            <div className="text-center bg-[#804118] text-white px-[12px] ">RM{ticket.price}</div>
                            <div className="text-center bg-[#804118] text-white px-[12px]">
                                {internationalTicket ? `RM${internationalTicket.price}` : '-'}
                            </div>
                        </React.Fragment>
                    );
                })}


            </div>
            <div className="mt-[32px] px-[20px] flex flex-row gap-x-[13px] items-center">
                <div className="pb-2 py-1 pl-1 pr-3 w-full group bg-white rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">
                    <Link href="/ticket/date">
                        <SubmitButton>
                            {t("purchase_ticket")}
                        </SubmitButton>
                    </Link>
                </div>
                <div>
                    <InfoButton />
                </div>
            </div>


        </div>
    )
}
