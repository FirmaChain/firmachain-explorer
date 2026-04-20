import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const DEFAULT_NS = 'common';

if (!i18n.isInitialized) {
    i18n.use(HttpBackend)
        .use(initReactI18next)
        .init({
            lng: 'en',
            fallbackLng: 'en',
            defaultNS: DEFAULT_NS,
            ns: [
                'common',
                'home',
                'blocks',
                'transactions',
                'message_labels',
                'message_contents',
                'proposals',
                'validators',
                'accounts',
                'params',
                'profiles'
            ],
            interpolation: {
                escapeValue: false
            },
            backend: {
                loadPath: '/locales/{{lng}}/{{ns}}.json'
            },
            react: {
                useSuspense: false
            }
        });
}

const locale = i18n.language || '';
const locales = i18n.languages?.length ? i18n.languages : ['en'];

export { locale, locales };

export default i18n;
