import { Tab } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { theme } from '../../constants';

interface NavbarItemProps {
  label: string;
  value: string;
  index: number;
}

export const NavbarItem: React.FC<NavbarItemProps> = ({ label, value, index }) => {
  const { pathname } = useLocation();

  return (
    <Tab
      TouchRippleProps={{ style: { color: theme.palette.primary.main } }}
      style={{
        opacity: 'inherit',
        color: pathname === value ? theme.palette.primary.main : 'inherit',
        transition: 'all 0.3s',
      }}
      component={NavLink}
      to={value}
      label={label}
      value={value}
      tabIndex={index}
    />
  );
};
