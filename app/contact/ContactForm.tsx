'use client';

import { useState } from 'react';

const SUPPORT_EMAIL = 'hello@tastytravels.co';

export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const mailSubject = `[Tasty Travels] ${formData.subject || 'General Inquiry'}`;
        const mailBody = [
            `Name: ${formData.name}`,
            `Email: ${formData.email}`,
            `Topic: ${formData.subject}`,
            '',
            formData.message,
        ].join('\n');

        const mailtoUrl = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

        window.location.href = mailtoUrl;
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="card" style={{
                textAlign: 'center',
                padding: '3rem 2rem',
                borderColor: 'var(--accent)',
            }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📨</div>
                <h3 style={{ marginBottom: '0.5rem' }}>Email app opened</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                    If your email app did not open, send your message manually to {SUPPORT_EMAIL}.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
                <label htmlFor="name" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: 'var(--text)',
                }}>
                    Your Name
                </label>
                <input
                    id="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-card)',
                        color: 'var(--text)',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color var(--transition)',
                    }}
                />
            </div>

            <div>
                <label htmlFor="email" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: 'var(--text)',
                }}>
                    Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-card)',
                        color: 'var(--text)',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color var(--transition)',
                    }}
                />
            </div>

            <div>
                <label htmlFor="subject" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: 'var(--text)',
                }}>
                    Subject
                </label>
                <select
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                    style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-card)',
                        color: 'var(--text)',
                        fontSize: '1rem',
                        outline: 'none',
                    }}
                >
                    <option value="">Select a topic</option>
                    <option value="General Feedback">General Feedback</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Partnership Inquiry">Partnership Inquiry</option>
                    <option value="Privacy Concern">Privacy Concern</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div>
                <label htmlFor="message" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: 'var(--text)',
                }}>
                    Message
                </label>
                <textarea
                    id="message"
                    required
                    rows={6}
                    placeholder="Tell us what's on your mind..."
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-card)',
                        color: 'var(--text)',
                        fontSize: '1rem',
                        outline: 'none',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                    }}
                />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Compose Email
            </button>
        </form>
    );
}
