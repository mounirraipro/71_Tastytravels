import Link from 'next/link';

interface ArticleTagsProps {
    category: string;
    tags: string[];
}

export default function ArticleTags({ category, tags }: ArticleTagsProps) {
    return (
        <div className="article-tags-box">
            <span className="article-tags-label">Filed under:</span>
            <Link href={`/categories/${category.toLowerCase()}`} className="article-tag article-tag-category">
                {category}
            </Link>
            {tags.map((tag) => (
                <span key={tag} className="article-tag">
                    {tag}
                </span>
            ))}
        </div>
    );
}
