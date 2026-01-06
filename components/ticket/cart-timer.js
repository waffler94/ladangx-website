'use client'
import { Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import React from 'react'
import { useSearchParams } from 'next/navigation'

export default function CartTimer({ initialTime = 600 }) {
    const t = useTranslations()
    const date = useSearchParams().get('date')
    const [timeLeft, setTimeLeft] = React.useState(initialTime)
    const router = useRouter()

    React.useEffect(() => {
        if (timeLeft <= 0) {
            router.push(`/ticket/types?date=${date}`)
            return
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer)
                    router.push(`/ticket/types?date=${date}`)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="flex items-center gap-[6px] text-[#E74C3C]">
            <Clock size={20} className="text-[#E74C3C]" />
            <span className="text-[13px] font-semibold">
                {t("time_left")}: {formatTime(timeLeft)}
            </span>
        </div>
    )
}
