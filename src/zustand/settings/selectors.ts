import { AtomState, SettingsStoreState } from './types';

export const selectSettingsState = (state: SettingsStoreState): AtomState => ({
    theme: state.theme,
    dateFormat: state.dateFormat,
    txListFormat: state.txListFormat
});

export const readTheme = (state: SettingsStoreState) => state.theme;
export const writeTheme = (state: SettingsStoreState) => state.setTheme;

export const readDate = (state: SettingsStoreState) => state.dateFormat;
export const writeDate = (state: SettingsStoreState) => state.setDateFormat;

export const readTx = (state: SettingsStoreState) => state.txListFormat;
export const writeTx = (state: SettingsStoreState) => state.setTxListFormat;
