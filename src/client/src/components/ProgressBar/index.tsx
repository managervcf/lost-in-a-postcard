import React from 'react';
import { CircularProgress, CircularProgressProps, Fade, Typography } from '@mui/material';
import { Box } from '@mui/system';

interface ProgressBarProps {
  value: number;
  max?: number;
  loading: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value = 0,
  max = 100,
  loading = false,
}) => (
  <CircularProgressWithLabel
    loading={loading}
    value={!!max ? (value / max) * 100 || 0 : !!value ? 100 : 100}
  />
);

function CircularProgressWithLabel({
  value,
  loading,
}: CircularProgressProps & { value: number; loading: boolean }) {
  return (
    <Fade in={loading}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          color="secondary"
          variant="determinate"
          size={55}
          value={value}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress color="primary" size={65} sx={{ position: 'absolute' }} />
          <Typography fontWeight="bold" color="primary" variant="button">{`${Math.round(
            value
          )}%`}</Typography>
        </Box>
      </Box>
    </Fade>
  );
}
