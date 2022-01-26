import { UserInfo } from './UserInfo';
import { Authenticated } from '../common';
import { Logo } from './Logo';
import { useKeyPress } from '../../hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Grid, Toolbar } from '@mui/material';
import { Navbar } from '../Navbar';

export const Header = () => {
  const loginButtonPressed = useKeyPress('`');
  const navigate = useNavigate();

  useEffect(() => {
    if (loginButtonPressed) {
      navigate('/login');
    }
  }, [loginButtonPressed, navigate]);

  return (
    <>
      {/* <AppBar position="sticky" color="transparent"> */}
      <Toolbar>
        <Grid
          container
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Logo />
          <Navbar />
        </Grid>
      </Toolbar>
      {/* </AppBar> */}
    </>
  );
};
