export const PLAN = {
  A: {
    label: 'Zug',
    sub: 'Rücken · h. Delt',
    accent: '#818CF8',
    ex: [
      { id: 'facepull', name: 'Face Pull (Band)',      region: 'h. Delt · Außenrotation · Haltung', sets: 3, reps: '15–20'    },
      { id: 'pullup',   name: 'Klimmzüge',             region: 'Lats · Breite',                     sets: 4, reps: '6–10'     },
      { id: 'row',      name: 'Einarmiges KH-Rudern',  region: 'Mittl. Rücken · Dicke',             sets: 3, reps: '8–12'     },
      { id: 'yt',       name: 'Y-T-Raise (Schräge)',   region: 'Mittl. + Unterer Trapez',           sets: 2, reps: '12–15'    },
      { id: 'rdelt',    name: 'Reverse Flys',           region: 'Hinterer Delt · Haltung',           sets: 3, reps: '12–15'    },
      { id: 'icurl',    name: 'Schrägbank-Curls',       region: 'Bizeps · Peak',                     sets: 3, reps: '10–12'    },
      { id: 'hcurl',    name: 'Hammer-Curls',           region: 'Brachialis · Unterarm',             sets: 2, reps: '10–12'    },
      { id: 'core',     name: 'Seitstütz + Pallof',     region: 'Core · Anti-Rotation',              sets: 2, reps: '30–45 s'  },
    ]
  },
  B: {
    label: 'Beine',
    sub: 'Beine · Gesäß',
    accent: '#34D399',
    ex: [
      { id: 'goblet',  name: 'Goblet Squat',           region: 'Quadrizeps · Gesäß',                sets: 3, reps: '10–15'    },
      { id: 'bsplit',  name: 'Bulgar. Kniebeugen',     region: 'Quads · Gesäß · unilateral',        sets: 3, reps: '8–12/Seite' },
      { id: 'hthrust', name: 'KH-Hüftstrecken',        region: 'Gesäß · Ischiokrurale',             sets: 3, reps: '10–15'    },
      { id: 'rdl',     name: 'KH-Rumän. Kreuzheben',  region: 'Hamstrings · Gesäß',                sets: 3, reps: '10–12'    },
      { id: 'calf',    name: 'Wadenheben (KH)',         region: 'Wadenmuskel',                       sets: 3, reps: '15–20'    },
      { id: 'deadbug', name: 'Dead Bug',                region: 'Tiefer Core · Lendenstabilität',    sets: 2, reps: '6–8/Seite' },
      { id: 'splb',    name: 'Seitstütz (lang)',        region: 'Laterale Wirbelsäulen-Stabilität',  sets: 2, reps: '30–45 s'  },
    ]
  },
  C: {
    label: 'Druck',
    sub: 'Brust · Schulter',
    accent: '#F59E0B',
    ex: [
      { id: 'incline',  name: 'Schrägbank-KH-Drücken', region: 'Obere Brust',                       sets: 3, reps: '8–12'     },
      { id: 'lat',      name: 'Seitheben',               region: 'Seitl. Delt · Schulterbreite',     sets: 4, reps: '12–15'    },
      { id: 'tri',      name: 'Überkopf-KH-Extension',  region: 'Trizeps · langer Kopf',            sets: 3, reps: '10–15'    },
      { id: 'kickback', name: 'Trizeps-Kickback',        region: 'Trizeps · lateraler Kopf',         sets: 2, reps: '12–15'    },
      { id: 'fp2',      name: 'Face Pull (Band)',         region: 'h. Delt · Balance zum Drücken',    sets: 2, reps: '15–20'    },
      { id: 'plank',    name: 'Plank',                   region: 'Core · anteriore Stabilität',      sets: 3, reps: '30–45 s'  },
    ]
  }
};

export const WEEKS = {
  1: { name: 'Basis',      rir: 'RIR 2–3', note: 'Arbeitsgewichte finden, sauber zum unteren Wdh-Ende.' },
  2: { name: 'Volumen',    rir: 'RIR 2',   note: 'Gleiche Gewichte, 1–2 Wdh mehr pro Satz als letzte Woche.' },
  3: { name: 'Intensität', rir: 'RIR 1',   note: 'Gewicht hoch, oberes Wdh-Ende anpeilen.' },
  4: { name: 'Deload',     rir: 'RIR 3–4', note: '~10–20 % leichter, ein Satz weniger. Erholung.' }
};

export const WD  = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
export const MON = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
