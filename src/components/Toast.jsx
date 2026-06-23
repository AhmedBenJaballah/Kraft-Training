import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Toast({ msg }) {
  return (
    <Snackbar
      open={!!msg}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ bottom: { xs: 76 } }}
    >
      <Box sx={{
        bgcolor: 'text.primary',
        color: 'background.default',
        px: 2.5, py: 0.875,
        borderRadius: 999,
        boxShadow: '0 4px 20px rgba(0,0,0,.40)',
      }}>
        <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap', fontSize: '0.8125rem' }}>
          {msg}
        </Typography>
      </Box>
    </Snackbar>
  );
}
