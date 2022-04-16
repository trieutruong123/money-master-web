import { Box, CircularProgress, Typography } from '@mui/material';

export const CicularLoading = () => {
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
      <Typography
        variant="body1"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
      >
        Loading...
      </Typography>
    </Box>
  );
};
