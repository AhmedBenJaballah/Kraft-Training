import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { PLAN } from './data/plan';
import { LS, pad, effSets } from './utils';
import Header from './components/Header';
import TrainView from './components/TrainView';
import HistoryView from './components/HistoryView';
import SaveSheet from './components/SaveSheet';
import Toast from './components/Toast';

export default function App() {
  const [week, setWeek]     = useState(() => LS.get('kraft:lastWeek', 1));
  const [day, setDay]       = useState(() => LS.get('kraft:lastDay', 'A'));
  const [view, setView]     = useState('train');
  const [store, setStore]   = useState(() => LS.get(`kraft:log:w${LS.get('kraft:lastWeek', 1)}${LS.get('kraft:lastDay', 'A')}`, {}));
  const [history, setHistory] = useState(() => LS.get('kraft:history', []));
  const [calMonth, setCalMonth] = useState(() => new Date());
  const [selDay, setSelDay] = useState(null);
  const [showSheet, setShowSheet] = useState(false);
  const [sheetDate, setSheetDate] = useState('');
  const [toast, setToast]   = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => { LS.set('kraft:lastWeek', week); }, [week]);
  useEffect(() => { LS.set('kraft:lastDay', day); }, [day]);
  useEffect(() => { setStore(LS.get(`kraft:log:w${week}${day}`, {})); }, [week, day]);

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

  function switchView(v) {
    setView(v);
    if (v === 'history') { setCalMonth(new Date()); setSelDay(null); }
  }

  const pct = totalSets > 0 ? Math.round(doneSets / totalSets * 100) : 0;

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
          onDelete={id => {
            if (!confirm('Diesen Eintrag löschen?')) return;
            const newHist = history.filter(h => h.id !== id);
            setHistory(newHist);
            LS.set('kraft:history', newHist);
          }}
        />
      )}

      {/* Bottom action bar */}
      {view === 'train' && (
        <Paper
          elevation={0}
          sx={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 20,
            bgcolor: 'rgba(10,15,30,0.92)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            backgroundImage: 'none',
            pb: 'env(safe-area-inset-bottom)',
          }}
        >
          <LinearProgress
            variant="determinate"
            value={pct}
            sx={{
              height: 2, borderRadius: 0,
              bgcolor: 'rgba(255,255,255,0.07)',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(90deg, #818CF8, #34D399)',
                borderRadius: 0,
              },
            }}
          />
          <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 1.5, py: 0.875 }}>
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" alignItems="baseline" spacing={0.5}>
                <Typography sx={{ fontFamily: 'DM Mono', fontSize: '1.375rem', fontWeight: 500, lineHeight: 1, color: 'text.primary' }}>
                  {doneSets}
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  / {totalSets} Sätze
                </Typography>
              </Stack>
            </Box>
            <Button
              variant="contained"
              onClick={openSheet}
              sx={{ borderRadius: 2.5, px: 2, fontSize: '0.875rem' }}
            >
              Speichern
            </Button>
            <IconButton
              size="small"
              onClick={resetDay}
              title="Tag zurücksetzen"
              sx={{ border: '1px solid rgba(255,255,255,0.10)', borderRadius: 2, width: 36, height: 36, color: 'text.secondary' }}
            >
              <RestartAltIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Stack>
        </Paper>
      )}

      <SaveSheet
        open={showSheet}
        week={week} day={day} plan={plan}
        date={sheetDate} onDateChange={setSheetDate}
        onConfirm={confirmSave} onCancel={() => setShowSheet(false)}
      />

      <Toast msg={toast} />
    </>
  );
}
