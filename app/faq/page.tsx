import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';
import gameContent from '../lib/gameContent';

const { name } = gameContent;
const { items } = gameContent.faqPage;

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

export const metadata: Metadata = {
  title: `FAQ – ${name}`,
  description: `Frequently asked questions about ${name}. Find answers about gameplay, features, device support, and more.`,
  keywords: [`${name} FAQ`, 'game questions', `${name} help`],
};

export default function FAQPage() {
  return (
    <>
      <JsonLd schema={faqSchema} />
      <div className="page-header">
        <div className="container">
          <h1 className="gradient-text">Frequently Asked Questions</h1>
          <p>Got questions? We&apos;ve got answers.</p>
        </div>
      </div>

      <div className="page-content">
        {items.map((faq, i) => (
          <div key={i} style={{ marginBottom: '2rem' }}>
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </div>
        ))}
      </div>
    </>
  );
}
