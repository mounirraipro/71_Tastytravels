'use client';

import { useState } from 'react';

export default function StarRating() {
    const [hovered, setHovered] = useState(0);
    const [selected, setSelected] = useState(0);

    const labels = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'];

    if (selected > 0) {
        return (
            <div className="star-rating-box">
                <p className="star-rating-thanks">
                    Thanks for rating! You gave this article {selected} out of 5 stars.
                </p>
            </div>
        );
    }

    return (
        <div className="star-rating-box">
            <p className="star-rating-label">Was this article helpful?</p>
            <div className="star-rating-stars" role="group" aria-label="Rate this article">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        className={`star-btn${(hovered || selected) >= star ? ' active' : ''}`}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        onClick={() => setSelected(star)}
                        aria-label={`Rate ${star} out of 5 — ${labels[star]}`}
                    >
                        ★
                    </button>
                ))}
            </div>
            {hovered > 0 && (
                <p className="star-rating-hint">{labels[hovered]}</p>
            )}
        </div>
    );
}
