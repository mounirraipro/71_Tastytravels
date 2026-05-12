import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '../components/AdSlot';
import gameContent from '../lib/gameContent';

const { name } = gameContent;
const htp = gameContent.howToPlayPage;

export const metadata: Metadata = {
  title: `How to Play ${name} – Complete Guide`,
  description: `Learn how to play ${name} step by step. Master the mechanics and advanced strategies to improve your game.`,
  keywords: [`how to play ${name}`, `${name} guide`, 'game tutorial', `${name} tips`],
};

export default function HowToPlayPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="gradient-text">How to Play</h1>
          <p>Everything you need to know to master {name} — from your first session to advanced strategies.</p>
        </div>
      </div>

      <div className="page-content">
        <h2>Getting Started</h2>
        <p>{htp.intro}</p>

        {htp.steps.map((step, i) => (
          <div key={i}>
            <h3>Step {i + 1}: {step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}

        <AdSlot type="in-content" />

        <h2>{htp.mechanic.title}</h2>
        <p>{htp.mechanic.desc}</p>

        <h2>Difficulty Progression</h2>
        <p>{htp.difficultyProgression}</p>

        <h2>Tips &amp; Strategies</h2>
        <ul>
          {htp.tips.map((tip) => (
            <li key={tip.title}>
              <strong>{tip.title}:</strong> {tip.desc}
            </li>
          ))}
        </ul>

        <h2>Ready to Play?</h2>
        <p>Now that you know the basics, it&apos;s time to put your skills to the test!</p>
        <p style={{ marginTop: '1.5rem' }}>
          <Link href="/play" className="btn btn-primary">
            Play Now →
          </Link>
        </p>

        <AdSlot type="banner" />
      </div>
    </>
  );
}
