import { Chip, Grid } from '@mui/material';
import { ApolloError } from 'apollo-boost';

interface ErrorProps {
  error?: ApolloError | null;
  text?: string | null;
}

/**
 * A component responsible for displaying errors
 * received from the graphQL API.
 */
export const Error: React.FC<ErrorProps> = ({ error, text }) => {
  const parsedError = error?.message
    .replace('GraphQL error: ', '')
    .replace('Network error: ', '');

  const isError = error || text;

  return isError ? (
    <Grid container justifyContent="center" alignItems="center">
      <Chip variant="outlined" color="error" label={text ?? parsedError} />
    </Grid>
  ) : null;
};
