import { Box } from '@mui/system';
import { IncrementClicks } from '../../common';

interface HeartProps {
  id: string;
}

export const Heart: React.FC<HeartProps> = ({ id }) => (
  <Box
    position="absolute"
    bottom="1rem"
    right="0.7rem"
    display="flex"
    flexDirection="column"
  >
    <IncrementClicks id={id} heart disableMultiple disableSnackbar />
  </Box>
);
