
import NoneLoginPage from '@/components/none-login-page'
import { getServerSideToken } from '@/lib/getServerSideToken'
import { getLocale } from 'next-intl/server'
import React from 'react'

export default async function layout({ children }) {
    const token = await getServerSideToken();
    const locale = await getLocale();
    if (!token) {
        return (
            <NoneLoginPage />)
    }
    return (<>
        {children}
    </>)



}
