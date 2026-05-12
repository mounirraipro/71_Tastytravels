import { ArticleMeta } from './articleMeta';

const SITE_URL = 'https://tastytravels.co';
const AUTHOR_NAME = 'Lahcen Aharouane';
const AUTHOR_URL = `${SITE_URL}/about`;
const ORG_LOGO = `${SITE_URL}/og-image.png`;

export function buildOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Tasty Travels',
        url: SITE_URL,
        logo: {
            '@type': 'ImageObject',
            url: ORG_LOGO,
        },
        sameAs: [],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            url: `${SITE_URL}/contact`,
        },
    };
}

export function buildWebSiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Tasty Travels',
        url: SITE_URL,
        description: 'Play Tasty Travels free online — no download, no account needed.',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };
}

export function buildWebApplicationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Tasty Travels',
        url: SITE_URL,
        applicationCategory: 'GameApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description:
            'A free browser-based game. Play Tasty Travels online instantly.',
        author: {
            '@type': 'Person',
            name: AUTHOR_NAME,
            url: AUTHOR_URL,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Tasty Travels',
            url: SITE_URL,
        },
    };
}

export function buildBlogPostingSchema(article: ArticleMeta) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.description,
        url: `${SITE_URL}/blog/${article.slug}`,
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        keywords: article.keywords.join(', '),
        inLanguage: 'en-US',
        author: {
            '@type': 'Person',
            name: AUTHOR_NAME,
            url: AUTHOR_URL,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Tasty Travels',
            url: SITE_URL,
            logo: {
                '@type': 'ImageObject',
                url: ORG_LOGO,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/blog/${article.slug}`,
        },
        articleSection: article.category,
        timeRequired: `PT${article.readTime.replace(' min read', 'M')}`,
    };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}
