'use client'
import React, { useContext } from "react";
import VoucherCard from "../_components/voucher-card";
import { modalList, PopupContext } from '@/components/context/PopupProvider';

export default function page() {
    const { openModal } = useContext(PopupContext);

    const handleClick = (id) => {
        openModal(modalList.voucherDetail.key, { id });
    }

    const vouchers = [
        {
            id: 1,
            leftTitle: 'RM10 OFF',
            voucherTitle: 'Family Ticket Saver',
            icon: 'icon-voucher',
            points: '1,000 pts',
            description: 'Cash Voucher'
        },
        {
            id: 2,
            leftTitle: 'FREE TICKET',
            voucherTitle: 'Birthday Special',
            icon: 'icon-birthday_cake',
            points: '100 pts',
            description: 'Free 1 ticket'
        },
        {
            id: 3,
            leftTitle: 'RM10 OFF',
            voucherTitle: 'Family Ticket Saver',
            icon: 'icon-voucher',
            points: '1,000 pts',
            description: 'Cash Voucher'
        }
    ]

    return (
        <div className="">
            <div className="flex flex-col w-full gap-[16px]">
                {vouchers.map((voucher) => (
                    <VoucherCard
                        key={voucher.id}
                        id={voucher.id}
                        leftTitle={voucher.leftTitle}
                        voucherTitle={voucher.voucherTitle}
                        icon={voucher.icon}
                        points={voucher.points}
                        description={voucher.description}
                        onClick={handleClick}
                    />
                ))}
            </div>
        </div>
    );
}
