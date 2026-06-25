export const LS = {
  get(k, def) {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; }
    catch { return def; }
  },
  set(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
  }
};

export function pad(n) { return String(n).padStart(2, '0'); }

export function dayKey(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function effSets(base, week) {
  return week === 4 ? Math.max(2, base - 1) : base;
}

export function prevFor(exId, day, history) {
  const m = history
    .filter(h => h.day === day && h.ex.some(e => e.id === exId))
    .sort((a, b) => b.ts - a.ts)[0];
  if (!m) return null;
  const e = m.ex.find(x => x.id === exId);
  const parts = e.sets.filter(s => s.kg || s.reps).map(s =>
    s.kg ? `${s.kg} kg × ${s.reps || '–'}` : `${s.reps} s`
  );
  return parts.length ? parts.join(' · ') : null;
}
