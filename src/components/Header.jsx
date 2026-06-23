import { PLAN, WEEKS } from '../data/plan';

export default function Header({ week, day, view, onWeekChange, onViewToggle }) {
  const isTrain = view === 'train';
  const subline = isTrain ? `Woche ${week} · ${PLAN[day].label}` : 'Verlauf';

  return (
    <div className="head">
      <div className="brand">
        <div className="l">
          <h1>KRAFT</h1>
          <span className="sub">{subline}</span>
        </div>
        <button className="toggle" onClick={onViewToggle}>
          {isTrain ? 'Verlauf' : 'Training'}
        </button>
      </div>
      {isTrain && (
        <>
          <div className="weeks">
            {[1, 2, 3, 4].map(w => (
              <button key={w} className={`wk${w === week ? ' active' : ''}`} onClick={() => onWeekChange(w)}>
                <span className="n">{w}</span>
                <span className="lab">{WEEKS[w].name}</span>
              </button>
            ))}
          </div>
          <div className="focus">
            <b>{WEEKS[week].rir}</b> · {WEEKS[week].note}
          </div>
        </>
      )}
    </div>
  );
}
