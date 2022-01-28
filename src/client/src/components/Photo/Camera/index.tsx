import { CameraAlt, CameraAltOutlined } from '@mui/icons-material';
import { Chip, Fade, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

interface CameraProps {
  country: string;
  region: string;
  caption: string;
}

export const Camera: React.FC<CameraProps> = ({ country, region, caption }) => {
  const [show, setShow] = useState(false);

  /**
   * Hides photo details.
   */
  const hideDetails = () => setShow(false);

  /**
   * Shows photo details.
   */
  const showDetails = () => setShow(true);

  /**
   * After some time, hide photo details.
   */
  useEffect(() => {
    if (show) {
      setTimeout(hideDetails, 2500);
    }
  }, [show]);

  return (
    <Box
      position="absolute"
      bottom="1rem"
      right="4.5rem"
      justifyContent="center"
      alignItems="center"
      display="flex"
      flexDirection="row"
    >
      <Box>
        <Fade in={show} timeout={800}>
          <Chip
            color="primary"
            label={`${caption ? `${caption}, ` : ''}
            ${region ? `${region}, ` : ''}
            ${country}`}
          />
        </Fade>
      </Box>
      <IconButton color="primary" onClick={showDetails}>
        <CameraAltOutlined />
      </IconButton>
    </Box>
  );
};
