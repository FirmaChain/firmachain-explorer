import { DATE_KEY, getItem, setItem, THEME_KEY, TX_KEY } from '@utils/localstorage';
import { create } from 'zustand';

import { AtomState, Date, SettingsStoreState, Theme, Tx } from './types';
import { THEME_DICTIONARY } from './utils';

export const initialState: AtomState = {
    theme: 'dark',
    dateFormat: 'locale',
    txListFormat: 'compact'
};

const resolveStoredTheme = (fallbackTheme: Theme): Theme => {
    const savedTheme = getItem(THEME_KEY, 'device');
    let currentTheme: Theme = fallbackTheme;

    if (savedTheme === 'device') {
        if (window?.matchMedia('(prefers-color-scheme: dark)')?.matches) {
            currentTheme = 'dark';
        }
    } else if (typeof savedTheme === 'string' && savedTheme in THEME_DICTIONARY) {
        currentTheme = savedTheme as Theme;
    }

    return currentTheme;
};

const getInitialSettings = (fallbackState: AtomState): AtomState => {
    const theme = resolveStoredTheme(fallbackState.theme);
    const dateFormat = getItem(DATE_KEY, fallbackState.dateFormat) as Date;
    const txListFormat = getItem(TX_KEY, fallbackState.txListFormat) as Tx;

    return {
        theme,
        dateFormat,
        txListFormat
    };
};

export const useSettingsStore = create<SettingsStoreState>((set, get) => ({
    ...initialState,
    initialized: false,
    initialize: () => {
        if (get().initialized) {
            return;
        }

        const nextSettings = getInitialSettings({
            theme: get().theme,
            dateFormat: get().dateFormat,
            txListFormat: get().txListFormat
        });

        set({
            ...nextSettings,
            initialized: true
        });
    },
    setTheme: (theme: Theme) => {
        setItem(THEME_KEY, theme);
        set({ theme });
    },
    setDateFormat: (dateFormat: Date) => {
        setItem(DATE_KEY, dateFormat);
        set({ dateFormat });
    },
    setTxListFormat: (txListFormat: Tx) => {
        setItem(TX_KEY, txListFormat);
        set({ txListFormat });
    },
    reset: () => {
        set({
            ...initialState,
            initialized: false
        });
    }
}));
