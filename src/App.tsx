import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Home } from "./pages/home/home";
import { SignIn } from "./pages/signin/index";
import { SignUp } from "./pages/signup/index";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          
        <Route path="/home" element={<Home />}>
          
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
