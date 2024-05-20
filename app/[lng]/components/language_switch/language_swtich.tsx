"use client";

import { useTranslation } from "@/app/i18n/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// Sada moramo koristiti next/navigation umesto router-a

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = (lang: string) => {
    const segments = pathname.split("/");
    // Replace the current language code with the new one
    segments[1] = lang;
    const newPathname = segments.join("/");
    i18n.changeLanguage(lang);
    router.push(`${newPathname}?${searchParams.toString()}`);
  };
  return (
    <div className="switcher">
      <button
        onClick={() => handleClick('en')}
        disabled={i18n.language === "en"}
      >
        English
      </button>
      <button
        onClick={() => handleClick('sr')}
        disabled={i18n.language === "sr"}
      >
        Srpski
      </button>
    </div>
  );
};
export default LanguageSwitcher;
