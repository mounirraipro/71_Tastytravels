import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AdSlot from '../../components/AdSlot';
import AuthorByline from '../../components/AuthorByline';
import AuthorBioBox from '../../components/AuthorBioBox';
import gameContent from '../../lib/gameContent';

export function generateStaticParams() {
  return gameContent.blog.posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = gameContent.blog.posts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} – ${gameContent.name}`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = gameContent.blog.posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = gameContent.blog.posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <Link href="/blog" style={{ color: 'var(--primary-light)' }}>Blog</Link>
            {' / '}
            <span style={{ padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-xl)', background: 'rgba(108,92,231,0.15)', color: 'var(--primary-light)', fontWeight: 600, fontSize: '0.8rem' }}>
              {post.category}
            </span>
          </div>
          <h1 className="gradient-text">{post.title}</h1>
          <AuthorByline date={new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} readTime={post.readTime} />
        </div>
      </div>

      <div className="page-content">
        <AdSlot type="banner" />

        {post.sections.map((section, i) => (
          <div key={i}>
            {section.heading && <h2>{section.heading}</h2>}
            {section.paragraphs.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
            {i === 1 && <AdSlot type="in-content" />}
          </div>
        ))}

        <AdSlot type="banner" />

        <AuthorBioBox />

        {related.length > 0 && (
          <>
            <h2 style={{ marginTop: '3rem' }}>Related Articles</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="card" style={{ textDecoration: 'none' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--primary-light)' }}>{r.category}</span>
                  <h3 style={{ fontSize: '1rem', margin: '0.4rem 0 0.3rem' }}>{r.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>{r.readTime}</p>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
