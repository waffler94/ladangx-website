'use client'
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useTranslations } from 'next-intl'

export default function PhoneInput({ error, disabled = false, initialValue = '' }) {
    const t = useTranslations()
    const [phoneNumber, setPhoneNumber] = React.useState(initialValue)

    return (
        <div>
            <label className="block  font-semibold text-[#313F3A] mb-[8px] ">{t("phone_number")}</label>
            <div className={` flex flex-row ${error ? 'border-red-500' : 'border-[#CFDDCF]'} ${disabled ? 'bg-[#CFDDCF]' : 'bg-white'} border rounded-[10px]`}>
                <Select className="!py-[14.5px] " defaultValue="+60" name="calling_code" disabled={disabled}>
                    <SelectTrigger className="!h-[54px] !rounded-r-none !border-none  ">
                        <SelectValue className="!py-[14.5px]" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="+60">+60</SelectItem>

                    </SelectContent>
                </Select>
                <input
                    type="text"
                    name="phone_number"
                    value={phoneNumber}
                    disabled={disabled}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setPhoneNumber(value);
                    }}
                    className="block w-full px-[16px] py-[14.5px] rounded-l-none border-[#CFDDCF] disabled:border-[#60756E] border-l-[1px] rounded-[10px]  placeholder-[#CFDDCF] "
                    placeholder={t("enter_phone")}
                />

            </div>
            {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}

        </div>
    )
}
