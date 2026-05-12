'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const CONSENT_STORAGE_KEY = 'jigsolitaire-ad-consent';
const CONSENT_COOKIE_KEY = 'jigsolitaire_ad_consent';
const CONSENT_EVENT = 'jigsolitaire-consent-change';

function getStoredConsent() {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
}

function persistConsent(value: 'granted' | 'denied') {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    document.cookie = `${CONSENT_COOKIE_KEY}=${value}; path=/; max-age=31536000; SameSite=Lax`;
    window.dispatchEvent(new Event(CONSENT_EVENT));
}

export default function CookieConsentBanner() {
    const [consent, setConsent] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setConsent(getStoredConsent());
        setMounted(true);
    }, []);

    if (!mounted || consent) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            left: '1rem',
            right: '1rem',
            bottom: '1rem',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
        }}>
            <div className="card" style={{
                maxWidth: '760px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                pointerEvents: 'auto',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.18)',
            }}>
                <div>
                    <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Privacy choices</h2>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                        We use advertising technology only after you choose to allow it. You can accept or decline ad cookies now,
                        and review the details in our <Link href="/cookie-policy">Cookie Policy</Link> and <Link href="/privacy-policy">Privacy Policy</Link>.
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            persistConsent('granted');
                            setConsent('granted');
                        }}
                    >
                        Accept ad cookies
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                            persistConsent('denied');
                            setConsent('denied');
                        }}
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
}
