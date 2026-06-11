
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

const isDevEnv = process.env.DEV_ENV === "true";

const getRequestUrl = (config): string => {
    const baseURL = config.baseURL || "";
    const url = config.url || "";
    return `${baseURL}${url}`;
};

const getSafeHeaders = (headers) => {
    const safeHeaders = { ...headers };
    if (safeHeaders.Authorization) safeHeaders.Authorization = "Bearer ***";
    if (safeHeaders.authorization) safeHeaders.authorization = "Bearer ***";
    return safeHeaders;
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

    if (!config.headers["X-localization"]) {
        const locale = await getLocale();
        config.headers["X-localization"] = locale;
    }
    if (isDevEnv) {
        console.log("[axios:request]", {
            method: config.method?.toUpperCase(),
            url: getRequestUrl(config),
            params: config.params,
            data: config.data,
            headers: getSafeHeaders(config.headers),
        });
    }
    // if (!config.headers["X-currency"]) {
    //     const currency = await getCurrency();
    //     config.headers["X-currency"] = currency;
    // }
    return config;
});


Instance.interceptors.response.use(
    (response) => {
        if (isDevEnv) {
            console.log("[axios:response]", {
                method: response.config.method?.toUpperCase(),
                url: getRequestUrl(response.config),
                status: response.status,
                data: response.data,
            });
        }
        return response;
    },
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
        if (isDevEnv) {
            console.log("[axios:error]", {
                method: error.config?.method?.toUpperCase(),
                url: error.config ? getRequestUrl(error.config) : undefined,
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
            });
        }
        return error.response
    }
);



export default Instance;