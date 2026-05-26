import raw from '../../content/game.json';

export type Stat        = { value: string; label: string };
export type Step        = { icon: string; title: string; desc: string };
export type Category    = { name: string; icon: string; color: string; bg: string; img?: string };
export type Feature     = { icon: string; title: string; desc: string };
export type FaqItem     = { q: string; a: string };
export type Tip         = { title: string; desc: string } | string;
export type SimpleStep  = { title: string; desc: string };

export type BlogSection = { heading: string; paragraphs: string[] };
export type BlogPost    = {
  slug:     string;
  title:    string;
  excerpt:  string;
  category: string;
  readTime: string;
  date:     string;
  icon:     string;
  sections: BlogSection[];
};

export type GameContent = {
  name: string;
  domain: string;
  slug: string;
  genre: string;
  iframeUrl: string;
  embedUrl: string;
  embedSource: string;
  seo: { title: string; description: string; keywords: string[] };
  homepage: {
    heroHeadline: string;
    heroSubtitle: string;
    lede: string;
    stats: Stat[];
    about: { kicker: string; headline: string; paragraph1: string; paragraph2: string };
    howToPlay: { headline: string; subheading: string };
    steps: Step[];
    categories: Category[];
    features: Feature[];
    faq: FaqItem[];
    cta: { headline: string; subtext: string };
  };
  playPage: { howItWorksSubtitle: string; steps: SimpleStep[] };
  faqPage: { items: FaqItem[] };
  howToPlayPage: {
    intro: string;
    steps: SimpleStep[];
    mechanic: { title: string; desc: string } | string;
    difficultyProgression: string;
    tips: Tip[];
  };
  blog: {
    headline: string;
    subheading: string;
    introParagraph: string;
    posts: BlogPost[];
  };
};

export const gameContent = raw as unknown as GameContent;
export default gameContent;
