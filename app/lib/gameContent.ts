import raw from '../../content/game.json';

export type Stat        = { value: string; label: string };
export type Step        = { icon: string; title: string; desc: string };
export type Category    = { name: string; icon: string; color: string; bg: string; img?: string };
export type Feature     = { icon: string; title: string; desc: string };
export type FaqItem     = { q: string; a: string };
export type Tip         = { title: string; desc: string };
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

export type GameContent = typeof raw;
export const gameContent: GameContent = raw;
export default gameContent;
