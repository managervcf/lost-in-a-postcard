import { KeyboardArrowUpOutlined } from '@mui/icons-material';
import { Button, Fade } from '@mui/material';

interface ScrollUpProps {
  hidden?: boolean;
}

export const ScrollUp: React.FC<ScrollUpProps> = ({ hidden = false }) => (
  <Fade in={!hidden}>
    <Button
      id="scroll-up-button"
      variant="outlined"
      sx={{ borderRadius: 100 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <KeyboardArrowUpOutlined />
    </Button>
  </Fade>
);
