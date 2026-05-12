import type { Metadata } from 'next';
import GameIframe from '../components/GameIframe';
import JsonLd from '../components/JsonLd';
import gameContent from '../lib/gameContent';

const { name, domain, iframeUrl } = gameContent;
const { steps, howItWorksSubtitle } = gameContent.playPage;

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name,
  url: `https://${domain}/play`,
  applicationCategory: 'GameApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: gameContent.seo.description,
  publisher: {
    '@type': 'Organization',
    name,
    url: `https://${domain}`,
  },
};

export const metadata: Metadata = {
  title: `Play ${name} – Free Online Game`,
  description: `Play ${name} free! ${gameContent.seo.description}. No downloads, no accounts needed.`,
  keywords: [`play ${name}`, 'free game online', `${name} play`],
  alternates: { canonical: '/play' },
};

export default function PlayPage() {
  return (
    <>
      <JsonLd schema={webAppSchema} />

      {/* ── Game — full viewport ── */}
      <div className="play-layout">
        <main className="play-main">
          {/* Animated background blobs */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at center, var(--nin-blue) 3px, transparent 3px)', backgroundSize: '40px 40px', opacity: 0.08, zIndex: 0, animation: 'demo-bg-scroll 25s linear infinite' }} />
          <div style={{ position: 'absolute', top: '15%', left: '10%', width: '120px', height: '120px', background: 'var(--nin-yellow)', borderRadius: '50%', opacity: 0.15, animation: 'demo-float-1 8s ease-in-out infinite', zIndex: 0 }} />
          <div style={{ position: 'absolute', bottom: '15%', right: '10%', width: '150px', height: '150px', background: 'var(--nin-red)', borderRadius: '30px', transform: 'rotate(15deg)', opacity: 0.1, animation: 'demo-float-2 12s ease-in-out infinite alternate', zIndex: 0 }} />

          <GameIframe
            src={iframeUrl}
            title={`${name} Game`}
            className="play-iframe"
          />
        </main>
      </div>

      {/* ── How It Works ── */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How {name} Works</h2>
          <p className="section-subtitle">{howItWorksSubtitle}</p>

          <div className="steps-grid">
            {steps.map((step, i) => (
              <div key={i} className="step-card">
                <div className="step-number">{i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
