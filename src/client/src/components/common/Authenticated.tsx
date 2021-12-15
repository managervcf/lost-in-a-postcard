import React from 'react';
import { useQuery } from 'react-apollo';
import { ME, MeData } from '../../graphql';

export const Authenticated: React.FC = ({ children }) => {
  const { loading, error, data } = useQuery<MeData>(ME, {
    fetchPolicy: 'network-only',
  });

  // Handle loading, error and no user state.
  if (loading || error || !data?.me) {
    return null;
  }

  // Destructure `me`.
  const { me } = data;

  const childrenWithUser = React.Children.map(children, child =>
    React.cloneElement(child as React.ReactElement<MeData>, { me })
  );

  return <>{childrenWithUser}</>;
};
