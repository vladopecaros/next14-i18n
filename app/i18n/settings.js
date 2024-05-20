import {LANGUAGES} from '../../lib/languages'
export const defaultNS = 'translation' //Namespace koji pozivamo za prevode
export const cookieName = 'i18next'
export const fallbackLng = 'en'

export function getOptions (lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: LANGUAGES,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}