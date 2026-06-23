import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

  const NavBtn = ({ children, onClick }) => (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        width: 28, height: 28,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid', borderColor: 'divider',
        borderRadius: '7px', bgcolor: 'transparent',
        color: 'text.secondary', fontSize: '1rem',
        cursor: 'pointer', lineHeight: 1,
        transition: 'transform .1s',
        '&:active': { transform: 'scale(.88)' },
      }}
    >
      {children}
    </Box>
  );

  return (
    <Box sx={{ mx: 1.25, mt: 1.25, mb: 0.75, border: '1px solid', borderColor: 'divider', borderRadius: 2.5, bgcolor: 'background.paper', overflow: 'hidden' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1.25, pt: 1, pb: 0.875 }}>
        <NavBtn onClick={() => onMonthChange(new Date(y, m - 1, 1))}>‹</NavBtn>
        <Typography sx={{ fontFamily: 'DM Mono', fontSize: '0.8125rem', fontWeight: 500, letterSpacing: '.08em', color: 'text.primary' }}>
          {MON[m].slice(0, 3).toUpperCase()} {y}
        </Typography>
        <NavBtn onClick={() => onMonthChange(new Date(y, m + 1, 1))}>›</NavBtn>
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', px: 0.375, pb: 0.625 }}>
        {WD.map(w => (
          <Typography key={w} variant="caption" align="center" sx={{ display: 'block', py: 0.5, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'text.disabled' }}>
            {w}
          </Typography>
        ))}
        {Array.from({ length: offset }, (_, i) => <Box key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const d = i + 1;
          const k = `${y}-${pad(m + 1)}-${pad(d)}`;
          const types = [...new Set(byDay[k] || [])];
          const isToday = k === todayK;
          const isSel = k === selDay;
          return (
            <Box
              key={k}
              onClick={() => onSelDay(selDay === k ? null : k)}
              sx={{
                aspectRatio: 1,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                borderRadius: 1.5, cursor: 'pointer',
                bgcolor: isSel ? 'text.primary' : 'transparent',
                outline: isToday ? '1.5px solid' : 'none',
                outlineColor: 'primary.main',
                outlineOffset: -1.5,
                transition: 'background-color .12s',
                '&:active': { opacity: .7 },
              }}
            >
              <Typography sx={{ fontFamily: 'DM Mono', fontSize: '0.75rem', lineHeight: 1, fontWeight: isToday ? 700 : 400, color: isSel ? 'background.default' : isToday ? 'primary.main' : 'text.primary' }}>
                {d}
              </Typography>
              <Stack direction="row" spacing={0.25} sx={{ mt: 0.25, height: 4 }}>
                {types.slice(0, 2).map((x, i) => (
                  <Box key={i} sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: x === 'A' ? (isSel ? 'rgba(129,140,248,.5)' : '#818CF8') : (isSel ? 'rgba(52,211,153,.5)' : '#34D399') }} />
                ))}
              </Stack>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

function HistoryCard({ entry, onDelete }) {
  const d = new Date(entry.ts);
  const dateStr = d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'short' });
  const timeStr = d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  const hasValues = entry.ex.some(e => e.sets.some(s => s.kg || s.reps));

  return (
    <Accordion sx={{ mx: 1.25, mb: 0.5 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ fontSize: 16, color: 'text.disabled' }} />}
        sx={{ px: 1.25, minHeight: '40px !important', '& .MuiAccordionSummary-content': { my: '7px !important', mr: 0.5 } }}
      >
        <Stack direction="row" alignItems="center" spacing={1} sx={{ width: '100%' }}>
          <Chip
            label={`${entry.day} · ${entry.label}`}
            size="small"
            sx={{
              height: 20, fontSize: '0.6rem', fontWeight: 700,
              bgcolor: entry.day === 'A' ? 'rgba(129,140,248,.12)' : 'rgba(52,211,153,.12)',
              color: entry.day === 'A' ? '#818CF8' : '#34D399',
              border: '1px solid',
              borderColor: entry.day === 'A' ? 'rgba(129,140,248,.25)' : 'rgba(52,211,153,.25)',
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary', display: 'block', lineHeight: 1.2 }}>{dateStr}</Typography>
            <Typography variant="caption" color="text.disabled" sx={{ display: 'block', fontSize: '0.625rem' }}>W{entry.week} · {timeStr}</Typography>
          </Box>
          <Typography sx={{ fontFamily: 'DM Mono', fontSize: '0.75rem', color: 'text.secondary', flexShrink: 0 }}>
            {entry.done}/{entry.total}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 1.25, pt: 0, pb: 1 }}>
        {hasValues
          ? entry.ex.map(e => {
              const parts = e.sets.filter(s => s.kg || s.reps).map(s => `${s.kg || '–'}×${s.reps || '–'}`);
              if (!parts.length) return null;
              return (
                <Box key={e.id} sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 0.75, pb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary', display: 'block' }}>{e.name}</Typography>
                  <Typography sx={{ fontFamily: 'DM Mono', fontSize: '0.6875rem', color: 'text.secondary', display: 'block', mt: 0.25, lineHeight: 1.55 }}>{parts.join('  ·  ')}</Typography>
                </Box>
              );
            })
          : <Typography variant="caption" color="text.disabled">Keine Werte eingetragen.</Typography>
        }
        <Button
          size="small"
          color="error"
          variant="text"
          onClick={ev => { ev.stopPropagation(); onDelete(entry.id); }}
          sx={{ mt: 1, fontSize: '0.6875rem', textTransform: 'none', px: 1, py: 0.25, borderRadius: 999, minWidth: 0 }}
        >
          Eintrag löschen
        </Button>
      </AccordionDetails>
    </Accordion>
  );
}

export default function HistoryView({ calMonth, selDay, history, onMonthChange, onSelDay, onDelete }) {
  let filtered = [...history].sort((a, b) => b.ts - a.ts);
  if (selDay) filtered = filtered.filter(h => dayKey(h.ts) === selDay);

  return (
    <>
      <CalendarView calMonth={calMonth} selDay={selDay} history={history} onMonthChange={onMonthChange} onSelDay={onSelDay} />

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1.25, py: 0.375, minHeight: 26 }}>
        {selDay && (
          <>
            <Typography variant="caption" color="text.secondary">
              {new Date(selDay + 'T12:00:00').toLocaleDateString('de-DE', { day: '2-digit', month: 'long' })}
            </Typography>
            <Button size="small" variant="text" onClick={() => onSelDay(null)} sx={{ fontSize: '0.6875rem', textTransform: 'none', color: 'text.secondary', py: 0, minWidth: 0 }}>
              Alle
            </Button>
          </>
        )}
      </Stack>

      {filtered.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6, px: 3 }}>
          <Typography variant="body2" color="text.disabled" sx={{ lineHeight: 1.7 }}>
            {selDay
              ? 'Keine Session an diesem Tag.'
              : <>'Noch keine Sessions gespeichert.<br />Trag dein Training ein und tippe auf{' '}<Box component="span" sx={{ color: 'text.secondary', fontWeight: 600 }}>„Speichern"</Box>.</>
            }
          </Typography>
        </Box>
      ) : (
        filtered.map(h => <HistoryCard key={h.id} entry={h} onDelete={onDelete} />)
      )}
    </>
  );
}
