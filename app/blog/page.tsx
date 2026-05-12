import type { Metadata } from 'next';
import BlogIndexClient from './BlogIndexClient';
import gameContent from '../lib/gameContent';

export const metadata: Metadata = {
  title: `${gameContent.name} Blog – Tips, Guides & Strategy`,
  description: `Browse the ${gameContent.name} blog for guides, strategy articles, and tips to improve your game.`,
  keywords: [`${gameContent.name} blog`, 'game guides', 'game tips', 'game strategy'],
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return <BlogIndexClient />;
}
