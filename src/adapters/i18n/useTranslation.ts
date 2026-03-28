/* eslint-disable */
import { useTranslation as useReactI18nextTranslation } from 'react-i18next';

type TOptions = Record<string, any>;

const useTranslation = (ns?: string) => {
    const { t, i18n } = useReactI18nextTranslation(ns);

    const wrappedT = (key: string, options?: TOptions): string => {
        if (!key.includes(':')) {
            return String(t(key, options) as unknown as string);
        }

        const [namespace, nextKey] = key.split(':');
        return String(
            t(nextKey, {
                ns: namespace,
                ...(options || {})
            }) as unknown as string
        );
    };

    return {
        t: wrappedT,
        lang: i18n.language
    };
};

export default useTranslation;
