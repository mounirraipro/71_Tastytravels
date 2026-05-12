'use client';

interface AuthorBylineProps {
    date: string;
    readTime: string;
    author?: string;
}

export default function AuthorByline({ date, readTime, author = 'Lahcen Aharouane' }: AuthorBylineProps) {
    return (
        <div style={{
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            flexWrap: 'wrap',
        }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                {author}
            </span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{date}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{readTime}</span>
        </div>
    );
}
