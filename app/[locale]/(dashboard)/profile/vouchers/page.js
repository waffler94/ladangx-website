import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

export default async function page() {
    const locale = await getLocale();

    redirect({
        href: "/profile/vouchers/available",
        locale: locale
    });
}
