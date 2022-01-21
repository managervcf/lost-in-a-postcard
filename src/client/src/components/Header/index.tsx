import { UserInfo } from './UserInfo';
import { Authenticated } from '../common';
import { Logo } from './Logo';
import { useKeyPress } from '../../hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const loginButtonPressed = useKeyPress('`');
  const navigate = useNavigate();

  useEffect(() => {
    if (loginButtonPressed) {
      navigate('/login');
    }
  }, [loginButtonPressed, navigate]);

  return (
    <div className="header">
      <Logo />
      <Authenticated>
        <UserInfo />
      </Authenticated>
    </div>
  );
};
