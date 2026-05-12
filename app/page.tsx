import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from './components/AdSlot';
import MobileGamePreview from './components/MobileGamePreview';
import Icon, { type IconName } from './components/Icon';
import gameContent from './lib/gameContent';

const { seo, homepage } = gameContent;

export const metadata: Metadata = {
  title:       seo.title,
  description: seo.description,
  keywords:    seo.keywords,
  alternates:  { canonical: '/' },
  openGraph: {
    title:       seo.title,
    description: seo.description,
    images:      [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function Home() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homepage.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const gameSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: gameContent.name,
    description: seo.description,
    url: `https://${gameContent.domain}`,
    genre: [gameContent.genre],
    gamePlatform: 'Web Browser',
    applicationCategory: 'Game',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const recentPosts = gameContent.blog.posts.slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }} />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="lp-hero">
        <div className="lp-hero-bg" aria-hidden="true">
          <div className="lp-blob lp-blob-1" />
          <div className="lp-blob lp-blob-2" />
          <div className="lp-blob lp-blob-3" />
        </div>
        <div className="lp-hero-frame">
          <MobileGamePreview />
        </div>
      </section>

      {/* ══ INTRO ═════════════════════════════════════════════════════════ */}
      <section className="lp-intro">
        <div className="container lp-intro-inner">
          <div className="lp-eyebrow">
            <Icon name="sparkles" size={14} />
            <span>Free • No download • No account</span>
          </div>
          <h1 className="lp-title">
            <span>{gameContent.name} Online</span>
            <span className="lp-title-accent">{homepage.heroHeadline}</span>
          </h1>
          <p className="lp-lede">{homepage.lede}</p>
          <div className="lp-hero-ctas">
            <Link href="/play" className="lp-btn lp-btn-primary">
              <Icon name="play" size={16} />
              Play Free Now
            </Link>
            <Link href="/how-to-play" className="lp-btn lp-btn-ghost">
              How to Play
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>

          <div className="lp-stats">
            {homepage.stats.map((s) => (
              <div key={s.label} className="lp-stat">
                <span className="lp-stat-v">{s.value}</span>
                <span className="lp-stat-l">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdSlot type="banner" />

      {/* ══ ABOUT ═════════════════════════════════════════════════════════ */}
      <section className="lp-section">
        <div className="container">
          <div className="lp-about-grid">
            <div className="lp-about-text">
              <span className="lp-kicker">{homepage.about.kicker}</span>
              <h2>{homepage.about.headline}</h2>
              <p><strong>{gameContent.name}</strong> — {homepage.about.paragraph1}</p>
              <p>{homepage.about.paragraph2}</p>
              <div className="lp-about-badges">
                <div className="lp-trust-badge">
                  <Icon name="shield" size={18} />
                  <div>
                    <strong>Safe for all ages</strong>
                    <span>No data collection</span>
                  </div>
                </div>
                <div className="lp-trust-badge">
                  <Icon name="bolt" size={18} />
                  <div>
                    <strong>Instant play</strong>
                    <span>Runs in any modern browser</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lp-about-collage">
              {homepage.categories.slice(0, 4).map((cat, i) => (
                <div key={cat.name} className={`lp-collage-item lp-collage-${['a','b','c','d'][i]}`}>
                  {cat.img && <img src={cat.img} alt={`${gameContent.name} ${cat.name}`} width={280} height={200} />}
                  <span>{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ HOW TO PLAY ═══════════════════════════════════════════════════ */}
      <section className="lp-section lp-section-tinted">
        <div className="container">
          <div className="lp-section-head">
            <span className="lp-kicker">How it works</span>
            <h2>{homepage.howToPlay.headline}</h2>
            <p>{homepage.howToPlay.subheading}</p>
          </div>

          <div className="lp-how-grid">
            {homepage.steps.map((step, i) => (
              <div key={step.title} className="lp-how-card">
                <span className="lp-how-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="lp-how-icon">
                  <Icon name={step.icon as IconName} size={22} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CATEGORIES ════════════════════════════════════════════════════ */}
      <section className="lp-section">
        <div className="container">
          <div className="lp-section-head">
            <span className="lp-kicker">Explore</span>
            <h2>Choose your challenge.</h2>
            <p>Multiple categories with increasing difficulty levels.</p>
          </div>

          <div className="lp-cats">
            {homepage.categories.map((cat) => (
              <Link key={cat.name} href="/play" className="lp-cat">
                <div className="lp-cat-img">
                  {cat.img && <img src={cat.img} alt={`${gameContent.name} ${cat.name}`} width={300} height={220} />}
                  <div className="lp-cat-gradient" style={{ background: `linear-gradient(180deg, transparent 40%, ${cat.color}ee 100%)` }} />
                  <div className="lp-cat-icon-chip" style={{ background: cat.bg, color: cat.color }}>
                    <Icon name={cat.icon as IconName} size={18} />
                  </div>
                </div>
                <div className="lp-cat-info">
                  <span className="lp-cat-name">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AdSlot type="banner" />

      {/* ══ FEATURES ══════════════════════════════════════════════════════ */}
      <section className="lp-section lp-section-tinted">
        <div className="container">
          <div className="lp-section-head">
            <span className="lp-kicker">Why players love it</span>
            <h2>Built for the best experience.</h2>
            <p>Every detail crafted to feel smooth, satisfying, and never frustrating.</p>
          </div>

          <div className="lp-features">
            {homepage.features.map((f, i) => (
              <div key={f.title} className={`lp-feature ${i % 2 === 0 ? 'lp-feature-a' : 'lp-feature-b'}`}>
                <div className="lp-feature-icon">
                  <Icon name={f.icon as IconName} size={22} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BLOG ══════════════════════════════════════════════════════════ */}
      <section className="lp-section">
        <div className="container">
          <div className="lp-section-head">
            <span className="lp-kicker">From the blog</span>
            <h2 dangerouslySetInnerHTML={{ __html: gameContent.blog.headline }} />
            <p>{gameContent.blog.subheading}</p>
          </div>

          <div className="lp-blog">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="lp-blog-card">
                <span className="lp-blog-cat">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="lp-blog-read">
                  {post.readTime}
                  <Icon name="arrow-right" size={14} />
                </span>
              </Link>
            ))}
          </div>

          <div className="lp-center">
            <Link href="/blog" className="lp-btn lp-btn-ghost">
              Browse all articles
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════════════════ */}
      <section className="lp-section lp-section-tinted">
        <div className="container lp-faq-wrap">
          <div className="lp-section-head">
            <span className="lp-kicker">FAQ</span>
            <h2>Questions, answered.</h2>
          </div>

          <div className="lp-faq">
            {homepage.faq.map(({ q, a }) => (
              <details key={q} className="lp-faq-item">
                <summary>
                  <span>{q}</span>
                  <span className="lp-faq-chev" aria-hidden="true" />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════════════════ */}
      <section className="lp-cta">
        <div className="lp-cta-bg" aria-hidden="true" />
        <div className="container lp-cta-inner">
          <Icon name="trophy" size={32} className="lp-cta-icon" />
          <h2>{homepage.cta.headline}</h2>
          <p>{homepage.cta.subtext}</p>
          <Link href="/play" className="lp-btn lp-btn-primary lp-btn-lg">
            <Icon name="play" size={18} />
            Play {gameContent.name} Free
          </Link>
        </div>
      </section>
    </>
  );
}
