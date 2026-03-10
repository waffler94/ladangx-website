'use server'

import { headers } from "next/headers";

export default async function RootLayout() {

    const headersList = headers();
    return (

        <pre>{JSON.stringify(Object.fromEntries(headersList), null, 2)}</pre>

    );
}
