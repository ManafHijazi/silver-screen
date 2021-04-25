/* eslint-disable max-len */
import i18next from 'i18next';
// Start Layouts Common (Shared)
import SharedEn from '../Layouts/Common/I18n/en.json';
import SharedAr from '../Layouts/Common/I18n/ar.json';
// End Layouts Common (Shared)
// Start Home Views
import BusinessGroupsViewEn from '../Views/Home/Administration/BusinessGroupsView/I18n/en.json';
import BusinessGroupsViewAr from '../Views/Home/Administration/BusinessGroupsView/I18n/ar.json';
import HeaderViewEn from '../Views/Home/Common/HeaderView/I18n/en.json';
import HeaderViewAr from '../Views/Home/Common/HeaderView/I18n/ar.json';
import ContactsViewEn from '../Views/Home/ContactsView/I18n/en.json';
import ContactsViewAr from '../Views/Home/ContactsView/I18n/ar.json';
// End Home Views
// Start Account Views
import LoginViewEn from '../Views/Account/LoginView/I18n/en.json';
import LoginViewAr from '../Views/Account/LoginView/I18n/ar.json';
// End Account Views


import { GlobalRerender } from './Middleware.Helper';


export function localizationInit() {
  i18next.init({
    interpolation: { escapeValue: false }, // React already does escaping
    fallbackLng: ['en', 'ar'],
    lng: 'en', // language to use
    resources: {
      en: {
        Shared: SharedEn,
        BusinessGroupsView: BusinessGroupsViewEn,
        HeaderView: HeaderViewEn,
        ContactsView: ContactsViewEn,
        LoginView: LoginViewEn,


      },
      ar: {
        Shared: SharedAr,
        BusinessGroupsView: BusinessGroupsViewAr,
        HeaderView: HeaderViewAr,
        ContactsView: ContactsViewAr,
        LoginView: LoginViewAr,
      },
    },
  });

  if (localStorage.getItem('localization')) {
    i18next.changeLanguage(JSON.parse(localStorage.getItem('localization')).currentLanguage);
    const isRtl = JSON.parse(localStorage.getItem('localization')).currentLanguage === 'ar';
    if (isRtl) {
      const direction =
        JSON.parse(localStorage.getItem('localization')).currentLanguage === 'ar' ? 'rtl' : '';
      document.body.setAttribute('class', direction);
      document.body.setAttribute('dir', direction);
      document.documentElement.lang = JSON.parse(
        localStorage.getItem('localization')
      ).currentLanguage;
    }
  } else {
    localStorage.setItem('localization', JSON.stringify({ currentLanguage: 'en', isRtl: false }));
    i18next.changeLanguage('en');
  }
}

export const languageChange = (currentLanguage) => {
  const isRtl = currentLanguage === 'ar';
  const direction = currentLanguage === 'ar' ? 'rtl' : '';
  localStorage.setItem('localization', JSON.stringify({ currentLanguage, isRtl }));
  document.body.setAttribute('class', direction);
  document.body.setAttribute('dir', direction);
  document.documentElement.lang = currentLanguage;
  i18next.changeLanguage(currentLanguage);
  GlobalRerender();
};
localizationInit();
