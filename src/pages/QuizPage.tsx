import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { buildQuiz } from '../lib/quiz'
import { getOrgan } from '../data'
import { getSystem } from '../data/systems'
import type { QuizQuestion } from '../data/types'
import { useUserStore } from '../store/userStore'
import { t } from '../i18n/ar'

type Phase = 'start' | 'run' | 'result'

export default function QuizPage() {
  const bestScore = useUserStore((s) => s.bestScore)
  const addQuizResult = useUserStore((s) => s.addQuizResult)

  const [phase, setPhase] = useState<Phase>('start')
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<{ q: QuizQuestion; picked: number; correct: boolean }[]>([])

  const start = () => {
    setQuestions(buildQuiz())
    setIndex(0)
    setScore(0)
    setPicked(null)
    setAnswers([])
    setPhase('run')
  }

  const q = questions[index]
  const organ = q?.organId ? getOrgan(q.organId) : undefined
  const sys = organ ? getSystem(organ.system) : undefined

  const submit = () => {
    if (picked === null || !q) return
    const correct = picked === q.answer
    if (correct) setScore((s) => s + 1)
    setAnswers((a) => [...a, { q, picked, correct }])
    setPicked(null)
    if (index + 1 >= questions.length) {
      addQuizResult(score + (correct ? 1 : 0), questions.length)
      setPhase('result')
    } else {
      setIndex((i) => i + 1)
    }
  }

  const pct = useMemo(() => (questions.length ? Math.round((score / questions.length) * 100) : 0), [score, questions.length])

  if (phase === 'start') {
    return (
      <div className="page empty-state">
        <span className="empty-icon" aria-hidden>
          📝
        </span>
        <h1>{t.quizTitle}</h1>
        <p>{t.quizSub}</p>
        {bestScore > 0 && (
          <p className="quiz-best">
            🏆 {t.bestScore}: {bestScore}%
          </p>
        )}
        <button type="button" className="btn btn-primary" onClick={start}>
          {t.start}
        </button>
      </div>
    )
  }

  if (phase === 'result') {
    return (
      <div className="page quiz-result">
        <header className="page-head">
          <h1>📊 {t.result}</h1>
        </header>
        <div className="result-hero">
          <div className="result-score" style={{ color: pct >= 70 ? 'var(--success)' : pct >= 40 ? 'var(--warn)' : 'var(--danger)' }}>
            {pct}%
          </div>
          <p>
            {score} {t.correct} / {questions.length}
          </p>
          {pct >= bestScore && pct > 0 && <p className="new-best">{t.newBest}</p>}
        </div>
        <div className="result-list">
          {answers.map((a, i) => (
            <div key={a.q.id} className={`result-item ${a.correct ? 'ok' : 'no'}`}>
              <span className="result-item-icon" aria-hidden>
                {a.correct ? '✅' : '❌'}
              </span>
              <div>
                <p className="result-q">
                  {i + 1}. {a.q.text}
                </p>
                <p className="result-a">
                  {a.correct ? 'إجابتك صحيحة' : `إجابتك: ${a.q.options[a.picked]} — الصحيح: ${a.q.options[a.q.answer]}`}
                </p>
                {a.q.explain && <p className="result-explain">💡 {a.q.explain}</p>}
              </div>
            </div>
          ))}
        </div>
        <div className="result-actions">
          <button type="button" className="btn btn-primary" onClick={start}>
            🔄 {t.retry}
          </button>
          <Link to="/" className="btn">
            {t.home}
          </Link>
        </div>
      </div>
    )
  }

  if (!q) return null

  return (
    <div className="page quiz-run">
      <header className="page-head">
        <button type="button" className="icon-btn" onClick={() => setPhase('start')} aria-label={t.cancel}>
          ✕
        </button>
        <h1>
          {t.question} {index + 1} {t.of} {questions.length}
        </h1>
      </header>
      <div className="progress-track quiz-progress">
        <div className="progress-fill" style={{ width: `${(index / questions.length) * 100}%` }} />
      </div>

      {organ && sys && (
        <div className="quiz-organ-hint" style={{ borderColor: `${sys.color}55`, color: sys.color }}>
          {sys.icon} {organ.ar}
        </div>
      )}

      <div className="quiz-card">
        <h2>{q.text}</h2>
        <div className="quiz-options" role="radiogroup">
          {q.options.map((opt, i) => {
            const isPicked = picked === i
            const isCorrect = picked !== null && i === q.answer
            const isWrong = isPicked && i !== q.answer
            return (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={isPicked}
                className={`quiz-option ${isPicked ? 'picked' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                onClick={() => setPicked(i)}
                disabled={picked !== null}
              >
                <span className="option-letter" aria-hidden>
                  {['أ', 'ب', 'ج', 'د'][i]}
                </span>
                <span>{opt}</span>
              </button>
            )
          })}
        </div>
        {picked !== null && q.explain && <p className="quiz-explain">💡 {q.explain}</p>}
        <button type="button" className="btn btn-primary" disabled={picked === null} onClick={submit}>
          {index + 1 >= questions.length ? t.result : t.submit}
        </button>
      </div>
    </div>
  )
}
