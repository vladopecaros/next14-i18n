import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

//Uvozimo SERVERSKI i18n jer je ovo serverska komponenta
import { useTranslation } from "../i18n"  
import LanguageSwitcher from "./components/language_switch/language_swtich";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params, // Zahtevamo parametre
}: Readonly<{
  children: React.ReactNode;
  params:{lng:string} //trazimo params.lng kako bi dobili trenutni [lng] odnosno jezik
}>) {

  //  definisemo i18n i 't', moramo sacekati prevode koriscenjem AWAIT
  // takodje prosledjujemo jezik (lng) koji nam je potreban 
  const { t, i18n } = await useTranslation(params.lng); 
  return (
    <html lang={i18n.language}>
      <body className={inter.className}><div className="site_container">
        <LanguageSwitcher/>
        <p>{t('server_component')}</p> {/* Koristimo prevodjenje kao i do sada */}
        {children}</div></body>
    </html>
  );
}
