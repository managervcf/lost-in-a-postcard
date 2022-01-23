import React from 'react';
import { ScaleLoader } from 'react-spinners';
import { PRIMARY_COLOR } from '../../constants';

interface ButtonProps {
  id?: string;
  className?: string;
  primary?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  submit?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  id,
  className,
  primary,
  loading,
  disabled,
  onClick,
  children,
  submit,
}) => {
  const customButtonClasses = className ? ` ${className}` : '';
  const primaryButtonClass = primary ? ' button-primary' : '';

  return (
    <button
      id={id}
      className={'button' + primaryButtonClass + customButtonClasses}
      disabled={loading || disabled}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
    >
      {!loading ? children : <ScaleLoader height={10} color={PRIMARY_COLOR} />}
    </button>
  );
};
