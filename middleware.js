import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";
const handleI18nRouting = createMiddleware(routing);
const MOBILE_APP_CLIENT_COOKIE = "app_client";

export function middleware(request) {
    const isDevEnv = process.env.DEV_ENV === "true";
    const mobileHeader = request.headers.get("x-app-client")?.trim().toLowerCase();
    const isMobileHeader = mobileHeader === "mobile";
    const isMobileCookie = request.cookies.get(MOBILE_APP_CLIENT_COOKIE)?.value === "mobile";
    const isMobileAppClient = isMobileHeader || isMobileCookie;

    if (!isDevEnv && !isMobileAppClient) {
        const pathname = request.nextUrl.pathname;
        const isPublicDocument = pathname.includes("/documents/account-deletion");
        if (!isPublicDocument) {
            const downloadUrl = new URL("/download-redirect", request.url);
            downloadUrl.searchParams.set("reason", "browser");
            return NextResponse.redirect(downloadUrl);
        }
    }

    const response = handleI18nRouting(request);
    response.headers.set("x-pathname", request.nextUrl.pathname);
    const localeFromPath = request.nextUrl.pathname.split("/")[1];
    const supportedLocales = ["en", "my"]; // Add your supported locales
    let locale = "en"; // default
    // const userAgentRes = userAgent(request)
    // console.log(userAgentRes)

    if (supportedLocales.includes(localeFromPath)) {
        locale = localeFromPath;
    }
    response.headers.set("x-locale", locale);
    if (isMobileHeader) {
        response.cookies.set(MOBILE_APP_CLIENT_COOKIE, "mobile", {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
        });
    }
    // if (request.nextUrl.pathname.includes("/auth")) {
    //   // if user already have access_token cookie
    //   const accessToken = request.cookies.get("access_token");
    //   if (accessToken) {
    //     return NextResponse.redirect(new URL("/profile", request.url));
    //   }
    // } else if (request.nextUrl.pathname.includes("/app")) {
    //   // if user does not have access_token cookie
    //   const accessToken = request.cookies.get("access_token");
    //   if (!accessToken) {
    //     return NextResponse.redirect(new URL("/login", request.url));
    //   }
    // }
    return response;
}

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: [
        // Match all pages except specific system paths
        "/((?!api|_next|_vercel|download-redirect|.*\\..*).*)",
    ],
};