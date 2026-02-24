'use client'
import BottomNavBar from "@/components/bottom-nav-bar";
import LanguageGlobe from "@/components/language-globe";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useContext } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import BackButton from "@/components/back-button";
import VoucherCard from "../../profile/vouchers/_components/voucher-card";
import { useGetVouchers } from "@/lib/hooks/useGetVouchers";
import { useVoucher } from "@/lib/actions";
import { useGetCart } from "@/lib/hooks/useGetCart";
import { PopupContext } from "@/components/context/PopupProvider";
import { getLeftTitle } from "@/lib/helper";

export default function page({ children }) {
    const t = useTranslations();
    const router = useRouter();
    const { data: cartData, isLoading: cartLoading, refresh: refreshCart } = useGetCart();
    const { openFailModal, closeAllModal } = useContext(PopupContext);
    const [isLoadingVoucher, setIsLoadingVoucher] = React.useState(null);
    const { data, isLoading, isError } = useGetVouchers({ per_page: 10, page: 1, user_voucher: 2 });

    const vouchers = data?.data ?? [];

    const handleApplyVoucher = async (id) => {
        if (isLoadingVoucher) return; // Prevent multiple clicks
        if (!id) {
            // If no id is passed, remove the current voucher
            try {
                const res = await useVoucher({ voucher_code: null });
                console.log(res);
                // Refresh cart data after removing voucher
                await refreshCart();
            } catch (error) {
                alert('Failed to remove voucher');
            }
            setIsLoadingVoucher(null);
            return;
        }
        const voucher = vouchers.find(v => v.id === id);
        if (voucher) {

            const res = await useVoucher({ voucher_code: voucher.promo_code });
            console.log(res);
            // Refresh cart data after applying voucher
            await refreshCart();
            // Navigate back to checkout
            // router.push('/ticket/checkout');
            if (res.res_status == 422) {
                openFailModal({
                    title: t("failed_to_apply_voucher"),
                    description: res.message || t("failed_to_apply_voucher_desc"),
                    buttonText: t("try_again"),
                    buttonOnClick: () => {
                        closeAllModal();
                    }
                })
            }
        }
        setIsLoadingVoucher(null);
    };

    if (isLoading) return <div className="flex justify-center p-8">Loading...</div>;
    if (isError) return <div className="flex justify-center p-8">Failed to load vouchers.</div>;

    return (
        <>
            <div className="min-h-screen  bg-[url('/images/bg4-home.png')] bg-cover bg-bottom   pt-safe pb-[12px] px-4">
                <div className="flex flex-row items-center justify-center">
                    <Link className="absolute left-4" href="/ticket/checkout">
                        <BackButton />
                    </Link>
                    <h1 className="text-[22px] font-semibold">{t('vouchers')}</h1>
                    <div />
                </div>

                <div className="mt-[36px] flex flex-col ">
                    <div className="">
                        <div className="flex flex-col w-full gap-[16px]">
                            {vouchers.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
                                    <i className="icon-voucher text-5xl mb-4" />
                                    <p className="text-lg font-semibold">{t("no_vouchers_title")}</p>
                                    <p className="text-sm">{t("no_vouchers_desc")}</p>
                                </div>
                            ) : (
                                vouchers.map((voucher) => {
                                    const isSelected = cartData.data.cart.voucher_code === voucher.promo_code;
                                    const isLoading = isLoadingVoucher === voucher.id;
                                    return (
                                        <div key={voucher.id}
                                            onClick={() => {
                                                setIsLoadingVoucher(voucher.id);

                                                isSelected ? handleApplyVoucher() : handleApplyVoucher(voucher.id)
                                            }}

                                        >

                                            <VoucherCard
                                                id={voucher.id}
                                                leftTitle={getLeftTitle(voucher)}
                                                voucherTitle={voucher.title}
                                                icon="icon-voucher"
                                                points={null}
                                                description={voucher.voucher_type_label}
                                                isSelected={isSelected}
                                                isLoading={isLoading}
                                            />
                                        </div>

                                    )
                                })
                            )}
                        </div>
                    </div>
                </div>

            </div>


        </>

    );
}
