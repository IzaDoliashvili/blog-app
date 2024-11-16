import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "Sign Up": "Sign Up",
      "Sign In": "Sign In",
      "Home": "Home",
      "Write": "Write",
      "About": "About",
      "Welcome": "Welcome to BitBlogs",
    },
  },
  geo: {
    translation: {
      "Sign Up": "დარეგისტრირება",
      "Sign In": "შესვლა",
      "Home": "მთავარი",
      "Write": "დაწერა",
      "About": "ჩვენს შესახებ",
      "Welcome": "კეთილი იყოს თქვენი მობრძანება BitBlogs-ზე",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) 
  .init({
    resources,
    lng: "en", 
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
