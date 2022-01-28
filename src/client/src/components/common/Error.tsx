import { Alert, Snackbar } from '@mui/material';
import { ApolloError } from 'apollo-boost';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Errors } from '../../constants';

interface ErrorProps {
  error?: ApolloError | null;
  text?: string | null;
  setError?: Dispatch<SetStateAction<Errors | null>>;
}

/**
 * A component responsible for displaying errors
 * received from the graphQL API.
 */
export const Error: React.FC<ErrorProps> = ({ error, text, setError = undefined }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);

    if (setError) {
      setTimeout(() => setError(null), 1000);
    }
  };

  const parsedError = error?.message
    .replace('GraphQL error: ', '')
    .replace('Network error: ', '');

  console.log({ text, error });

  useEffect(() => {
    const isError = !!(error || text);

    if (isError) {
      handleClick();
    }
  }, [error, text]);

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert variant="filled" onClose={handleClose} severity="error">
        {text ?? parsedError}
      </Alert>
    </Snackbar>
  );
};
