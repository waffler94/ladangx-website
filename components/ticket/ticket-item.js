import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function TicketItem({ passType, categoryType, quantity, price }) {
    const t = useTranslations()

    return (
        <div>
            <div className="flex justify-between items-start mb-[8px]">
                <h3 className="text-[16px] font-semibold">{t(passType)}</h3>
                <Link href="/ticket/types" className="text-[#6B8E23] text-[14px] font-medium underline">
                    {t("edit")}
                </Link>
            </div>
            <div className="flex justify-between items-center text-[14px] text-gray-600">
                <span>{t(categoryType)}</span>
                <div className="flex items-center justify-between w-[100px]">
                    <span>{quantity}</span>
                    <span className="font-semibold text-black">RM{price.toFixed(2)}</span>
                </div>

            </div>
        </div>
    )
}
