'use client';

import { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <ol className="faq-list">
            {items.map((item, i) => (
                <li key={i} className="faq-item">
                    <button
                        className="faq-question"
                        aria-expanded={open === i}
                        onClick={() => setOpen(open === i ? null : i)}
                    >
                        <span>{item.question}</span>
                        <span className="faq-question-arrow" aria-hidden="true">▼</span>
                    </button>
                    {open === i && (
                        <div className="faq-answer">
                            {item.answer}
                        </div>
                    )}
                </li>
            ))}
        </ol>
    );
}
