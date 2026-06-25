const HANG_PRE  = [{ id: 'hang_pre',  name: 'Passives Hängen (vorher)',  region: 'Wirbelsäule · Schulteraktivierung',           sets: 2, reps: '20–30 s' }];
const HANG_POST = [{ id: 'hang_post', name: 'Passives Hängen (nachher)', region: 'Wirbelsäule · Dekompression · Schulter zurück', sets: 3, reps: '30–60 s' }];

export const PLAN = {
  A: {
    label: 'Zug',
    sub: 'Rücken · Bizeps · h. Delt',
    accent: '#818CF8',
    ex: [
      ...HANG_PRE,
      { id: 'yrise',   name: 'Prone Y-Raise (Schrägbank)',  region: 'h. Delt · Mittl. Trapez · Außenrotation', sets: 3, reps: '12–15'   },
      { id: 'pullup',  name: 'Klimmzüge (Power Tower)',      region: 'Lats · Breite',                           sets: 3, reps: '5–8'     },
      { id: 'row',     name: 'Einarmiges KH-Rudern',         region: 'Mittl. Rücken · Dicke',                   sets: 3, reps: '8–12'    },
      { id: 'rdelt',   name: 'Reverse Flys',                 region: 'Hinterer Delt · Haltung',                 sets: 3, reps: '12–15'   },
      { id: 'icurl',   name: 'Schrägbank-Curls',             region: 'Bizeps · langer Kopf · Peak',             sets: 3, reps: '10–12'   },
      { id: 'hcurl_a', name: 'Hammer-Curls',                 region: 'Brachialis · Unterarm',                   sets: 2, reps: '10–12'   },
      { id: 'core_a',  name: 'Seitstütz + Hollow Body Hold', region: 'Core · Lateral + Anti-Extension',         sets: 2, reps: '35–50 s' },
      ...HANG_POST,
    ]
  },

  B: {
    label: 'Beine',
    sub: 'Beine · Gesäß · Core',
    accent: '#34D399',
    ex: [
      ...HANG_PRE,
      { id: 'goblet',  name: 'Goblet Squat (KH)',            region: 'Quadrizeps · Gesäß',                      sets: 3, reps: '10–15'    },
      { id: 'rdl',     name: 'KH-Rumän. Kreuzheben',         region: 'Hamstrings · Gesäß',                      sets: 3, reps: '8–12'     },
      { id: 'split',   name: 'Bulg. Ausfallschritt (Bank)',   region: 'Quad · Gesäß · Asymmetrie Skoliose',      sets: 2, reps: '8–10/Seite'},
      { id: 'hcurl_b', name: 'Hammer-Curls',                 region: 'Brachialis · 2× Frequenz',                sets: 2, reps: '10–12'    },
      { id: 'tri_b',   name: 'Liegende KH-Extension',        region: 'Trizeps · lateraler + medialer Kopf',     sets: 2, reps: '12–15'    },
      { id: 'deadbug', name: 'Dead Bug',                     region: 'Tiefer Core · Lendenstabilität',          sets: 2, reps: '6–8/Seite' },
      { id: 'splb',    name: 'Seitstütz (lang)',             region: 'Laterale Wirbelsäulenstabilität',          sets: 2, reps: '35–50 s'  },
      ...HANG_POST,
    ]
  },

  C: {
    label: 'Druck',
    sub: 'Brust · Schulter · Trizeps',
    accent: '#F59E0B',
    ex: [
      ...HANG_PRE,
      { id: 'incline', name: 'Schrägbank-KH-Drücken',        region: 'Obere Brust',                             sets: 3, reps: '8–12'    },
      { id: 'flat',    name: 'Flachbank-KH-Drücken',          region: 'Mittlere Brust',                          sets: 2, reps: '8–12'    },
      { id: 'dips',    name: 'Dips vorgebeugt (Power Tower)', region: 'Untere Brust + Trizeps',                  sets: 3, reps: '8–12'    },
      { id: 'fly',     name: 'KH-Flys (Flachbank)',           region: 'Brust · Dehnung · Weite',                 sets: 2, reps: '12–15'   },
      { id: 'ohp',     name: 'KH-Schulterdrücken (sitzend)', region: 'Vorderer Delt',                           sets: 2, reps: '8–12'    },
      { id: 'lat',     name: 'Seitheben',                     region: 'Seitl. Delt · Schulterbreite',            sets: 3, reps: '12–15'   },
      { id: 'tri',     name: 'Überkopf-KH-Extension',        region: 'Trizeps · langer Kopf · Armdicke',        sets: 2, reps: '10–15'   },
      { id: 'yrise_c', name: 'Prone Y-Raise (Schrägbank)',   region: 'h. Delt · Balance nach Drücken',          sets: 2, reps: '12–15'   },
      ...HANG_POST,
    ]
  }
};

export const WEEKS = {
  1: { name: 'Basis',      rir: 'RIR 2–3', note: 'Arbeitsgewichte finden, sauber zum unteren Wdh-Ende. Hängen: 3 × 15–20 s.' },
  2: { name: 'Volumen',    rir: 'RIR 2',   note: 'Gleiche Gewichte, 1–2 Wdh mehr. Hängen: 3 × 25–35 s.'                      },
  3: { name: 'Intensität', rir: 'RIR 1',   note: 'Gewicht hoch, nah ans Limit. Hängen: 3 × 35–50 s.'                         },
  4: { name: 'Deload',     rir: 'RIR 3–4', note: '~15 % leichter, ein Satz weniger. Hängen: 3 × 45–60 s.'                    }
};

export const WD  = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
export const MON = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
