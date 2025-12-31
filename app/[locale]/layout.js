import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Fredoka, Montserrat } from "next/font/google";
import "./globals.css";
import "@/lib/icon.css";
import "./custom-class.css";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import IntlProvider from "./intl-provider";
import { PopUpProvider } from "@/components/context/PopupProvider";


const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Title",
  // description:
  //   "Homeland helps you find, buy, and manage your dream property with ease. Discover the latest real estate listings, market insights, and smart investment tools.",
  // keywords: [
  //   "Homeland",
  //   "real estate",
  //   "property for sale",
  //   "smart property platform",
  //   "Malaysia real estate",
  //   "property management",
  // ],
  // authors: [{ name: "Homeland Team", url: "https://homelandcreation.com/" }],
  // creator: "Homeland Creation",
  // publisher: "Homeland Creation",
  // metadataBase: new URL("https://homelandcreation.com/"),
  // alternates: {
  //   canonical: "https://homelandcreation.com/",
  // },
  // openGraph: {
  //   type: "website",
  //   locale: "en_MY",
  //   url: "https://homelandcreation.com/",
  //   siteName: "Homeland Creation",
  //   title: "Homeland Creation",
  //   description:
  //     "Competent & effective platform to synergize greater business opportunities in the real estate sector.",
  //   images: [
  //     {
  //       url: "https://homelandcreation.com/images/appicon512.png",
  //       width: 1200,
  //       height: 630,
  //       alt: "Homeland - Smart Property Platform",
  //     },
  //   ],
  // },
  // icons: {
  //   icon: "/images/favicon.ico",
  //   shortcut: "/images/favicon-16x16.png",
  //   apple: "/images/apple-touch-icon.png",
  // },
  // robots: {
  //   index: true,
  //   follow: true,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     maxImagePreview: "large",
  //     maxSnippet: -1,
  //     maxVideoPreview: -1,
  //   },
  // },
  // category: "Real Estate",
};

export default async function RootLayout({ children, params }) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await getMessages();
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <head>
        {/* {!!process.env.ENABLE_ERUDA && (
          <>
            <script src="https://cdn.jsdelivr.net/npm/eruda"></script>
            <script>eruda.init();</script>
          </>
        )} */}
      </head>
      <body
        className={`${fredoka.className} antialiased `}
      >
        <IntlProvider messages={messages} locale={locale}>
          <PopUpProvider>
            {/* <Navbar /> */}
            {children}
            {/* <Footer /> */}
          </PopUpProvider>
        </IntlProvider>


      </body>
    </html>
  );
}
