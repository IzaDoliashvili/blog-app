import React from 'react';

export const Main: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <main >{children}</main>;
};