import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import MiniOrgan from '../components/MiniOrgan'
import { MODEL_ORGANS } from '../data'
import { getSystem } from '../data/systems'
import { useAppStore } from '../store/appStore'
import { useUserStore } from '../store/userStore'
import { t } from '../i18n/ar'

export default function CardsPage() {
  const sex = useAppStore((s) => s.sex)!
  const cardsSeen = useUserStore((s) => s.cardsSeen)
  const markCardSeen = useUserStore((s) => s.markCardSeen)

  const deck = useMemo(() => MODEL_ORGANS.filter((o) => o.sex === 'both' || o.sex === undefined || o.sex === sex), [sex])
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const organ = deck[idx % deck.length]
  const sys = getSystem(organ.system)

  const next = () => {
    markCardSeen(organ.id)
    setFlipped(false)
    setTimeout(() => setIdx((i) => (i + 1) % deck.length), 150)
  }

  return (
    <div className="page cards-page">
      <header className="page-head">
        <Link to="/" className="icon-btn" aria-label={t.back}>
          →
        </Link>
        <h1>🎴 {t.cardsTitle}</h1>
        <p className="muted">{t.cardsSub}</p>
      </header>

      <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped((v) => !v)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setFlipped((v) => !v)}>
        <div className="flashcard-face flashcard-front">
          <div className="flashcard-art">
            <MiniOrgan organ={organ} sex={sex} />
          </div>
          <p className="flashcard-q">{t.whatIsThis}</p>
          <span className="flashcard-hint">{t.flip}</span>
        </div>
        <div className="flashcard-face flashcard-back">
          <span className="flashcard-system" style={{ color: sys?.color }}>
            {sys?.icon} {sys?.ar}
          </span>
          <h2>{organ.ar}</h2>
          <p dir="ltr">{organ.en}</p>
          <p className="flashcard-func">{organ.function}</p>
        </div>
      </div>

      <div className="cards-nav">
        <span className="muted">
          {cardsSeen.length}/{deck.length} {t.cardsTitle}
        </span>
        <button type="button" className="btn btn-primary" onClick={next}>
          {t.nextCard} ←
        </button>
      </div>
    </div>
  )
}
