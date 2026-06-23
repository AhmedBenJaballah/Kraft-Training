import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '@mui/material/styles';
import { PLAN, WEEKS } from '../data/plan';

export default function Header({ week, day, view, onWeekChange, onViewToggle, mode, onToggleMode }) {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const isTrain = view === 'train';

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: dark ? 'rgba(10,15,30,0.88)' : 'rgba(244,244,248,0.90)',
        backdropFilter: 'blur(20px)',
        backgroundImage: 'none',
      }}
    >
      <Toolbar variant="dense" sx={{ minHeight: 46, gap: 0.75, px: 1.25 }}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{
            fontFamily: "'DM Mono', monospace",
            fontWeight: 500,
            fontSize: '1rem',
            letterSpacing: '.24em',
            color: 'text.primary',
            lineHeight: 1,
          }}>
            KRAFT
          </Typography>
          <Typography variant="caption" color="text.disabled" sx={{
            letterSpacing: '.10em',
            textTransform: 'uppercase',
            lineHeight: 1,
            display: 'block',
            mt: 0.25,
          }}>
            {isTrain ? `W${week} · ${PLAN[day].label}` : 'Verlauf'}
          </Typography>
        </Box>

        <Button
          variant="outlined"
          size="small"
          onClick={onViewToggle}
          sx={{
            borderColor: 'divider',
            color: 'text.secondary',
            fontSize: '0.75rem',
            py: 0.5, px: 1.5,
            minWidth: 0,
            borderRadius: 999,
          }}
        >
          {isTrain ? 'Verlauf' : 'Training'}
        </Button>

        <IconButton
          size="small"
          onClick={onToggleMode}
          title={dark ? 'Light Mode' : 'Dark Mode'}
          sx={{
            width: 32, height: 32,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '8px',
            color: 'text.secondary',
            flexShrink: 0,
          }}
        >
          {dark
            ? <LightModeIcon sx={{ fontSize: 16 }} />
            : <DarkModeIcon sx={{ fontSize: 16 }} />
          }
        </IconButton>
      </Toolbar>

      {isTrain && (
        <Box sx={{ px: 1.25, pb: 0.875 }}>
          <ToggleButtonGroup
            value={week}
            exclusive
            onChange={(_, v) => v && onWeekChange(v)}
            fullWidth
            size="small"
            sx={{ height: 30 }}
          >
            {[1, 2, 3, 4].map(w => (
              <ToggleButton
                key={w} value={w}
                sx={{ flexDirection: 'column', gap: 0, py: 0, lineHeight: 1.1, flex: 1 }}
              >
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.9rem', fontWeight: 500 }}>{w}</span>
                <span style={{ fontSize: '0.52rem', letterSpacing: '.05em', opacity: .7 }}>
                  {WEEKS[w].name.toUpperCase()}
                </span>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.75, lineHeight: 1.4 }}>
            <Box component="span" sx={{ color: 'text.secondary', fontWeight: 600 }}>{WEEKS[week].rir}</Box>
            {' · '}{WEEKS[week].note}
          </Typography>
        </Box>
      )}
    </AppBar>
  );
}
