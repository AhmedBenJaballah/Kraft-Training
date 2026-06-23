import { PLAN, WEEKS } from '../data/plan';
import { effSets, prevFor } from '../utils';

function SetRow({ idx, data, done, onFieldChange, onToggleDone }) {
  return (
    <div className={`set${done ? ' done' : ''}`}>
      <span className="set-n">{idx + 1}.</span>
      <span className="fld">
        <span className="u">kg</span>
        <input
          type="number" inputMode="decimal"
          value={data?.kg ?? ''}
          onChange={e => onFieldChange('kg', e.target.value)}
        />
      </span>
      <span className="fld">
        <span className="u">×</span>
        <input
          type="number" inputMode="numeric"
          value={data?.reps ?? ''}
          onChange={e => onFieldChange('reps', e.target.value)}
        />
      </span>
      <button className={`chk${done ? ' on' : ''}`} aria-label="Satz erledigt" onClick={onToggleDone}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
          <path d="M5 12l5 5L20 6" />
        </svg>
      </button>
    </div>
  );
}

function ExerciseCard({ ex, week, log, prev, accent, rir, onSetField, onSetDone }) {
  const n = effSets(ex.sets, week);
  return (
    <div className="ex" style={{ '--accent': accent }}>
      <div className="ex-top">
        <div>
          <div className="ex-name">{ex.name}</div>
          <div className="ex-region">{ex.region}</div>
        </div>
        <div>
          <div className="ex-target">{n} × {ex.reps}<br />{rir}</div>
          {prev && <div className="prev">zuletzt: {prev}</div>}
        </div>
      </div>
      <div className="sets">
        {Array.from({ length: n }, (_, s) => (
          <SetRow
            key={s} idx={s}
            data={log[s]}
            done={!!log[s]?.done}
            onFieldChange={(field, value) => onSetField(ex.id, s, field, value)}
            onToggleDone={() => onSetDone(ex.id, s)}
          />
        ))}
      </div>
    </div>
  );
}

export default function TrainView({ week, day, store, history, onDayChange, onSetField, onSetDone }) {
  const plan = PLAN[day];
  return (
    <>
      <div className="days">
        {['A', 'B'].map(k => (
          <button
            key={k}
            className={`day${k === day ? ' active' : ''}`}
            data-d={k}
            onClick={() => onDayChange(k)}
          >
            <div className="t">{k} · {PLAN[k].label}</div>
            <div className="s">{PLAN[k].sub}</div>
          </button>
        ))}
      </div>
      <div className="list">
        {plan.ex.map(ex => (
          <ExerciseCard
            key={ex.id} ex={ex} week={week}
            log={store[ex.id] || []}
            prev={prevFor(ex.id, day, history)}
            accent={plan.accent}
            rir={WEEKS[week].rir}
            onSetField={onSetField}
            onSetDone={onSetDone}
          />
        ))}
      </div>
      <div className="note">
        Tipp: Schaffst du bei <b>allen</b> Sätzen das obere Wdh-Ende sauber → nächstes Mal Gewicht hoch. Mit „Session speichern" wählst du das Datum und es landet im Verlauf.
      </div>
      <details>
        <summary>Warum dieser Plan?</summary>
        <div className="info">
          <b>Zug-lastig:</b> Etwas mehr Rücken/hinterer Delt als Brust – gegen die Hyperkyphose.<br /><br />
          <b>Brust komplett:</b> Schrägbank (oben) + Flachbank (Mitte) + Dips (unten) + Flys (Dehnung).<br /><br />
          <b>4-Wochen-Logik:</b> W1 einpegeln → W2 mehr Wdh → W3 schwerer → W4 Deload.<br /><br />
          <b>Skoliose:</b> Seitstütz beidseitig gleich, einseitige Übungen kontrolliert.
        </div>
      </details>
    </>
  );
}
