import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Button, Error } from '../common';

export const NotFound = () => (
  <Grid container justifyContent="center" flexDirection="column" alignItems="center">
    <Error text="Page you are looking for does not exist" />
    <Button>
      <Link to="/">Main page</Link>
    </Button>
  </Grid>
);
