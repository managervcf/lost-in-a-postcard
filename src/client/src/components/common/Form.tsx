import { Grid } from '@mui/material';
import { FormEventHandler } from 'react';

interface FormProps {
  id?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const Form: React.FC<FormProps> = ({ id, onSubmit, children }) => (
  <Grid
    id={id}
    onSubmit={onSubmit}
    container
    spacing={2}
    component="form"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
  >
    {children}
  </Grid>
);
