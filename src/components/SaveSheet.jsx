import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function SaveSheet({ open, week, day, plan, date, onDateChange, onConfirm, onCancel }) {
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onOpen={() => {}}
      onClose={onCancel}
      disableSwipeToOpen
      PaperProps={{
        sx: {
          borderRadius: '16px 16px 0 0',
          bgcolor: 'background.paper',
          backgroundImage: 'none',
          px: 2,
          pt: 1,
          pb: 'calc(20px + env(safe-area-inset-bottom))',
        },
      }}
    >
      {/* Handle */}
      <Box sx={{ width: 32, height: 3, bgcolor: 'divider', borderRadius: 999, mx: 'auto', mb: 2.5 }} />

      <Typography variant="h6" sx={{ fontSize: '1.0625rem', mb: 0.5 }}>
        Session speichern
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
        Woche {week} · Tag {day} · {plan.label}
      </Typography>

      <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mb: 0.75, textTransform: 'uppercase', letterSpacing: '.09em', fontWeight: 700 }}>
        Datum
      </Typography>
      <TextField
        type="date"
        fullWidth
        size="small"
        value={date}
        onChange={e => onDateChange(e.target.value)}
        inputProps={{ style: { fontFamily: "'DM Mono', monospace" } }}
      />

      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={onCancel}
          sx={{ borderColor: 'divider', color: 'text.secondary' }}
        >
          Abbrechen
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={onConfirm}
        >
          Im Verlauf speichern
        </Button>
      </Stack>
    </SwipeableDrawer>
  );
}
