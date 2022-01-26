import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

export const Logo = () => (
  <Typography variant="h3" m={2}>
    <Link to="/">Lost in a Postcard</Link>
  </Typography>
);
