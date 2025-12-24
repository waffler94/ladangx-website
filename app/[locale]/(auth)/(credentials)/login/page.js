import { useTranslations } from 'next-intl'
import React from 'react'

export default function page() {
    const t = useTranslations()
    return (
        <div className="px-4 pt-6 pb-10">
            <form>
                <div>
                    <label className="block  font-bold text-gray-700 mb-[8px] ">{t("phone_number")}</label>
                    <input
                        type="text"
                        className="block w-full px-[16px] py-[14.5px] border border-[#CFDDCF] rounded-[10px]  placeholder-[#CFDDCF] "
                        placeholder={t("enter_phone")}
                    />
                </div>
                <div className="mt-4">
                    <label className="block  font-bold text-gray-700 mb-[8px]">{t("password")}</label>
                    <input
                        type="password"
                        className="block w-full px-[16px] py-[14.5px] border border-[#CFDDCF] rounded-[10px]  placeholder-[#CFDDCF] "
                        placeholder={t("enter_password")}
                    />
                </div>
                <div className="mt-6">
                    <div className="py-2 pl-1 pr-3 w-full group  rounded-full shadow-[0px_2px_0px_rgba(0,0,0,0.15)]">


                        <button
                            type="submit"
                            className="w-full group-hover:scale-105 transition-all  flex justify-center font-bold py-3 px-4 rounded-full shadow-[4px_4px_0px_0px_rgba(57,83,39,1)]  text-white bg-[#446A2A] "
                        >
                            {t("login")}
                        </button>
                    </div>

                </div>
            </form>


        </div>/* Rectangle 10 */


    )
}
