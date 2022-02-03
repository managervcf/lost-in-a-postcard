import { Box } from '@mui/system';
import { IncrementClicks } from '../../common';

interface HeartProps {
  id: string;
  clicks: number;
}

export const Heart: React.FC<HeartProps> = ({ id, clicks }) => (
  <Box
    position="absolute"
    bottom="1rem"
    right="0.7rem"
    display="flex"
    flexDirection="column"
  >
    <IncrementClicks id={id} clicks={clicks} heart disableMultiple disableSnackbar />
  </Box>
);
