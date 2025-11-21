'use client'
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Image from 'next/image'
import React, { useContext } from 'react'
import { modalList, PopupContext } from '@/components/context/PopupProvider';

export default function page() {
    const t = useTranslations();
    const { openModal } = useContext(PopupContext);
    const modalPop = () => {
        openModal(modalList.example.key);
    }
    return (
        <div>{t("Hello")} <Button onClick={modalPop} >{t("Click me")}</Button></div>
    )
}
