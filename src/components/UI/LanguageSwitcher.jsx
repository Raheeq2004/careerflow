import { useTranslation } from "react-i18next";

function LanguageSwitcher({ className = "" }) {
  const { i18n } = useTranslation(); //to read and change the language.
  const isArabic = i18n.resolvedLanguage === "ar";
  const nextLanguage = isArabic ? "en" : "ar"; //The language the button will switch to.

  return (
    <button
      type="button"
      lang={nextLanguage}
      aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}
      onClick={() => i18n.changeLanguage(nextLanguage)}
      className={`min-h-11 rounded-control border border-line bg-white px-4 text-sm font-semibold text-ink transition-colors hover:bg-page focus-visible:outline-2 focus-visible:outline-brand ${className}`}
    >
      {isArabic ? "English" : "العربية"}
    </button>
  );
}

export default LanguageSwitcher;
