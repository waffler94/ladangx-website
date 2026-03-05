'use client'
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const APP_DEEP_LINK = "ladangx://";

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
