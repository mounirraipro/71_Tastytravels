import type { MetadataRoute } from 'next';
import { categories } from './lib/gameData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tastytravels.co';
  const now = new Date();

  // Static pages
  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/play', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/categories', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/how-to-play', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/parents', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/cookie-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/disclaimer', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/accessibility', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/sitemap-page', priority: 0.2, changeFrequency: 'monthly' as const },
  ];

  // Blog posts
  const blogPosts = [
    { path: '/blog/how-to-get-better-at-jigsaw-puzzles', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog/are-puzzles-good-for-anxiety-and-stress', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog/best-puzzle-routine-for-busy-adults', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog/how-to-choose-the-right-puzzle-difficulty', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog/what-is-jigsolitaire', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog/benefits-of-puzzle-games', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog/tips-and-tricks', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog/history-of-puzzle-games', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog/best-puzzle-games-for-kids', priority: 0.6, changeFrequency: 'monthly' as const },
    // Science category
    { path: '/blog/neuroscience-of-puzzle-solving', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog/puzzles-and-focus', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog/puzzle-solving-psychology', priority: 0.6, changeFrequency: 'monthly' as const },
    // Strategy category
    { path: '/blog/pattern-recognition-skills', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog/brain-training-techniques', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog/mindfulness-and-puzzles', priority: 0.6, changeFrequency: 'monthly' as const },
    // History category
    { path: '/blog/history-of-card-games', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog/famous-puzzle-designers', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog/golden-age-of-puzzles', priority: 0.6, changeFrequency: 'monthly' as const },
    // Family category
    { path: '/blog/screen-time-guide', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog/family-game-night', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog/puzzles-build-resilience', priority: 0.6, changeFrequency: 'monthly' as const },
    // Reviews category
    { path: '/blog/best-free-online-puzzle-games', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog/puzzles-vs-social-media', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blog/puzzles-for-seniors', priority: 0.6, changeFrequency: 'monthly' as const },
  ];

  // Category pages
  const categoryPages = categories.map(cat => ({
    path: `/categories/${cat.slug}`,
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }));

  const allPages = [...staticPages, ...blogPosts, ...categoryPages];

  return allPages.map(page => ({
    url: `${baseUrl}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
