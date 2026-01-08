'use client'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

export default function TicketItem({ passType, quantity, price, date }) {
    const searchParams = useSearchParams()
    const t = useTranslations()

    return (
        <div>
            <div className="flex justify-between items-start mb-[8px]">
                <h3 className="text-[16px] font-semibold">{passType}</h3>
                <Link href={`/ticket/types?date=${date || searchParams.get('date')}`} className="text-[#6B8E23] text-[14px] font-medium underline">
                    {t("edit")}
                </Link>
            </div>
            <div className="flex justify-between items-center text-[14px] text-gray-600">
                <span>{passType}</span>
                <div className="flex items-center justify-between w-[100px]">
                    <span>{quantity}</span>
                    <span className="font-semibold text-black">RM{price.toFixed(2)}</span>
                </div>

            </div>
        </div>
    )
}
