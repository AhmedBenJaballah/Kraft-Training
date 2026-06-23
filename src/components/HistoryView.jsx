import { useState } from 'react';
import { WD, MON } from '../data/plan';
import { pad, dayKey } from '../utils';

function CalendarView({ calMonth, selDay, history, onMonthChange, onSelDay }) {
  const y = calMonth.getFullYear(), m = calMonth.getMonth();
  const byDay = {};
  history.forEach(h => {
    const k = dayKey(h.ts);
    (byDay[k] = byDay[k] || []).push(h.day);
  });
  const offset = (new Date(y, m, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const todayK = dayKey(Date.now());

  return (
    <div className="cal">
      <div className="cal-head">
        <button className="cal-nav" onClick={() => onMonthChange(new Date(y, m - 1, 1))}>‹</button>
        <div className="cal-title">{MON[m]} {y}</div>
        <button className="cal-nav" onClick={() => onMonthChange(new Date(y, m + 1, 1))}>›</button>
      </div>
      <div className="cal-grid">
        {WD.map(w => <div key={w} className="cal-wd">{w}</div>)}
        {Array.from({ length: offset }, (_, i) => <div key={`e${i}`} className="cal-cell empty" />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const d = i + 1;
          const k = `${y}-${pad(m + 1)}-${pad(d)}`;
          const types = [...new Set(byDay[k] || [])];
          const cls = ['cal-cell', k === todayK ? 'today' : '', k === selDay ? 'sel' : ''].filter(Boolean).join(' ');
          return (
            <div key={k} className={cls} onClick={() => onSelDay(selDay === k ? null : k)}>
              <span>{d}</span>
              <span className="dots">
                {types.slice(0, 2).map((x, i) => <span key={i} className={`dot ${x}`} />)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HistoryCard({ entry, onDelete }) {
  const [open, setOpen] = useState(false);
  const d = new Date(entry.ts);
  const dateStr = d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' Uhr';
  const hasValues = entry.ex.some(e => e.sets.some(s => s.kg || s.reps));

  return (
    <div className="h-card">
      <div className="h-head" onClick={() => setOpen(!open)}>
        <span className={`h-badge ${entry.day}`}>{entry.day} · {entry.label}</span>
        <div className="h-date">
          <div className="d">{dateStr}</div>
          <div className="m">Woche {entry.week} · {timeStr}</div>
        </div>
        <span className="h-sum">{entry.done}/{entry.total}</span>
      </div>
      <div className={`h-body${open ? ' open' : ''}`}>
        {hasValues
          ? entry.ex.map(e => {
              const parts = e.sets.filter(s => s.kg || s.reps).map(s => `${s.kg || '–'}×${s.reps || '–'}`);
              if (!parts.length) return null;
              return (
                <div key={e.id} className="h-ex">
                  <div className="nm">{e.name}</div>
                  <div className="ss">{parts.join('  ·  ')}</div>
                </div>
              );
            })
          : <div className="h-ex"><div className="ss">Keine Werte eingetragen.</div></div>
        }
        <button
          className="h-del"
          onClick={ev => { ev.stopPropagation(); onDelete(entry.id); }}
        >
          Eintrag löschen
        </button>
      </div>
    </div>
  );
}

export default function HistoryView({ calMonth, selDay, history, onMonthChange, onSelDay, onDelete }) {
  let filtered = [...history].sort((a, b) => b.ts - a.ts);
  if (selDay) filtered = filtered.filter(h => dayKey(h.ts) === selDay);

  return (
    <>
      <CalendarView
        calMonth={calMonth} selDay={selDay} history={history}
        onMonthChange={onMonthChange} onSelDay={onSelDay}
      />
      <div className="filterbar">
        {selDay && (
          <>
            <span>
              Gefiltert: {new Date(selDay + 'T12:00:00').toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
            <button onClick={() => onSelDay(null)}>Alle anzeigen</button>
          </>
        )}
      </div>
      {filtered.length === 0 ? (
        <div className="h-empty">
          {selDay
            ? 'Keine Session an diesem Tag.'
            : <>Noch keine Sessions gespeichert.<br />Trag dein Training ein und tipp auf <b>„Session speichern"</b>.</>
          }
        </div>
      ) : (
        filtered.map(h => <HistoryCard key={h.id} entry={h} onDelete={onDelete} />)
      )}
    </>
  );
}
