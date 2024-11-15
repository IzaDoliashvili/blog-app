import { Outlet } from 'react-router-dom';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { Main } from '../components/main/main';
import React from 'react';

import { ThemeProvider } from "../components/components/theme-provider"


export const Layout: React.FC = () => {
  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer /> 

    </ThemeProvider>
     
    </>
  );
};