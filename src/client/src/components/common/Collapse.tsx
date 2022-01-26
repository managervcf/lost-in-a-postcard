import { ExpandLessRounded, ExpandMoreRounded } from '@mui/icons-material';
import { Collapse as MuiCollapse, Grid } from '@mui/material';
import { Button } from '../common';
import { useState } from 'react';

interface CollapseProps {
  title: string;
  defaultOpen?: boolean;
}

export const Collapse: React.FC<CollapseProps> = ({
  children,
  title,
  defaultOpen = false,
}) => {
  const [checked, setChecked] = useState(defaultOpen);

  const toggle = () => {
    setChecked(checked => !checked);
  };

  const Icon = checked ? <ExpandLessRounded /> : <ExpandMoreRounded />;

  return (
    <>
      <Grid container item justifyContent="center" alignItems="center">
        <Button onClick={toggle}>
          {title}
          {Icon}
        </Button>
      </Grid>
      <MuiCollapse in={checked}>{children}</MuiCollapse>
    </>
  );
};
