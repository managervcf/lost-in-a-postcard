import { LocationOn, LocationOnOutlined } from '@mui/icons-material';
import { Chip, Fade, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

interface LocationProps {
  country: string;
  region: string;
  caption: string;
}

export const Location: React.FC<LocationProps> = ({ country, region, caption }) => {
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
    let timeout: NodeJS.Timeout;

    if (show) {
      timeout = setTimeout(hideDetails, 2500);
    }

    return () => clearTimeout(timeout);
  }, [show]);

  return (
    <Box
      position="absolute"
      bottom="1rem"
      right="4.2rem"
      justifyContent="center"
      alignItems="center"
      display="flex"
      flexDirection="row"
    >
      <Box>
        <Fade in={show} timeout={800}>
          <Chip
            size="small"
            color="primary"
            label={`${caption ? `${caption}, ` : ''}
            ${region ? `${region}, ` : ''}
            ${country}`}
          />
        </Fade>
      </Box>
      <IconButton
        color="primary"
        onClick={showDetails}
        sx={{ transform: show ? 'rotateZ(90deg)' : null, transition: 'all 0.6s' }}
      >
        {show ? <LocationOn /> : <LocationOnOutlined />}
      </IconButton>
    </Box>
  );
};
