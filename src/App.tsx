import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './layout/layout';
import { Home } from "./pages/home/home";
import { SignIn } from "./pages/signin/index";
import { SignUp } from "./pages/signup/index";
import "./i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { About } from './pages/about';
import AuthorPage from './pages/authors/index';
import { supabase } from "@/supabase";
import AuthGuard from "@/components/route-guards/auth";
import { useSetAtom } from "jotai";

import { userAtom } from './store/auth';
import ProfileView from './pages/account/profile';
import { BlogsPage } from './pages/blogs';

const queryClient = new QueryClient();

export const App: React.FC = () => {

  const setUser = useSetAtom(userAtom);
 

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <QueryClientProvider client={queryClient}>
         <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          
        <Route path="/home" element={<Home />}>
          
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={
          <AuthGuard>
          <About />
        </AuthGuard>} />
        <Route path="/author/:authorName" element={<AuthorPage />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/blogs" element={<BlogsPage />} />
        
        </Route>
        
      </Routes>
    </Router>
   
    </QueryClientProvider>
 
  );
};

export default App;
