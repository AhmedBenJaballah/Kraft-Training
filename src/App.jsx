import { useState, useEffect, useRef } from 'react';
import { PLAN } from './data/plan';
import { LS, pad, effSets } from './utils';
import Header from './components/Header';
import TrainView from './components/TrainView';
import HistoryView from './components/HistoryView';
import SaveSheet from './components/SaveSheet';
import Toast from './components/Toast';

export default function App() {
  const [week, setWeek] = useState(() => LS.get('kraft:lastWeek', 1));
  const [day, setDay] = useState(() => LS.get('kraft:lastDay', 'A'));
  const [view, setView] = useState('train');
  const [store, setStore] = useState(() => LS.get(`kraft:log:w${LS.get('kraft:lastWeek', 1)}${LS.get('kraft:lastDay', 'A')}`, {}));
  const [history, setHistory] = useState(() => LS.get('kraft:history', []));
  const [calMonth, setCalMonth] = useState(() => new Date());
  const [selDay, setSelDay] = useState(null);
  const [showSheet, setShowSheet] = useState(false);
  const [sheetDate, setSheetDate] = useState('');
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => { LS.set('kraft:lastWeek', week); }, [week]);
  useEffect(() => { LS.set('kraft:lastDay', day); }, [day]);

  useEffect(() => {
    setStore(LS.get(`kraft:log:w${week}${day}`, {}));
  }, [week, day]);

  function saveStore(newStore) {
    setStore(newStore);
    LS.set(`kraft:log:w${week}${day}`, newStore);
  }

  function showToast(msg) {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  }

  function handleSetField(exId, setIdx, field, value) {
    const exLog = [...(store[exId] || [])];
    exLog[setIdx] = { ...(exLog[setIdx] || {}), [field]: value };
    saveStore({ ...store, [exId]: exLog });
  }

  function handleSetDone(exId, setIdx) {
    const exLog = [...(store[exId] || [])];
    exLog[setIdx] = { ...(exLog[setIdx] || {}), done: !exLog[setIdx]?.done };
    saveStore({ ...store, [exId]: exLog });
  }

  const plan = PLAN[day];

  let totalSets = 0, doneSets = 0;
  plan.ex.forEach(ex => {
    const n = effSets(ex.sets, week);
    totalSets += n;
    const log = store[ex.id] || [];
    for (let s = 0; s < n; s++) if (log[s]?.done) doneSets++;
  });

  function openSheet() {
    let any = false;
    plan.ex.forEach(e => {
      const n = effSets(e.sets, week);
      const log = store[e.id] || [];
      for (let s = 0; s < n; s++) { const v = log[s] || {}; if (v.kg || v.reps || v.done) any = true; }
    });
    if (!any) { showToast('Noch nichts eingetragen'); return; }
    const now = new Date();
    setSheetDate(`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`);
    setShowSheet(true);
  }

  function confirmSave() {
    const now = new Date();
    let ts;
    if (sheetDate) {
      const t = new Date(`${sheetDate}T${pad(now.getHours())}:${pad(now.getMinutes())}`);
      ts = isNaN(t.getTime()) ? now.getTime() : t.getTime();
    } else {
      ts = now.getTime();
    }
    const exData = plan.ex.map(e => {
      const n = effSets(e.sets, week);
      const log = store[e.id] || [];
      const sets = Array.from({ length: n }, (_, s) => {
        const v = log[s] || {};
        return { kg: v.kg || '', reps: v.reps || '', done: !!v.done };
      });
      return { id: e.id, name: e.name, reps: e.reps, sets };
    });
    let total = 0, done = 0;
    exData.forEach(e => e.sets.forEach(s => { total++; if (s.done) done++; }));
    const newHist = [...history, { id: Date.now(), ts, week, day, label: plan.label, total, done, ex: exData }];
    setHistory(newHist);
    LS.set('kraft:history', newHist);
    setShowSheet(false);
    showToast('Im Verlauf gespeichert ✓');
  }

  function resetDay() {
    if (!confirm(`Woche ${week} · Tag ${day} (${plan.label}) zurücksetzen?`)) return;
    saveStore({});
    showToast('Tag zurückgesetzt');
  }

  function deleteHistoryEntry(id) {
    if (!confirm('Diesen Eintrag löschen?')) return;
    const newHist = history.filter(h => h.id !== id);
    setHistory(newHist);
    LS.set('kraft:history', newHist);
  }

  function switchView(v) {
    setView(v);
    if (v === 'history') { setCalMonth(new Date()); setSelDay(null); }
  }

  return (
    <>
      <Header
        week={week} day={day} view={view}
        onWeekChange={w => setWeek(w)}
        onViewToggle={() => switchView(view === 'train' ? 'history' : 'train')}
      />
      {view === 'train' && (
        <TrainView
          week={week} day={day} store={store} history={history}
          onDayChange={d => setDay(d)}
          onSetField={handleSetField}
          onSetDone={handleSetDone}
        />
      )}
      {view === 'history' && (
        <HistoryView
          calMonth={calMonth} selDay={selDay} history={history}
          onMonthChange={setCalMonth} onSelDay={setSelDay}
          onDelete={deleteHistoryEntry}
        />
      )}
      {view === 'train' && (
        <div className="bar">
          <div className="prog"><b>{doneSets}</b> / <span>{totalSets}</span> Sätze</div>
          <button className="save" onClick={openSheet}>Session speichern</button>
          <button className="reset" onClick={resetDay} title="Tag zurücksetzen">↺</button>
        </div>
      )}
      {showSheet && (
        <SaveSheet
          week={week} day={day} plan={plan}
          date={sheetDate} onDateChange={setSheetDate}
          onConfirm={confirmSave} onCancel={() => setShowSheet(false)}
        />
      )}
      {toast && <Toast msg={toast} />}
    </>
  );
}
