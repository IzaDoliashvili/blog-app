import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './layout/layout';
import { Home } from "./pages/home/home";
import { SignIn } from "./pages/signin/index";
import { SignUp } from "./pages/signup/index";
import "./i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { About } from './pages/about';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
         <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          
        <Route path="/home" element={<Home />}>
          
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        </Route>
        
      </Routes>
    </Router>
   
    </QueryClientProvider>
 
  );
};

export default App;
