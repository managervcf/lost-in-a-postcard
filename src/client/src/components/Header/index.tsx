import { Logo } from './Logo';
import { useKeyPress } from '../../hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Toolbar } from '@mui/material';
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
    <Toolbar sx={{ padding: 0 }}>
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
  );
};
