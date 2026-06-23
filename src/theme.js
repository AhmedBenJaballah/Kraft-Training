import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary:    { main: '#818CF8', contrastText: '#fff' },
    secondary:  { main: '#34D399', contrastText: '#0A0F1E' },
    success:    { main: '#34D399', contrastText: '#0A0F1E' },
    error:      { main: '#F87171' },
    background: { default: '#0A0F1E', paper: '#131929' },
    divider:    'rgba(255,255,255,0.07)',
    text: {
      primary:   '#F1F5F9',
      secondary: '#8B9AB4',
      disabled:  '#3F4F68',
    },
  },
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
    h6:       { fontWeight: 800, letterSpacing: '-0.025em' },
    subtitle1:{ fontWeight: 700 },
    subtitle2:{ fontWeight: 700, letterSpacing: '-0.01em' },
    body2:    { fontSize: '0.8125rem' },
    caption:  { fontSize: '0.6875rem' },
    button:   { fontWeight: 700, textTransform: 'none' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { paddingBottom: 72, WebkitFontSmoothing: 'antialiased' },
        'input[type=number]': { MozAppearance: 'textfield' },
        'input[type=number]::-webkit-inner-spin-button': { WebkitAppearance: 'none', margin: 0 },
        'input[type=number]::-webkit-outer-spin-button': { WebkitAppearance: 'none', margin: 0 },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundImage: 'none', borderBottom: '1px solid rgba(255,255,255,0.07)' },
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
          borderColor: 'rgba(255,255,255,0.07)',
          backgroundColor: '#131929',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.10)' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.18)' },
        },
        input: {
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.9rem',
          padding: '7px 10px',
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: { marginRight: 2 },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 10, letterSpacing: '-0.01em', padding: '8px 16px' },
        sizeSmall: { padding: '4px 12px', fontSize: '0.75rem' },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderColor: 'rgba(255,255,255,0.07)',
          color: '#8B9AB4',
          '&.Mui-selected': { backgroundColor: 'rgba(129,140,248,0.14)', color: '#818CF8', borderColor: 'rgba(129,140,248,0.30)' },
          '&.Mui-selected:hover': { backgroundColor: 'rgba(129,140,248,0.20)' },
        },
      },
    },
    MuiAccordion: {
      defaultProps: { disableGutters: true, elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#131929',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '10px !important',
          '&:before': { display: 'none' },
          '&.Mui-expanded': { margin: 0 },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: { minHeight: 44, '&.Mui-expanded': { minHeight: 44 }, px: 1.5 },
        content: { my: '0 !important' },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { height: 2, borderRadius: 0 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 700, letterSpacing: '.03em' },
      },
    },
  },
});
