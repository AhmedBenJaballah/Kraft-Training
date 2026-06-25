import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PLAN, WEEKS } from '../data/plan';
import { effSets, prevFor } from '../utils';

function SetRow({ idx, data, done, onFieldChange, onToggleDone, accent, isTime }) {
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: isTime ? '16px 1fr 32px' : '16px 1fr 1fr 32px',
      gap: '5px',
      alignItems: 'center',
      opacity: done ? 0.4 : 1,
      transition: 'opacity .2s',
    }}>
      <Typography
        variant="caption"
        align="center"
        sx={{ fontFamily: 'DM Mono', color: 'text.disabled', lineHeight: 1, fontSize: '0.65rem' }}
      >
        {idx + 1}
      </Typography>

      {!isTime && (
        <TextField
          size="small"
          type="number"
          inputMode="decimal"
          placeholder="0"
          value={data?.kg ?? ''}
          onChange={e => onFieldChange('kg', e.target.value)}
        />
      )}

      <TextField
        size="small"
        type="number"
        inputMode="numeric"
        placeholder="0"
        value={data?.reps ?? ''}
        onChange={e => onFieldChange('reps', e.target.value)}
      />

      <Box
        component="button"
        onClick={onToggleDone}
        aria-label="Satz erledigt"
        sx={{
          width: 32, height: 32,
          border: '1.5px solid',
          borderColor: done ? accent : 'divider',
          bgcolor: done ? accent : 'transparent',
          borderRadius: '7px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', p: 0, flexShrink: 0,
          transition: 'border-color .15s, background-color .15s, transform .12s',
          '&:active': { transform: 'scale(.86)' },
        }}
      >
        {done && (
          <CheckIcon sx={{ fontSize: 14, color: ['#34D399', '#F59E0B'].includes(accent) ? '#0A0F1E' : '#fff' }} />
        )}
      </Box>
    </Box>
  );
}

function ExerciseCard({ ex, week, log, prev, accent, rir, onSetField, onSetDone }) {
  const n = effSets(ex.sets, week);
  const isTime = ex.reps.includes(' s');

  return (
    <Card sx={{ mb: 0.625, position: 'relative', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '2px', bgcolor: accent } }}>
      <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', lineHeight: 1.2, letterSpacing: '-0.01em', color: 'text.primary' }}>
              {ex.name}
            </Typography>
            <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.25 }}>
              {ex.region}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
            <Typography sx={{ fontFamily: 'DM Mono', fontSize: '0.75rem', color: accent, lineHeight: 1.5 }}>
              {n}×{ex.reps}
            </Typography>
            <Typography sx={{ fontFamily: 'DM Mono', fontSize: '0.65rem', color: 'text.disabled', display: 'block' }}>
              {rir}
            </Typography>
            {prev && (
              <Typography sx={{ fontFamily: 'DM Mono', fontSize: '0.6rem', color: 'text.disabled', display: 'block', mt: 0.25 }}>
                ↑ {prev}
              </Typography>
            )}
          </Box>
        </Stack>

        {/* Progress dots */}
        <Stack direction="row" spacing={0.375} sx={{ mt: 0.75 }}>
          {Array.from({ length: n }, (_, i) => (
            <Box
              key={i}
              sx={{
                flex: 1, height: '2px', borderRadius: 999,
                bgcolor: log[i]?.done ? accent : 'divider',
              }}
            />
          ))}
        </Stack>

        {/* Sets */}
        <Box sx={{ display: 'grid', gridTemplateColumns: isTime ? '16px 1fr 32px' : '16px 1fr 1fr 32px', gap: '5px', mt: 0.875, mb: 0.375 }}>
          <div />
          {!isTime && <Typography sx={{ fontFamily: 'DM Mono', fontSize: '0.6rem', color: 'text.disabled', textAlign: 'center', userSelect: 'none' }}>kg</Typography>}
          <Typography sx={{ fontFamily: 'DM Mono', fontSize: '0.6rem', color: 'text.disabled', textAlign: 'center', userSelect: 'none' }}>{isTime ? 'Sek.' : 'Wdh'}</Typography>
          <div />
        </Box>
        <Stack spacing={0.5}>
          {Array.from({ length: n }, (_, s) => (
            <SetRow
              key={s} idx={s}
              data={log[s]}
              done={!!log[s]?.done}
              accent={accent}
              isTime={isTime}
              onFieldChange={(field, value) => onSetField(ex.id, s, field, value)}
              onToggleDone={() => onSetDone(ex.id, s)}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function TrainView({ week, day, store, history, onDayChange, onSetField, onSetDone }) {
  const plan = PLAN[day];

  return (
    <>
      {/* Day toggle */}
      <Box sx={{ px: 1.25, pt: 1, pb: 0.5 }}>
        <ToggleButtonGroup
          value={day}
          exclusive
          onChange={(_, v) => v && onDayChange(v)}
          fullWidth
          size="small"
          sx={{ height: 40 }}
        >
          {Object.keys(PLAN).map(k => (
            <ToggleButton
              key={k} value={k}
              sx={{
                flex: 1,
                flexDirection: 'column',
                gap: 0, lineHeight: 1.2, py: 0.5,
                '&.Mui-selected': {
                  bgcolor: `${PLAN[k].accent}1A`,
                  color: PLAN[k].accent,
                  borderColor: `${PLAN[k].accent}40`,
                },
              }}
            >
              <Typography sx={{ fontWeight: 800, fontSize: '0.8125rem', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                {k} · {PLAN[k].label}
              </Typography>
              <Typography sx={{ fontSize: '0.6rem', opacity: .65, letterSpacing: '.02em' }}>
                {PLAN[k].sub}
              </Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* Exercise cards */}
      <Box sx={{ px: 1.25, pb: 0.75 }}>
        {plan.ex.map(ex => (
          <ExerciseCard
            key={ex.id} ex={ex} week={week}
            log={store[ex.id] || []}
            prev={prevFor(ex.id, day, history)}
            accent={plan.accent}
            rir={WEEKS[week].rir}
            onSetField={onSetField}
            onSetDone={onSetDone}
          />
        ))}
      </Box>

      {/* Tip */}
      <Typography variant="caption" color="text.disabled" sx={{ display: 'block', px: 1.25, pb: 1, lineHeight: 1.6 }}>
        Schaffst du bei allen Sätzen das obere Wdh-Ende sauber → nächstes Mal Gewicht hoch.
      </Typography>

      {/* FAQ */}
      <Box sx={{ px: 1.25, pb: 1.5 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: 16, color: 'text.disabled' }} />}
            sx={{ px: 1.25, minHeight: '38px !important', '& .MuiAccordionSummary-content': { my: '7px !important' } }}
          >
            <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', color: 'text.disabled' }}>
              Warum dieser Plan?
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 1.25, pt: 0, pb: 1.25 }}>
            <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.7, display: 'block' }}>
              <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>3-Tages-Split:</Box> A = Zug & Haltung, B = Beine & Bizeps, C = Druck.{' '}
              <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>Haltung:</Box> Face Pull auf Tag A + C als Korrektiv gegen Hyperkyphose & Skoliose.{' '}
              <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>4-Wochen-Logik:</Box> W1 einpegeln → W2 Wdh+ → W3 Gewicht+ → W4 Deload.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}
