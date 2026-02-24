"use client";
import SubmitButton from "@/components/auth/submit-btn";
import { PopupContext } from "@/components/context/PopupProvider";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { claimVoucher } from "@/lib/actions";
import { VoucherItem } from "@/lib/declaration";
import { useGetVouchers } from "@/lib/hooks/useGetVouchers";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useContext } from "react";

/**
 * VoucherDetailDrawer component displays detailed information about a voucher in a drawer modal.
 * It shows voucher title, points required, type, redeemable dates, terms & conditions, and a redeem button.
 *
 * @param {Object} props - The component props
 * @param {boolean} [props.open] - Whether the drawer is open (optional)
 * @param {Object} [props.data] - The data object containing voucher information (optional)
 * @param {VoucherItem} [props.data.data] - The voucher data to display (optional)
 * @returns {JSX.Element} The rendered drawer component
 */
export default function VoucherDetailDrawer({ open, data }) {
    const t = useTranslations();
    const { closeAllModal, openFailModal } = useContext(PopupContext);
    const { refresh } = useGetVouchers({ per_page: 10, page: 1 });
    const [isDisableSubmit, setIsDisableSubmit] = React.useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        setIsDisableSubmit(true);
        const res = await claimVoucher({ voucher_id: data.data.id });
        if (res.res_status != 200) {
            console.log(res)
            openFailModal({
                title: t("redeem_failed"),
                description: res.message || t("redeem_failed_desc"),
                buttonText: t("try_again"),
                buttonOnClick: () => {
                    closeAllModal();
                    setIsDisableSubmit(false);
                },

            });
            return
        }
        await refresh();
        closeAllModal();
        setIsDisableSubmit(false);

    };

    return (
        <Drawer open={open || false} dismissible={false}>
            <DrawerTitle></DrawerTitle>
            <DrawerContent onPointerDownOutside={closeAllModal}>

                <div className="p-[20px] max-h-[80vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-[24px]">
                        <h1 className="font-semibold text-[18px]">{t("voucher_details_title")}</h1>
                        <button onClick={closeAllModal}>
                            <ChevronDown size={24} />
                        </button>
                    </div>
                    {data?.data && (
                        <div className="space-y-[24px]">
                            {/* Voucher Info */}
                            <div>
                                <h2 className="font-semibold text-[16px] mb-[8px]">
                                    {data.data.title}
                                </h2>
                                <p className="font-semibold text-[14px] text-[#446A2A] mb-[4px]">
                                    {/* {data.data.points_required === 0 ? 'FREE' : `${data.data.points_required.toLocaleString()} pts`} */}
                                </p>
                                <p className="text-[14px] text-[#60756E]">
                                    {data.data.voucher_type_label}
                                </p>
                            </div>

                            {/* Date Redeemable */}
                            <div>
                                <h3 className="font-semibold text-[14px] mb-[8px]">
                                    {t("date_redeemable")}
                                </h3>
                                <p className="text-[14px] text-gray-600">
                                    Start from {new Date(data.data.start_date).toLocaleDateString()} until {new Date(data.data.expired_date).toLocaleDateString()}
                                </p>
                            </div>

                            {/* Terms & Conditions */}
                            <div>
                                <h3 className="font-semibold text-[14px] mb-[12px]">
                                    {t("terms_and_conditions")}
                                </h3>
                                <div className="space-y-[12px] text-[14px] text-gray-600">
                                    <p>
                                        {t("voucher_terms_1")}
                                    </p>
                                    <p>
                                        {t("voucher_terms_2")}
                                    </p>
                                    <p>
                                        {t("voucher_terms_3")}
                                    </p>
                                    <p>
                                        {t("voucher_terms_4")}
                                    </p>
                                    <p>
                                        {t("voucher_terms_5")}
                                    </p>
                                    <p>
                                        {t("voucher_terms_6")}
                                    </p>
                                </div>
                            </div>

                            {/* Redeem Button */}
                            <div className="py-2 pl-1 pr-2 w-full group  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">
                                <form onSubmit={handleClick}>
                                    <SubmitButton isDisabled={isDisableSubmit}>{t("redeem")}</SubmitButton>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
