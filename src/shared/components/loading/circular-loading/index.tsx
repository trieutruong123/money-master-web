import { Box, CircularProgress, Typography } from '@mui/material';

export const CircularLoading = () => {
  return (
    <Box sx={{ m: 0, p: 1 }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={40}
        thickness={4}
        value={100}
      />
      <br />
      <Typography
        variant="h3"
        sx={{
          display: 'block',
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
      >
        Loading...
      </Typography>
    </Box>
  );
};
