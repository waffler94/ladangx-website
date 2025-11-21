"use client";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getMessages } from "next-intl/server";
import React from "react";

export default function IntlProvider({ locale, messages, children }) {
    function onError(error) {
        if (error.code === "MISSING_MESSAGE") return;
        console.error(error);
    }
    return (
        // temporary fix to disable error popping out
        <NextIntlClientProvider
            locale={locale}
            onError={onError}
            messages={messages}
        >
            {children}
        </NextIntlClientProvider>
    );
}