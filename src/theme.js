import { createTheme } from '@mui/material/styles';

export function getTheme(mode) {
  const dark = mode === 'dark';
  return createTheme({
    palette: {
      mode,
      primary:   { main: dark ? '#818CF8' : '#4F46E5', contrastText: '#fff' },
      secondary: { main: dark ? '#34D399' : '#059669', contrastText: dark ? '#0A0F1E' : '#fff' },
      success:   { main: dark ? '#34D399' : '#059669', contrastText: dark ? '#0A0F1E' : '#fff' },
      error:     { main: dark ? '#F87171' : '#DC2626' },
      background: {
        default: dark ? '#0A0F1E' : '#F4F4F8',
        paper:   dark ? '#131929' : '#FFFFFF',
      },
      divider: dark ? 'rgba(255,255,255,0.07)' : 'rgba(15,16,23,0.09)',
      text: {
        primary:   dark ? '#F1F5F9' : '#0F1017',
        secondary: dark ? '#8B9AB4' : '#5B6478',
        disabled:  dark ? '#3F4F68' : '#9BA3B0',
      },
    },
    typography: {
      fontFamily: "'Inter', system-ui, sans-serif",
      h6:       { fontWeight: 800, letterSpacing: '-0.025em' },
      subtitle2:{ fontWeight: 700, letterSpacing: '-0.01em' },
      body2:    { fontSize: '0.8125rem' },
      caption:  { fontSize: '0.6875rem' },
      button:   { fontWeight: 700, textTransform: 'none' },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { paddingBottom: 64, WebkitFontSmoothing: 'antialiased' },
          'input[type=number]': { MozAppearance: 'textfield' },
          'input[type=number]::-webkit-inner-spin-button': { WebkitAppearance: 'none', margin: 0 },
          'input[type=number]::-webkit-outer-spin-button': { WebkitAppearance: 'none', margin: 0 },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(15,16,23,0.09)'}`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
      MuiCard: {
        defaultProps: { variant: 'outlined' },
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderColor: dark ? 'rgba(255,255,255,0.07)' : 'rgba(15,16,23,0.09)',
            backgroundColor: dark ? '#131929' : '#FFFFFF',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: dark ? 'rgba(255,255,255,0.10)' : 'rgba(15,16,23,0.13)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: dark ? 'rgba(255,255,255,0.20)' : 'rgba(15,16,23,0.25)',
            },
          },
          input: {
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.875rem',
            padding: '6px 8px',
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: { root: { marginRight: 2 } },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 10, letterSpacing: '-0.01em', padding: '7px 14px' },
          sizeSmall: { padding: '3px 10px', fontSize: '0.75rem' },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderColor: dark ? 'rgba(255,255,255,0.07)' : 'rgba(15,16,23,0.09)',
            color: dark ? '#8B9AB4' : '#5B6478',
            '&.Mui-selected': {
              backgroundColor: dark ? 'rgba(129,140,248,0.14)' : 'rgba(79,70,229,0.10)',
              color: dark ? '#818CF8' : '#4F46E5',
              borderColor: dark ? 'rgba(129,140,248,0.30)' : 'rgba(79,70,229,0.28)',
            },
            '&.Mui-selected:hover': {
              backgroundColor: dark ? 'rgba(129,140,248,0.20)' : 'rgba(79,70,229,0.16)',
            },
          },
        },
      },
      MuiAccordion: {
        defaultProps: { disableGutters: true, elevation: 0 },
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: dark ? '#131929' : '#FFFFFF',
            border: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(15,16,23,0.09)'}`,
            borderRadius: '10px !important',
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: { minHeight: 40, '&.Mui-expanded': { minHeight: 40 } },
        },
      },
      MuiLinearProgress: {
        styleOverrides: { root: { height: 2, borderRadius: 0 } },
      },
      MuiChip: {
        styleOverrides: { root: { fontWeight: 700, letterSpacing: '.03em' } },
      },
      MuiSwipeableDrawer: {
        defaultProps: { disableSwipeToOpen: false },
      },
    },
  });
}
