import GameIframe from './GameIframe';

export default function MobileGamePreview() {
  return (
    <div className="game-frame-outer">
      {/* Floating badge stickers */}
      <span className="game-badge game-badge-1">✦ Free to Play</span>
      <span className="game-badge game-badge-2">🧩 25+ Levels</span>
      <span className="game-badge game-badge-3">⚡ Instant Start</span>

      <GameIframe
        src="/game/index.html"
        title="Tasty Travels – Try a level"
        scrolling="no"
        className="game-iframe-responsive"
      />
    </div>
  );
}
