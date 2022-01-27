import { ExpandLessRounded, ExpandMoreRounded } from '@mui/icons-material';
import {
  Collapse as MuiCollapse,
  CollapseProps as MuiCollapseProps,
  Grid,
} from '@mui/material';
import { Button } from '../common';
import { useState } from 'react';

type CollapseProps = MuiCollapseProps & {
  title: string;
  defaultOpen?: boolean;
  disabled?: boolean;
};

export const Collapse: React.FC<CollapseProps> = ({
  children,
  title,
  defaultOpen = false,
  disabled = false,
  ...props
}) => {
  const [checked, setChecked] = useState(defaultOpen);

  const toggle = () => {
    setChecked(checked => !checked);
  };

  const Icon = checked ? <ExpandLessRounded /> : <ExpandMoreRounded />;

  return (
    <>
      <Grid container item justifyContent="center" alignItems="center">
        <Button disabled={disabled} onClick={toggle}>
          {title}
          {Icon}
        </Button>
      </Grid>
      <MuiCollapse {...props} in={checked}>
        {children}
      </MuiCollapse>
    </>
  );
};
