'use client'
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const APP_DEEP_LINK = "ladangx://";
const APP_DOWNLOAD_URL = process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL || APP_DEEP_LINK;

function DownloadRedirect() {
    const searchParams = useSearchParams();
    const url = searchParams.get('url');
    const name = searchParams.get('name') || 'artwork';

    useEffect(() => {
        if (!url) return;

        // Trigger download via server-side proxy (avoids CORS)
        const proxyUrl = `/api/download?url=${encodeURIComponent(url)}&name=${encodeURIComponent(name)}`;
        const a = document.createElement('a');
        a.href = proxyUrl;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();

        // Redirect back to app after download starts
        const timer = setTimeout(() => {
            window.location.href = APP_DEEP_LINK;
        }, 3000);

        return () => clearTimeout(timer);
    }, [url, name]);

    if (!url) {
        return (
<div
            className="min-h-screen flex items-center px-4 justify-center bg-sky-50 bg-[radial-gradient(#bae6fd_2px,transparent_2px)] [background-size:24px_24px] pb-12"
        >                <section className="w-full max-w-lg rounded-[28px] bg-white px-6 py-8 text-center shadow-[0_12px_32px_rgba(57,83,39,0.18)]">
                    <img
                        src="/images/ladangx_logo1.png"
                        alt="LadangX"
                        className="mx-auto mb-6 h-[112px] w-auto"
                    />
                    <h1 className="text-[24px] font-semibold text-[#245B00]">Please download app</h1>
                    <a
                        href={APP_DOWNLOAD_URL}
                        className="mt-7 block rounded-full bg-[#446A2A] px-5 py-4 font-bold text-white shadow-[4px_4px_0px_0px_rgba(57,83,39,1)] transition-transform active:scale-[0.98]"
                    >
                        Download app
                    </a>
                </section>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif', gap: 12 }}>
            <p style={{ fontSize: '18px', fontWeight: 600 }}>Downloading your image...</p>
            <p style={{ fontSize: '14px', color: '#666' }}>You will be redirected back to the app shortly.</p>
        </div>
    );
}

export default function DownloadRedirectPage() {
    return (
        <Suspense>
            <DownloadRedirect />
        </Suspense>
    );
}
