import type { Metadata } from 'next';
import Link from 'next/link';
import { categories } from '../lib/gameData';

export const metadata: Metadata = {
    title: 'Sitemap – All Pages',
    description: 'Browse the complete sitemap of Tasty Travels. Find every page on our website including games, blog posts, and information pages.',
    keywords: ['Tasty Travels sitemap', 'all pages', 'site navigation'],
    alternates: {
        canonical: '/sitemap-page',
    },
};

const sections = [
    {
        title: 'Main Pages',
        links: [
            { href: '/', label: 'Home' },
            { href: '/play', label: 'Play Tasty Travels' },
            { href: '/categories', label: 'All Categories' },
            { href: '/how-to-play', label: 'How to Play' },
            { href: '/faq', label: 'FAQ' },
        ],
    },
    {
        title: 'Game Categories',
        links: categories.map(cat => ({
            href: `/categories/${cat.slug}`,
            label: `${cat.icon} ${cat.name}`,
        })),
    },
    {
        title: 'Blog',
        links: [
            { href: '/blog', label: 'Blog Home' },
            { href: '/blog/how-to-get-better-at-jigsaw-puzzles', label: 'How to Get Better at Jigsaw Puzzles' },
            { href: '/blog/are-puzzles-good-for-anxiety-and-stress', label: 'Are Puzzles Good for Anxiety and Stress?' },
            { href: '/blog/best-puzzle-routine-for-busy-adults', label: 'Best Puzzle Routine for Busy Adults' },
            { href: '/blog/how-to-choose-the-right-puzzle-difficulty', label: 'How to Choose the Right Puzzle Difficulty' },
            { href: '/blog/what-is-jigsolitaire', label: 'What is Tasty Travels?' },
            { href: '/blog/benefits-of-puzzle-games', label: '7 Brain Benefits of Puzzle Games' },
            { href: '/blog/tips-and-tricks', label: 'Pro Tips & Tricks' },
            { href: '/blog/history-of-puzzle-games', label: 'History of Jigsaw & Solitaire' },
            { href: '/blog/best-puzzle-games-for-kids', label: 'Best Puzzle Games for Kids' },
            { href: '/blog/neuroscience-of-puzzle-solving', label: 'The Neuroscience of Puzzle Solving' },
            { href: '/blog/puzzles-and-focus', label: 'How Puzzles Improve Focus and Attention' },
            { href: '/blog/puzzle-solving-psychology', label: 'Puzzle-Solving Psychology' },
            { href: '/blog/pattern-recognition-skills', label: 'Pattern Recognition Skills for Puzzlers' },
            { href: '/blog/brain-training-techniques', label: 'Brain Training Techniques That Actually Work' },
            { href: '/blog/mindfulness-and-puzzles', label: 'Mindfulness and Puzzles' },
            { href: '/blog/history-of-card-games', label: 'The Complete History of Card Games' },
            { href: '/blog/famous-puzzle-designers', label: 'Famous Puzzle Designers' },
            { href: '/blog/golden-age-of-puzzles', label: 'The Golden Age of Puzzles' },
            { href: '/blog/screen-time-guide', label: 'A Parent\'s Complete Guide to Screen Time' },
            { href: '/blog/family-game-night', label: 'Family Game Night: Building Bonds Through Puzzles' },
            { href: '/blog/puzzles-build-resilience', label: 'How Puzzles Build Resilience and Patience in Children' },
            { href: '/blog/best-free-online-puzzle-games', label: '10 Best Free Online Puzzle Games in 2026' },
            { href: '/blog/puzzles-vs-social-media', label: 'Puzzles vs. Social Media' },
            { href: '/blog/puzzles-for-seniors', label: 'How Seniors Can Use Puzzles to Stay Mentally Sharp' },
        ],
    },
    {
        title: 'Company',
        links: [
            { href: '/about', label: 'About Us' },
            { href: '/contact', label: 'Contact Us' },
            { href: '/parents', label: 'Parents & Safety' },
            { href: '/accessibility', label: 'Accessibility' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { href: '/privacy-policy', label: 'Privacy Policy' },
            { href: '/terms', label: 'Terms of Service' },
            { href: '/cookie-policy', label: 'Cookie Policy' },
            { href: '/disclaimer', label: 'Disclaimer' },
        ],
    },
];

export default function SitemapPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">Sitemap</h1>
                    <p>Browse every page on Tasty Travels.</p>
                </div>
            </div>

            <div className="container" style={{ maxWidth: '900px', padding: '0 1.5rem 4rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                }}>
                    {sections.map((section) => (
                        <div key={section.title} className="card">
                            <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--primary-light)' }}>
                                {section.title}
                            </h2>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {section.links.map((link) => (
                                    <li key={link.href} style={{ marginBottom: '0.5rem' }}>
                                        <Link href={link.href} style={{
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.9rem',
                                        }}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
