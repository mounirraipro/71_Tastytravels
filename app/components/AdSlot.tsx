'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const CONSENT_STORAGE_KEY = 'jigsolitaire-ad-consent';
const CONSENT_EVENT = 'jigsolitaire-consent-change';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSlotProps {
  type?: 'banner' | 'sidebar' | 'in-content';
}

const slotMap = {
  banner: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER,
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
  'in-content': process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT,
} as const;

function normalizePublisherId(value?: string) {
  if (!value) return '';
  return value.startsWith('ca-pub-') ? value : `ca-pub-${value}`;
}

export default function AdSlot({ type = 'banner' }: AdSlotProps) {
  const adPushed = useRef(false);
  const slot = slotMap[type];
  const [hasConsent, setHasConsent] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) === 'granted';
  });
  const publisherId = useMemo(
    () => normalizePublisherId(process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID),
    []
  );

  useEffect(() => {
    const syncConsent = () => {
      const granted = window.localStorage.getItem(CONSENT_STORAGE_KEY) === 'granted';
      setHasConsent(granted);
      adPushed.current = false;
    };

    window.addEventListener(CONSENT_EVENT, syncConsent);

    return () => {
      window.removeEventListener(CONSENT_EVENT, syncConsent);
    };
  }, []);

  useEffect(() => {
    if (!slot || !publisherId || !hasConsent || adPushed.current) return;
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    adPushed.current = true;
  }, [slot, publisherId, hasConsent]);

  if (!slot || !publisherId || !hasConsent) {
    return null;
  }

  return (
    <div className="ad-container" aria-label="Advertisement">
      <div
        style={{
          width: '100%',
          maxWidth: type === 'sidebar' ? '300px' : '728px',
        }}
      >
        <p
          style={{
            margin: '0 0 0.35rem',
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)',
          }}
        >
          Advertisement
        </p>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      </div>
    </div>
  );
}
