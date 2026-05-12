'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const CONSENT_STORAGE_KEY = 'jigsolitaire-ad-consent';
const CONSENT_EVENT = 'jigsolitaire-consent-change';

interface AdSenseLoaderProps {
    publisherId: string;
}

function readConsent() {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
}

export default function AdSenseLoader({ publisherId }: AdSenseLoaderProps) {
    const [consent, setConsent] = useState<string | null>(() => readConsent());

    useEffect(() => {
        const updateConsent = () => setConsent(readConsent());

        window.addEventListener(CONSENT_EVENT, updateConsent);

        return () => {
            window.removeEventListener(CONSENT_EVENT, updateConsent);
        };
    }, []);

    if (!publisherId || consent !== 'granted') {
        return null;
    }

    return (
        <Script
            id="adsense-script"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
}
