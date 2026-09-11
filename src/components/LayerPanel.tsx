import type { LayerId } from '../data/types'
import { DISSECTION_STEPS, LAYERS } from '../data/layers'
import { t } from '../i18n/ar'

interface Props {
  layers: Record<LayerId, boolean>
  onToggle: (id: LayerId) => void
  onShowAll: () => void
  onHideAll: () => void
  focusStep: number
  onFocusStep: (n: number) => void
}

export default function LayerPanel({
  layers,
  onToggle,
  onShowAll,
  onHideAll,
  focusStep,
  onFocusStep,
}: Props) {
  return (
    <div className="layer-panel">
      <div className="layer-panel-head">
        <h3>{t.layersTitle}</h3>
        <div className="layer-panel-actions">
          <button type="button" className="mini-btn" onClick={onShowAll}>
            {t.showAll}
          </button>
          <button type="button" className="mini-btn" onClick={onHideAll}>
            {t.hideAll}
          </button>
        </div>
      </div>

      <div className="layers-list">
        {LAYERS.map((l) => (
          <label key={l.id} className={`layer-row ${layers[l.id] ? 'on' : ''}`}>
            <input
              type="checkbox"
              checked={layers[l.id]}
              onChange={() => onToggle(l.id)}
              aria-label={l.ar}
            />
            <span className="layer-icon" aria-hidden>
              {l.icon}
            </span>
            <span className="layer-name">{l.ar}</span>
          </label>
        ))}
      </div>

      <div className="dissection">
        <h4>
          🔬 {t.layerByLayer}
        </h4>
        <input
          type="range"
          min={0}
          max={DISSECTION_STEPS.length - 1}
          step={1}
          value={focusStep}
          onChange={(e) => onFocusStep(Number(e.target.value))}
          className="dissection-slider"
          aria-label={t.layerSlider}
          aria-valuetext={DISSECTION_STEPS[focusStep].ar}
        />
        <div className="dissection-steps" dir="rtl">
          {DISSECTION_STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`step-dot ${i === focusStep ? 'on' : ''}`}
              onClick={() => onFocusStep(i)}
              aria-label={s.ar}
              title={s.ar}
            >
              <span aria-hidden>{s.icon}</span>
            </button>
          ))}
        </div>
        <p className="dissection-current">
          {DISSECTION_STEPS[focusStep].icon} {DISSECTION_STEPS[focusStep].ar}
        </p>
      </div>
    </div>
  )
}
