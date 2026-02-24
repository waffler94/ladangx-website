'use client'
import React from "react";
import VoucherCard from "../_components/voucher-card";
import { useGetVouchers } from "@/lib/hooks/useGetVouchers";
import { useTranslations } from "use-intl";
import { getLeftTitle } from "@/lib/helper";

export default function page() {
    const t = useTranslations();
    const { data, isLoading, isError } = useGetVouchers({ per_page: 10, page: 1, user_voucher: 2 });

    if (isLoading) return <div className="flex justify-center p-8">Loading...</div>;
    if (isError) return <div className="flex justify-center p-8">Failed to load vouchers.</div>;

    const vouchers = data?.data ?? [];

    return (
        <div className="">
            <div className="flex flex-col w-full gap-[16px]">

                {vouchers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
                        <i className="icon-voucher text-5xl mb-4" />
                        <p className="text-lg font-semibold">{t("no_vouchers_title")}</p>
                        <p className="text-sm">{t("no_vouchers_desc")}</p>
                    </div>
                ) : (
                    vouchers.map((voucher) => (
                        <VoucherCard
                            key={voucher.id}
                            id={voucher.id}
                            leftTitle={getLeftTitle(voucher)}
                            voucherTitle={voucher.title}
                            icon="icon-voucher"
                            points={null}
                            description={voucher.voucher_type_label}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
