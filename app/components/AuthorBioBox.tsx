'use client';

const AUTHORS: Record<string, {
    name: string;
    title: string;
    bio: string;
    initials: string;
}> = {
    'default': {
        name: 'Lahcen Aharouane',
        title: 'Game Designer & Web Developer',
        bio: 'Game designer and web developer specialising in browser-based games and SEO-optimised game landing pages.',
        initials: 'LA',
    },
};

interface AuthorBioBoxProps {
    author?: string;
}

export default function AuthorBioBox({ author = 'default' }: AuthorBioBoxProps) {
    const profile = AUTHORS[author] ?? AUTHORS['default'];

    return (
        <div className="author-bio-box">
            <div className="author-bio-avatar" aria-hidden="true">
                {profile.initials}
            </div>
            <div className="author-bio-content">
                <p className="author-bio-name">{profile.name}</p>
                <p className="author-bio-title">{profile.title}</p>
                <p className="author-bio-text">{profile.bio}</p>
            </div>
        </div>
    );
}
