import { getLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Trash } from 'lucide-react';
import React from 'react'

export default async function page() {
    const locale = await getLocale();
    return (
        locale === "en" ? <EnglishAccountDeletion /> : <MalayAccountDeletion />
    )
}

const EnglishAccountDeletion = async () => {
    const t = await getTranslations();
    return (
        <div className="max-w-4xl pb-[12px] mx-auto pt-safe">
            <div className="bg-white rounded-[20px] p-6 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)] mb-6 flex flex-col items-center text-center">
                <div className="size-[60px] bg-[#FE3939] rounded-full flex border-[3px] shadow-[4px_4px_0px_0px_rgba(240,6,6,1)] border-white items-center justify-center mb-4">
                    <Trash className="text-white" size={28} />
                </div>
                <h1 className="text-2xl font-bold mb-2">{t('account_deletion_title')}</h1>
                <p className="text-[#838383] text-sm">{t('account_deletion_intro')}</p>
            </div>

            <div className="bg-white rounded-[20px] p-6 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)] mb-6">
                <h2 className="text-xl font-bold mb-4">{t('account_deletion_before_title')}</h2>

                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
                    <p className="text-sm">
                        <span className="font-bold">⚠️ {t('account_deletion_warning_tickets')}</span>
                    </p>
                </div>

                <div className="bg-red-50 border-l-4 border-[#FE3939] p-4">
                    <p className="text-sm">
                        <span className="font-bold">🚫 {t('account_deletion_warning_final')}</span>
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-[20px] p-6 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)] mb-6">
                <h2 className="text-xl font-bold mb-4">{t('account_deletion_how_to_title')}</h2>

                <p className="mb-4">{t('account_deletion_how_to_intro')}</p>

                <ol className="list-decimal pl-6 mb-6 space-y-3">
                    <li>{t('account_deletion_step_open_app')}</li>
                    <li>{t('account_deletion_step_navigate')}</li>
                    <li>{t('account_deletion_step_scroll')}</li>
                    <li>{t('account_deletion_step_tap_delete')}</li>
                    <li>{t('account_deletion_step_confirm')}</li>
                    <li>{t('account_deletion_step_complete')}</li>
                </ol>
            </div>

            <div className="bg-white rounded-[20px] p-6 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)] mb-6">
                <h2 className="text-xl font-bold mb-3">{t('account_deletion_help_title')}</h2>
                <p className="mb-2">{t('account_deletion_help_desc')}</p>
                <p>
                    <span className="font-bold">{t('account_deletion_contact_label')}: </span>
                    <a href="mailto:ladangxpark@gmail.com" className="text-blue-600 hover:underline">ladangxpark@gmail.com</a>
                </p>
            </div>

            <div className="bg-[#F6F3E1] rounded-[20px] p-4 mb-6 text-center">
                <p className="text-xs text-[#60756E]">
                    © {new Date().getFullYear()} Motomarin Sdn Bhd. All rights reserved.
                </p>
            </div>
        </div>
    )
}

const MalayAccountDeletion = async () => {
    const t = await getTranslations();
    return (
        <div className="max-w-4xl pb-[12px] mx-auto pt-safe">
            <div className="bg-white rounded-[20px] p-6 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)] mb-6 flex flex-col items-center text-center">
                <div className="size-[60px] bg-[#FE3939] rounded-full flex border-[3px] shadow-[4px_4px_0px_0px_rgba(240,6,6,1)] border-white items-center justify-center mb-4">
                    <Trash className="text-white" size={28} />
                </div>
                <h1 className="text-2xl font-bold mb-2">{t('account_deletion_title')}</h1>
                <p className="text-[#838383] text-sm">{t('account_deletion_intro')}</p>
            </div>

            <div className="bg-white rounded-[20px] p-6 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)] mb-6">
                <h2 className="text-xl font-bold mb-4">{t('account_deletion_before_title')}</h2>

                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
                    <p className="text-sm">
                        <span className="font-bold">⚠️ {t('account_deletion_warning_tickets')}</span>
                    </p>
                </div>

                <div className="bg-red-50 border-l-4 border-[#FE3939] p-4">
                    <p className="text-sm">
                        <span className="font-bold">🚫 {t('account_deletion_warning_final')}</span>
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-[20px] p-6 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)] mb-6">
                <h2 className="text-xl font-bold mb-4">{t('account_deletion_how_to_title')}</h2>

                <p className="mb-4">{t('account_deletion_how_to_intro')}</p>

                <ol className="list-decimal pl-6 mb-6 space-y-3">
                    <li>{t('account_deletion_step_open_app')}</li>
                    <li>{t('account_deletion_step_navigate')}</li>
                    <li>{t('account_deletion_step_scroll')}</li>
                    <li>{t('account_deletion_step_tap_delete')}</li>
                    <li>{t('account_deletion_step_confirm')}</li>
                    <li>{t('account_deletion_step_complete')}</li>
                </ol>
            </div>

            <div className="bg-white rounded-[20px] p-6 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)] mb-6">
                <h2 className="text-xl font-bold mb-3">{t('account_deletion_help_title')}</h2>
                <p className="mb-2">{t('account_deletion_help_desc')}</p>
                <p>
                    <span className="font-bold">{t('account_deletion_contact_label')}: </span>
                    <a href="mailto:ladangxpark@gmail.com" className="text-blue-600 hover:underline">ladangxpark@gmail.com</a>
                </p>
            </div>

            <div className="bg-[#F6F3E1] rounded-[20px] p-4 mb-6 text-center">
                <p className="text-xs text-[#60756E]">
                    © {new Date().getFullYear()} Motomarin Sdn Bhd. Hak cipta terpelihara.
                </p>
            </div>
        </div>
    )
}
