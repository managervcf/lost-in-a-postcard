import React, { KeyboardEvent } from 'react';
import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  id?: string;
  loading?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
  onClick?: () => void;
  submit?: boolean;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

export const Button: React.FC<ButtonProps> = ({
  id,
  loading,
  disabled,
  onClick,
  children,
  submit,
  color,
  variant,
}) => {
  return (
    <MuiButton
      style={{ margin: 10, borderRadius: 15, textTransform: 'none' }}
      id={id}
      variant={variant ?? 'outlined'}
      color={color ?? 'primary'}
      disabled={loading || disabled}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
      onKeyPress={
        submit && onClick
          ? ({ key }: KeyboardEvent<HTMLButtonElement>) => {
              if (key === 'Enter') {
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </MuiButton>
  );
};
