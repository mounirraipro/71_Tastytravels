import fs from 'fs';
import path from 'path';

export interface GameLevel {
  id: number;
  title: string;
  gridSize: string;
  gridCols: number;
  gridRows: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert' | 'Master';
  imageKeyword: string;
  imageThumbnail: string;
}

export interface GameCategory {
  slug: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  longDescription: string;
  levels: GameLevel[];
}

// TODO: Replace these with your game's actual categories
const categoryMetadata: Record<string, Partial<GameCategory>> = {
  Category1: { slug: 'category-1', icon: '🎮', color: '#ef4444', description: '[CATEGORY_1_DESCRIPTION]', longDescription: '[CATEGORY_1_LONG_DESCRIPTION]' },
  Category2: { slug: 'category-2', icon: '🌿', color: '#22c55e', description: '[CATEGORY_2_DESCRIPTION]', longDescription: '[CATEGORY_2_LONG_DESCRIPTION]' },
  Category3: { slug: 'category-3', icon: '🏙️', color: '#6c5ce7', description: '[CATEGORY_3_DESCRIPTION]', longDescription: '[CATEGORY_3_LONG_DESCRIPTION]' },
  Category4: { slug: 'category-4', icon: '🎨', color: '#e17055', description: '[CATEGORY_4_DESCRIPTION]', longDescription: '[CATEGORY_4_LONG_DESCRIPTION]' },
  Category5: { slug: 'category-5', icon: '⭐', color: '#fdcb6e', description: '[CATEGORY_5_DESCRIPTION]', longDescription: '[CATEGORY_5_LONG_DESCRIPTION]' },
};

export const categories: GameCategory[] = [];

try {
  const levelsDir = path.join(process.cwd(), 'public', 'levels');
  const folders = fs.readdirSync(levelsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  let globalId = 1;
  const diffLevels: Array<'Easy'|'Medium'|'Hard'|'Expert'|'Master'> = ['Easy', 'Medium', 'Hard', 'Expert', 'Master'];

  for (const folder of folders) {
    const meta = categoryMetadata[folder] || {
      slug: folder.toLowerCase(),
      icon: '🧩',
      color: '#888',
      description: `${folder} levels.`,
      longDescription: `Enjoy our collection of ${folder} levels.`
    };

    const folderPath = path.join(levelsDir, folder);
    const files = fs.readdirSync(folderPath)
      .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file));

    const levels: GameLevel[] = [];
    files.forEach((file, index) => {
      const title = file.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const difficulty = diffLevels[Math.min(index, diffLevels.length - 1)];

      levels.push({
        id: globalId++,
        title,
        gridSize: '3×3',
        gridCols: 3,
        gridRows: 3,
        difficulty,
        imageKeyword: file,
        imageThumbnail: `${path.parse(file).name}.webp`
      });
    });

    categories.push({
      slug: meta.slug!,
      name: folder,
      icon: meta.icon!,
      color: meta.color!,
      description: meta.description!,
      longDescription: meta.longDescription!,
      levels
    });
  }
} catch (error) {
  console.error('Error loading dynamic levels:', error);
}

export function getCategoryBySlug(slug: string): GameCategory | undefined {
  return categories.find(c => c.slug === slug);
}

export function getLevelById(id: number): { category: GameCategory; level: GameLevel } | undefined {
  for (const cat of categories) {
    const level = cat.levels.find(l => l.id === id);
    if (level) return { category: cat, level };
  }
  return undefined;
}

export function getAllLevels(): { category: GameCategory; level: GameLevel }[] {
  return categories.flatMap(cat => cat.levels.map(level => ({ category: cat, level })));
}
