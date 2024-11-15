import React from 'react';
import { Home } from '../../pages/home/home';

type MainProps = {
  children: React.ReactNode;
};

export const Main: React.FC<MainProps> = () => {
  return (
    <div className="container mx-auto mt-8 flex px-4">
      <Home />
    </div>
  );
};
