"use client";
import SubmitButton from "@/components/auth/submit-btn";
import { PopupContext } from "@/components/context/PopupProvider";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useContext } from "react";

export default function VoucherDetailDrawer({ open, data }) {
    const t = useTranslations();
    const { closeAllModal } = useContext(PopupContext);

    const handleClick = (e) => {
        e.preventDefault();
        closeAllModal();
    };

    return (
        <Drawer open={open} dismissible={false}>
            <DrawerTitle></DrawerTitle>
            <DrawerContent onPointerDownOutside={closeAllModal}>
                <div className="p-[20px] max-h-[80vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-[24px]">
                        <h1 className="font-semibold text-[18px]">Voucher Details</h1>
                        <button onClick={closeAllModal}>
                            <ChevronDown size={24} />
                        </button>
                    </div>

                    <div className="space-y-[24px]">
                        {/* Voucher Info */}
                        <div>
                            <h2 className="font-semibold text-[16px] mb-[8px]">
                                {data?.voucherTitle || "Family Ticket Saver"}
                            </h2>
                            <p className="font-semibold text-[14px] text-[#446A2A] mb-[4px]">
                                {data?.points || "1,000 pts"}
                            </p>
                            <p className="text-[14px] text-[#60756E]">
                                {data?.description || "Cash Voucher"}
                            </p>
                        </div>

                        {/* Date Redeemable */}
                        <div>
                            <h3 className="font-semibold text-[14px] mb-[8px]">
                                Date Redeemable
                            </h3>
                            <p className="text-[14px] text-gray-600">
                                Start from 08-03-2025 until 30-12-2025
                            </p>
                        </div>

                        {/* Terms & Conditions */}
                        <div>
                            <h3 className="font-semibold text-[14px] mb-[12px]">
                                Terms & Conditions
                            </h3>
                            <div className="space-y-[12px] text-[14px] text-gray-600">
                                <p>
                                    1. This is a cash voucher that can be used to offset purchases
                                    of participating merchants or platforms.
                                </p>
                                <p>
                                    2. Only registered users who have accumulated enough points
                                    may redeem this voucher.
                                </p>
                                <p>
                                    3. Each voucher is valid for a single transaction and cannot
                                    be reused.
                                </p>
                                <p>
                                    4. Cash vouchers cannot be refunded, exchanged for real cash,
                                    or transferred to other users.
                                </p>
                                <p>
                                    5. Please use the voucher before the stated expiry date.
                                    Expired vouchers will not be reissued or extended.
                                </p>
                                <p>
                                    6. This voucher may be subject to a minimum spend or specific
                                    merchant usage. Check the details before redemption.
                                </p>
                            </div>
                        </div>

                        {/* Redeem Button */}
                        <div className="py-2 pl-1 pr-2 w-full group  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">
                            <form onSubmit={handleClick}>
                                <SubmitButton>{t("redeem")}</SubmitButton>
                            </form>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
