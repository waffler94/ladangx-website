'use client'
import React, { useContext } from 'react'
import SubmitButton from '@/components/auth/submit-btn'
import { createUserVisit, createVisit } from '@/lib/actions'
import { modalList, PopupContext } from '@/components/context/PopupProvider'
import { useTranslations } from 'next-intl'
import { useGetCart } from '@/lib/hooks/useGetCart'
import { useSearchParams } from 'next/navigation'
import { useRouter } from '@/i18n/navigation'

export default function CheckoutForm() {
    const t = useTranslations()
    const date = useSearchParams().get('date')
    const [isSubmitDisable, setIsSubmitDisable] = React.useState(false)
    const { data: cartData } = useGetCart({ visit_date: date });
    const { openModal } = useContext(PopupContext)
    const router = useRouter()

    const submitHandler = async (e) => {
        e.preventDefault()
        setIsSubmitDisable(true)

        try {
            if (!cartData?.data?.cart?.items) {
                throw new Error('No cart items')
            }
            const result = await createVisit({
                cart_id: cartData.data.cart_id,
            })
            console.log(result)


            if (result.res_status === 200 || result.res_status === 201) {
                router.push('/payment?url=' + encodeURIComponent(result.data.payment_url))
            } else {
                throw new Error('Failed to create visit')
            }
        } catch (error) {
            // You might want to show an error modal here
            setIsSubmitDisable(false)
        }
    }

    return (
        <div className="fixed bottom-0 bg-white py-[20px] px-[25px] rounded-t-[20px] w-full drop-shadow-md">
            <form onSubmit={submitHandler}>
                <div className="">
                    <div className="pb-2 py-1 pl-1 pr-3 w-full group bg-white rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">
                        <SubmitButton isDisabled={isSubmitDisable}>
                            {t("pay_now")}
                        </SubmitButton>
                    </div>
                </div>
            </form>
        </div>
    )
}
