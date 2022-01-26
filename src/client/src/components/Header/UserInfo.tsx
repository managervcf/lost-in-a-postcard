import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useApolloClient } from 'react-apollo';
import { MeData } from '../../graphql';
import { Button } from '../common';

interface UserInfoProps {
  me?: MeData['me'];
}

export function UserInfo({ me }: UserInfoProps) {
  const client = useApolloClient();
  /**
   * Handles the logout button click event.
   * 1. Remove the token property from the localStorage.
   * 2. Reset the Apollo store to update the component.
   */
  const logout = async () => {
    localStorage.removeItem('token');
    await client.resetStore();
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Button id="logout-button" color="error" onClick={logout}>
        Logout
      </Button>
    </Box>
  );
}
