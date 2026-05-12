import type { Metadata } from 'next';
import ContactForm from './ContactForm';

const SUPPORT_EMAIL = 'hello@tastytravels.co';

export const metadata: Metadata = {
    title: 'Contact Tasty Travels',
    description: 'Get in touch with the Tasty Travels team for support, feedback, partnerships, accessibility concerns, or privacy questions.',
    keywords: ['contact Tasty Travels', 'Tasty Travels support', 'game contact'],
    alternates: {
        canonical: '/contact',
    },
};

export default function ContactPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">Contact Us</h1>
                    <p>Have a question, suggestion, partnership idea, or policy concern? We&apos;d love to hear from you.</p>
                </div>
            </div>

            <div className="page-content">
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h2>Get In Touch</h2>
                    <p>
                        We value every message from our community. Whether you&apos;re reporting a bug, suggesting a new feature,
                        asking about business opportunities, or following up on privacy and accessibility concerns, we aim to make it easy to reach a real person.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.5rem',
                        margin: '2rem 0',
                    }}>
                        {[
                            { icon: '📧', label: 'Email', value: SUPPORT_EMAIL },
                            { icon: '⏱️', label: 'Response Time', value: 'Usually within 48 hours' },
                            { icon: '🌍', label: 'Availability', value: 'Players worldwide' },
                        ].map((item) => (
                            <div key={item.label} className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                                <strong style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>{item.label}</strong>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.value}</span>
                            </div>
                        ))}
                    </div>

                    <h2>Send Us a Message</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        This form opens your email app with the details prefilled, so you can review your message before sending it.
                        If you prefer, you can email us directly at <strong>{SUPPORT_EMAIL}</strong>.
                    </p>

                    <ContactForm />

                    <h2>Frequently Asked</h2>
                    <p>
                        Before reaching out, you might find your answer in our <a href="/faq">FAQ page</a>. We&apos;ve collected answers to the most common gameplay,
                        compatibility, and account-free usage questions there.
                    </p>
                </div>
            </div>
        </>
    );
}
