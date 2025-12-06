import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export function GlassMenu() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 p-1.5 rounded-full border border-black/5 dark:border-white/10 bg-white/10 dark:bg-black/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] ring-1 ring-black/5 dark:ring-white/10 relative">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${
              isActive
                ? "text-black dark:text-white"
                : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/40 dark:bg-white/10 shadow-sm backdrop-blur-md rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{t("menu.home")}</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${
              isActive
                ? "text-black dark:text-white"
                : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/40 dark:bg-white/10 shadow-sm backdrop-blur-md rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{t("menu.about")}</span>
            </>
          )}
        </NavLink>
        
        {/* Language Selector */}
        <div className="flex items-center gap-1 ml-2 pl-2 border-l border-white/20 dark:border-white/10">
          <button
            onClick={() => changeLanguage("en")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              i18n.language === "en"
                ? "bg-white/40 dark:bg-white/10 text-black dark:text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/5"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage("fr")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              i18n.language === "fr"
                ? "bg-white/40 dark:bg-white/10 text-black dark:text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/5"
            }`}
          >
            FR
          </button>
        </div>
      </div>
    </nav>
  );
}
