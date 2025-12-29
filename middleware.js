import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { redirect } from "./i18n/navigation";
import { routing } from "./i18n/routing";
const handleI18nRouting = createMiddleware(routing);

export function middleware(request) {


    const response = handleI18nRouting(request);
    response.headers.set("x-pathname", request.nextUrl.pathname);
    const localeFromPath = request.nextUrl.pathname.split("/")[1];
    const supportedLocales = ["en", "my", "zh"]; // Add your supported locales
    let locale = "en"; // default

    if (supportedLocales.includes(localeFromPath)) {
        locale = localeFromPath;
    }
    response.headers.set("x-locale", locale);
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
        "/((?!api|_next|_vercel|.*\\..*).*)",
    ],
};