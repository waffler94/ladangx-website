
import axios from "axios";

import Cookies from "js-cookie";
import { getServerSideToken } from "./getServerSideToken";


const getLocale = async (): Promise<string> => {
    if (typeof window !== "undefined") {
        // Client-side: get from cookie or localStorage
        return Cookies.get('NEXT_LOCALE') || 'en';
    } else {
        // Server-side: get from headers or default
        const { headers } = require('next/headers');
        const headerStore = await headers();
        return headerStore.get('x-locale') || 'en';
    }
};

export const getAccessToken = async (): Promise<string | undefined> => {
    if (typeof window !== "undefined") {

        if (Cookies.get('access_token')) {
            return Cookies.get('access_token');
        }
    } else {
        // Server-side code
        const token = await getServerSideToken();
        if (token) {
            return token;
        }
        return undefined;
    }
};

const links: Record<string, string> = {

    baseUrl: process.env.API_URL,
};

export const Instance = axios.create({
    baseURL: links.baseUrl,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
    },
    timeout: 120000, // 120 seconds timeout for large file uploads
});



Instance.interceptors.request.use(async (config) => {
    const accessToken = await getAccessToken();
    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;

    // if (!config.headers["X-localization"]) {
    //     const locale = await getLocale();
    //     config.headers["X-localization"] = locale;
    // }
    // if (!config.headers["X-currency"]) {
    //     const currency = await getCurrency();
    //     config.headers["X-currency"] = currency;
    // }
    return config;
});


Instance.interceptors.response.use(
    (response) => response,
    // async (error) => {
    // 	// Check if the error is due to authentication issues (401 Unauthorized)
    // 	const status = error?.response?.status;

    // 	// If it's an auth error, remove the invalid token
    // 	if (status === 401) {
    // 		await removeAccessToken();
    // 	}

    // 	return error.response;
    // }
    (error) => {


        return error.response
    }
);



export default Instance;