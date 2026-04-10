import { useState } from 'react';
import setLanguage from '@/adapters/i18n/setLanguage';
import { readDate, readTheme, readTx, THEME_DICTIONARY, useSettingsStore, writeDate, writeTheme, writeTx } from '@zustand/settings';
import { Date, Theme, Tx } from '@zustand/settings/types';
import * as R from 'ramda';

export const useSettingList = ({ lang }) => {
    const theme = useSettingsStore(readTheme);
    const setTheme = useSettingsStore(writeTheme);
    const date = useSettingsStore(readDate);
    const setDate = useSettingsStore(writeDate);
    const tx = useSettingsStore(readTx);
    const setTx = useSettingsStore(writeTx);

    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        lang,
        theme,
        dateFormat: date,
        txListFormat: tx
    });

    const resetSettings = () => {
        handleSetState({
            theme,
            dateFormat: date,
            lang
        });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        resetSettings();
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSetState = (stateChange: any) => {
        setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
    };

    const handleChange = (label: string, value: any) => {
        handleSetState({
            [label]: value
        });
    };

    const changeTheme = (value: Theme) => {
        if (THEME_DICTIONARY[value]) {
            setTheme(value);
        }
    };

    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        if (state.theme !== theme) {
            changeTheme(state.theme);
        }

        if (state.lang !== lang) {
            setLanguage(state.lang);
        }

        if (state.dateFormat !== date) {
            setDate(state.dateFormat);
        }

        if (state.txListFormat !== tx) {
            setTx(state.txListFormat);
        }

        handleClose();
    };

    return {
        open,
        handleOpen,
        handleClose,
        state,
        handleChange,
        handleFormSubmit,
        handleCancel
    };
};
