import { Box } from '@mui/system';
import { useApolloClient } from 'react-apollo';
import { Button } from '../common';

export const LogoutButton: React.FC = () => {
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
};
