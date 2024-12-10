import React, { useState } from 'react';
import { Link, NavLink,  } from 'react-router-dom';
import {ModeToggle} from '../components/mode-toggle';
import { useTranslation } from "react-i18next";
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/store/auth';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/supabase/auth';

export const Header: React.FC = () => {

  const user = useAtomValue(userAtom);

  const { mutate: handleLogout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
  });
  const { t, i18n } = useTranslation();
  const [languageDropdown, setLanguageDropdown] = useState(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang); 
    setLanguageDropdown(false);
  };

  console.log("Header user state:", user);
  return (
    <header className=" p-4 border flex justify-between items-center">
      <div className="text-xl font-bold ">BitBlogs</div>
      <nav className="space-x-4 ">
        <Link to="/home" className="hover:text-gray-400">{t("Home")}</Link>
        <Link to="/blogs" className="hover:text-gray-400">{t("Blogs")}</Link>
        <Link to="/about" className="hover:text-gray-400">{t("About")}</Link>
      </nav>
      <div className="flex w-1/4 items-center justify-end text-blue-400">
      {!user ? (
          <>
           <Link to="/signin">
          
          <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
            {t("Sign In")}
            </button>
          </Link>
           
          </>
        ) : (
         <>

          <NavLink to="/profile">Profile</NavLink>
          <button onClick={() => handleLogout()} className="text-red-500">
            Logout
          </button>
          </>
       
      
        )}
        
        
      </div>
      <div className='flex justify-between items-center w-1/5'>

      {/* <div className="space-x-4">
        <Link to="/signin">
        <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
          {t("Sign In")}
          </button>
        </Link>
      </div> */}

      <div className="relative">
          <button
            onClick={() => setLanguageDropdown(!languageDropdown)}
            className="flex items-center gap-2 px-2 py-2 border hover:bg-gray-400  rounded w-10 h-10"
          >
            <GlobeAltIcon className="w-5 h-5" />
          </button>
          {languageDropdown && (
            <div className="absolute right-0 mt-4 w-32  border rounded-md shadow-lg">
              <button
                onClick={() => changeLanguage("en")}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                English
              </button>
              <button
                onClick={() => changeLanguage("geo")}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                ქართული
              </button>
            </div>
          )}
        </div>

      
        <ModeToggle />
        </div>
      
    </header>
  );
};



