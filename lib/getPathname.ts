'use server'
import { headers } from "next/headers";

export const getPathname = async () => {
    // get pathname from headers x-pathname
    const headersStore = await headers()
    const pathname = headersStore.get("x-pathname") || "/";
    return pathname;
}