import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
    // Typically corresponds to the `[locale]` segment
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    return {
        locale,
        timeZone: "Asia/Hong_Kong",
        messages: (await import(`../messages/${locale}.json`)).default,
        // #TODO: temporary server side missing message suppression
        onError(error) {
            if (error.code === "MISSING_MESSAGE") {
                console.warn(error);
                return; // suppression attempt
            }
            console.error(error);
        },
        getMessageFallback({ key }) {
            return key;
        },
    };
});