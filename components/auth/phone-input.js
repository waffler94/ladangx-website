import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useTranslations } from 'next-intl'

export default function PhoneInput() {
    const t = useTranslations()
    return (
        <div>
            <label className="block  font-bold text-[#313F3A] mb-[8px] ">{t("phone_number")}</label>
            <div className="flex flex-row">
                <Select className="!py-[14.5px]" defaultValue="+60">
                    <SelectTrigger className="!h-[54px] !rounded-r-none ">
                        <SelectValue className="!py-[14.5px]" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="+60">+60</SelectItem>

                    </SelectContent>
                </Select>
                <input
                    type="text"
                    className="block w-full px-[16px] py-[14.5px] rounded-l-none border border-[#CFDDCF] rounded-[10px]  placeholder-[#CFDDCF] "
                    placeholder={t("enter_phone")}
                />
            </div>

        </div>
    )
}
