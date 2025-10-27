import { createContext, useState } from "react";

export const LanguageContext = createContext();

const LanguageContextProvider = ({ children }) => {
    const [language, setLanguage] = useState("jp");

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "jp" ? "en" : "jp"));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContextProvider;
