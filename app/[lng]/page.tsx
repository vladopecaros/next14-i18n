// "use client" directive
'use client';

import styles from './page.module.css';
// Import CLIENT side i18n
import { useTranslation } from '../i18n/client';
import LanguageSwitcher from './components/language_switch/language_swtich';

const HomePage = () => {
  // Since this is a client component, we cannot directly access
  // parameters, so i18n/client.js will handle that for us.
  // We use translation as usual, but now we do not have to pass lng.
  const { t, i18n } = useTranslation(); 

  return (
    <div className={styles.home_container}>
      <h1>{t('welcome')}</h1>
      <p>{t('client_component')}</p>
      <LanguageSwitcher />
    </div>
  );
};

export default HomePage;
