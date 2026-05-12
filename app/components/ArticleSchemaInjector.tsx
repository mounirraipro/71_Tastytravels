'use client';

import { usePathname } from 'next/navigation';
import { articleMeta } from '../lib/articleMeta';
import { buildBlogPostingSchema, buildBreadcrumbSchema } from '../lib/schema';

const SITE_URL = 'https://tastytravels.co';

export default function ArticleSchemaInjector() {
    const pathname = usePathname();

    // Match /blog/[slug]
    const match = pathname?.match(/^\/blog\/([^/]+)$/);
    if (!match) return null;

    const slug = match[1];
    const article = articleMeta[slug];
    if (!article) return null;

    const blogPosting = buildBlogPostingSchema(article);
    const breadcrumb = buildBreadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'Blog', url: `${SITE_URL}/blog` },
        { name: article.title, url: `${SITE_URL}/blog/${article.slug}` },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
        </>
    );
}
