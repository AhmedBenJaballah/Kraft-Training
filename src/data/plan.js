export const PLAN = {
  A: {
    label: 'Zug',
    sub: 'Rücken · Bizeps · h. Delt',
    accent: 'var(--olive)',
    ex: [
      { id: 'pullup', name: 'Klimmzüge', region: 'Lats · Breite', sets: 4, reps: '6–10' },
      { id: 'row', name: 'Einarmiges KH-Rudern', region: 'Mittlerer Rücken · Dicke', sets: 3, reps: '8–12' },
      { id: 'rdl', name: 'KH-Rumän. Kreuzheben', region: 'Unterer Rücken', sets: 3, reps: '8–12' },
      { id: 'shrug', name: 'KH-Shrugs', region: 'Trapez oben', sets: 2, reps: '12–15' },
      { id: 'rdelt', name: 'Reverse Flys', region: 'Hinterer Delt · Haltung', sets: 3, reps: '12–15' },
      { id: 'icurl', name: 'Schrägbank-Curls', region: 'Bizeps · Peak', sets: 3, reps: '10–12' },
      { id: 'hcurl', name: 'Hammer-Curls', region: 'Brachialis · Unterarm', sets: 2, reps: '10–12' },
      { id: 'core', name: 'Seitstütz + Pallof', region: 'Core · Anti-Rotation', sets: 2, reps: '30–45 s' },
    ]
  },
  B: {
    label: 'Druck',
    sub: 'Brust · Trizeps · Schulter',
    accent: 'var(--terra)',
    ex: [
      { id: 'incline', name: 'Schrägbank-KH-Drücken', region: 'Obere Brust', sets: 3, reps: '8–12' },
      { id: 'flat', name: 'Flachbank-KH-Drücken', region: 'Mittlere Brust', sets: 3, reps: '8–12' },
      { id: 'dips', name: 'Dips vorgebeugt', region: 'Untere Brust', sets: 3, reps: '8–12' },
      { id: 'fly', name: 'KH-Flys', region: 'Brust · Dehnung', sets: 2, reps: '12–15' },
      { id: 'lat', name: 'Seitheben', region: 'Seitl. Delt · Breite', sets: 3, reps: '12–15' },
      { id: 'ohp', name: 'KH-Schulterdrücken', region: 'Vorderer Delt', sets: 3, reps: '8–12' },
      { id: 'tri', name: 'Überkopf-KH-Extension', region: 'Trizeps · langer Kopf', sets: 3, reps: '10–15' },
      { id: 'legraise', name: 'Hängendes Beinheben', region: 'Unterer Bauch', sets: 3, reps: '10–15' },
    ]
  }
};

export const WEEKS = {
  1: { name: 'Basis', rir: 'RIR 2–3', note: 'Arbeitsgewichte finden, sauber zum unteren Wdh-Ende.' },
  2: { name: 'Volumen', rir: 'RIR 2', note: 'Gleiche Gewichte, 1–2 Wdh mehr pro Satz als letzte Woche.' },
  3: { name: 'Intensität', rir: 'RIR 1', note: 'Gewicht hoch, oberes Wdh-Ende anpeilen.' },
  4: { name: 'Deload', rir: 'RIR 3–4', note: '~10–20 % leichter, ein Satz weniger. Erholung.' }
};

export const WD = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
export const MON = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
