export const PLAN = {
  A: {
    label: 'Zug',
    sub: 'Rücken · Bizeps · h. Delt',
    accent: '#818CF8',
    ex: [
      // Face Pull zuerst → Schulter aufwärmen + Haltungsmuster setzen
      { id: 'facepull', name: 'Face Pull (Band)',      region: 'h. Delt · Außenrotation · Haltung', sets: 3, reps: '15–20'   },
      { id: 'pullup',   name: 'Klimmzüge',             region: 'Lats · Breite',                     sets: 3, reps: '6–10'    }, // ✅ 4→3 Sätze
      { id: 'row',      name: 'Einarmiges KH-Rudern',  region: 'Mittl. Rücken · Dicke',             sets: 3, reps: '8–12'    },
      { id: 'rdelt',    name: 'Reverse Flys',           region: 'Hinterer Delt · Haltung',           sets: 3, reps: '12–15'   },
      // ❌ Y-T-Raise raus → Überschneidung mit Face Pull
      { id: 'icurl',    name: 'Schrägbank-Curls',       region: 'Bizeps · Peak',                     sets: 3, reps: '10–12'   },
      { id: 'hcurl_a',  name: 'Hammer-Curls',           region: 'Brachialis · Unterarm',             sets: 2, reps: '10–12'   },
      { id: 'core_a',   name: 'Seitstütz + Pallof',     region: 'Core · Anti-Rotation',              sets: 2, reps: '30–45 s' },
    ]
  },
  B: {
    label: 'Beine',
    sub: 'Beine · Gesäß · Core',
    accent: '#34D399',
    ex: [
      { id: 'goblet',   name: 'Goblet Squat',          region: 'Quadrizeps · Gesäß',                sets: 3, reps: '10–15'    },
      // ❌ KH-Hüftstrecken raus → RDL trifft dieselbe Gruppe, mit mehr Dehnung
      { id: 'rdl',      name: 'KH-Rumän. Kreuzheben',  region: 'Hamstrings · Gesäß',                sets: 3, reps: '10–12'    },
      { id: 'hcurl_b',  name: 'Hammer-Curls',           region: 'Brachialis · Bizeps · 2× Freq.',   sets: 2, reps: '10–12'    }, // ✅ ID-Fix
      { id: 'deadbug',  name: 'Dead Bug',               region: 'Tiefer Core · Lendenstabilität',   sets: 2, reps: '6–8/Seite'},
      { id: 'splb',     name: 'Seitstütz (lang)',       region: 'Laterale Wirbelsäulenstabilität',   sets: 2, reps: '30–45 s'  },
    ]
  },
  C: {
    label: 'Druck',
    sub: 'Brust · Schulter · Trizeps',
    accent: '#F59E0B',
    ex: [
      { id: 'incline',    name: 'Schrägbank-KH-Drücken', region: 'Obere Brust',                     sets: 3, reps: '8–12'    },
      { id: 'flat',       name: 'Flachbank-KH-Drücken',  region: 'Mittlere Brust',                  sets: 3, reps: '8–12'    },
      { id: 'dips',       name: 'Dips vorgebeugt',        region: 'Untere Brust + Trizeps',          sets: 3, reps: '8–12'    },
      { id: 'fly',        name: 'KH-Flys',                region: 'Brust · Dehnung',                 sets: 2, reps: '12–15'   },
      { id: 'ohp',        name: 'KH-Schulterdrücken',    region: 'Vorderer Delt',                   sets: 3, reps: '8–12'    },
      { id: 'lat',        name: 'Seitheben',              region: 'Seitl. Delt · Schulterbreite',    sets: 3, reps: '12–15'   }, // ✅ 4→3 Sätze
      { id: 'tri',        name: 'Überkopf-KH-Extension', region: 'Trizeps · langer Kopf',           sets: 3, reps: '10–15'   },
      // ❌ Kickback raus → Trizeps durch Dips + Extension abgedeckt
      // ❌ Plank raus → Core durch Tag A + B abgedeckt
      { id: 'facepull_c', name: 'Face Pull (Band)',       region: 'h. Delt · Balance nach Drücken',  sets: 2, reps: '15–20'   },
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