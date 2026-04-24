import { darkTemplate, deuteranopiaTemplate, lightTemplate, tritanopiaTemplate } from '@styles';

import { Theme } from './types';

export const THEME_LIST: Theme[] = ['dark', 'deuteranopia', 'tritanopia'];

export const THEME_DICTIONARY = {
    dark: darkTemplate,
    deuteranopia: deuteranopiaTemplate,
    tritanopia: tritanopiaTemplate
};

export const getThemeTemplate = (theme: Theme) => {
    if (theme in THEME_DICTIONARY) {
        return THEME_DICTIONARY[theme as keyof typeof THEME_DICTIONARY];
    }

    return lightTemplate;
};

export const DATE_LIST = ['locale', 'utc'];
export const TX_LIST = ['compact', 'detailed'];
