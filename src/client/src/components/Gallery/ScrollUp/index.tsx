import { KeyboardArrowUpOutlined } from '@mui/icons-material';
import { Button, Fade } from '@mui/material';
import { scrollToTop } from '../../../utils';

interface ScrollUpProps {
  hidden?: boolean;
}

export const ScrollUp: React.FC<ScrollUpProps> = ({ hidden = false }) => (
  <Fade in={!hidden}>
    <Button
      id="scroll-up-button"
      variant="outlined"
      sx={{ borderRadius: 100 }}
      onClick={() => scrollToTop()}
    >
      <KeyboardArrowUpOutlined />
    </Button>
  </Fade>
);
