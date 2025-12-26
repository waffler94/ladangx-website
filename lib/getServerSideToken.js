'use server'

import { cookies, headers } from 'next/headers'

const COOKIE_NAME = 'access_token';

export async function getServerSideToken() {
    // const headersList = headers();
    // console.log('boss', JSON.stringify(headersList));
    // const referer = headersList.referer;
    // console.log('referer:', referer)
    // if (referer) {
    //     try {
    //         const url = new URL(referer)
    //         const token = url.searchParams.get('access_token')
    //         return token || undefined
    //     } catch (error) {
    //         console.error('Error parsing referer URL:', error)
    //         return undefined
    //     }
    // }
    // // First try to get from cookies
    const cookieStore = await cookies()
    const cookieToken = cookieStore.get(COOKIE_NAME);
    // console.log(cookieToken?.value);
    if (cookieToken?.value !== undefined) {
        return cookieToken.value
    }



    return undefined
}