import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useTranslations } from 'next-intl'

export default function PhoneInput({ error }) {
    const t = useTranslations()
    const [phoneNumber, setPhoneNumber] = React.useState('')

    return (
        <div>
            <label className="block  font-bold text-[#313F3A] mb-[8px] ">{t("phone_number")}</label>
            <div className={`bg-white flex flex-row ${error ? 'border-red-500' : 'border-[#CFDDCF]'} border rounded-[10px]`}>
                <Select className="!py-[14.5px] " defaultValue="+60" name="calling_code">
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
                    onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setPhoneNumber(value);
                    }}
                    className="block w-full px-[16px] py-[14.5px] rounded-l-none border-[#CFDDCF] border-l-[1px] rounded-[10px]  placeholder-[#CFDDCF] "
                    placeholder={t("enter_phone")}
                />

            </div>
            {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}

        </div>
    )
}
