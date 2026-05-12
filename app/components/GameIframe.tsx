'use client';

import React, { useRef, useState, useEffect } from 'react';

interface GameIframeProps {
  src: string;
  title: string;
  className?: string;
  style?: React.CSSProperties;
  scrolling?: string;
}

export default function GameIframe({ src, title, className, style, scrolling }: GameIframeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef    = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen]             = useState(false);
  const [isIosFallbackFullscreen, setIsIosFallback] = useState(false);
  const [gameStarted, setGameStarted]               = useState(false);

  const isIPhoneSafari = (() => {
    if (typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent;
    return /iPhone|iPod/i.test(ua) && /WebKit/i.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua);
  })();

  useEffect(() => {
    const onChange = () => {
      const d = document as Document & { webkitFullscreenElement?: Element | null };
      setIsFullscreen(!!(document.fullscreenElement || d.webkitFullscreenElement));
    };
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange as EventListener);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      document.removeEventListener('webkitfullscreenchange', onChange as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!isIosFallbackFullscreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isIosFallbackFullscreen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsIosFallback(false); };
    if (isIosFallbackFullscreen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isIosFallbackFullscreen]);

  const handleFullscreen = async () => {
    const container = containerRef.current;
    const iframe    = iframeRef.current;
    if (!container || !iframe) return;

    const fsDoc = document as Document & {
      webkitFullscreenElement?: Element | null;
      webkitExitFullscreen?: () => void;
      webkitFullscreenEnabled?: boolean;
    };
    const fsIf  = iframe    as HTMLIFrameElement & { webkitRequestFullscreen?: () => void };
    const fsCon = container as HTMLDivElement    & { webkitRequestFullscreen?: () => void };
    const fsEl  = document.fullscreenElement || fsDoc.webkitFullscreenElement;
    const hasNat = !!(document.fullscreenEnabled || fsDoc.webkitFullscreenEnabled);

    if (isIosFallbackFullscreen) { setIsIosFallback(false); return; }
    if (fsEl) {
      try { await Promise.resolve((document.exitFullscreen?.bind(document) || fsDoc.webkitExitFullscreen?.bind(document))()); } catch {}
      return;
    }
    if (isIPhoneSafari) { setIsIosFallback(true); return; }
    const req = iframe.requestFullscreen?.bind(iframe) || fsIf.webkitRequestFullscreen?.bind(iframe)
      || container.requestFullscreen?.bind(container) || fsCon.webkitRequestFullscreen?.bind(container);
    if (!hasNat || !req) { setIsIosFallback(true); return; }
    try { await Promise.resolve(req()); } catch { setIsIosFallback(true); }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Tasty Travels', text: 'Play this free puzzle game!', url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {}
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setTimeout(() => iframeRef.current?.focus(), 80);
  };

  const inFull = isFullscreen || isIosFallbackFullscreen;

  return (
    <div
      ref={containerRef}
      className={`game-chrome-shell${inFull ? ' game-chrome-fullscreen' : ''}`}
      style={{
        ...style,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        background: '#0d1117',
        width:    isFullscreen ? '100vw' : isIosFallbackFullscreen ? '100%' : '100%',
        height:   isFullscreen ? '100vh' : isIosFallbackFullscreen ? '100dvh' : 'auto',
        position: isIosFallbackFullscreen ? 'fixed' : 'relative',
        inset:    isIosFallbackFullscreen ? '0' : 'auto',
        zIndex:   isIosFallbackFullscreen ? 9999 : 'auto',
        paddingTop:    isIosFallbackFullscreen ? 'max(env(safe-area-inset-top), 0px)'    : 0,
        paddingBottom: isIosFallbackFullscreen ? 'max(env(safe-area-inset-bottom), 0px)' : 0,
      }}
    >
      {/* ── Game + overlay ── */}
      <div className="game-iframe-area">
        <iframe
          ref={iframeRef}
          src={src}
          title={title}
          className={!inFull ? className : undefined}
          style={{
            width: '100%',
            display: 'block',
            border: 'none',
            backgroundColor: 'transparent',
            ...(inFull ? { height: '100%' } : {}),
          }}
          allow="autoplay; fullscreen *"
          allowFullScreen
          loading="lazy"
          scrolling={scrolling}
        />

        {/* Play overlay — shown before first click */}
        {!gameStarted && !inFull && (
          <div className="game-play-overlay" onClick={handleStartGame} role="button" aria-label="Click to play Tasty Travels">
            <div className="game-play-btn">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="none">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <div className="game-play-label">
              <strong>Play Tasty Travels</strong>
              <span>Click anywhere to start</span>
            </div>
          </div>
        )}

        {/* ── Floating controls ── */}
        {!inFull && (
          <div className="game-float-controls">
            <button onClick={handleShare} className="game-float-btn" title="Share">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
            <button onClick={handleFullscreen} className="game-float-btn game-float-btn-primary" title="Fullscreen">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          </div>
        )}

        {/* ── Exit fullscreen (iOS fallback) ── */}
        {inFull && (
          <div className="game-float-controls">
            <button onClick={handleFullscreen} className="game-float-btn game-float-btn-primary" title="Exit Fullscreen">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
