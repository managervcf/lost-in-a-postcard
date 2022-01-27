import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

export const Logo = () => (
  <Typography variant="h4" mb={3} mt={3}>
    <Link to="/">Lost in a Postcard</Link>
  </Typography>
);
