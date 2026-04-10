import { useEffect, useState } from 'react';
import { readTheme, useSettingsStore, writeTheme } from '@zustand/settings';
import { Theme } from '@zustand/settings/types';

export const useLanguageDrawer = (lang: string, toggleNavMenus: () => void) => {
    const [currentLang, setLang] = useState(lang);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        if (lang !== currentLang) {
            setDrawerOpen(false);
            toggleNavMenus();
            setLang(lang);
        }
    }, [lang]);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return {
        toggleDrawer,
        drawerOpen
    };
};

export const useThemeDrawer = (toggleNavMenus: () => void) => {
    const theme = useSettingsStore(readTheme);
    const setTheme = useSettingsStore(writeTheme);

    const [currentTheme, setCurrentTheme] = useState(theme);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        if (theme !== currentTheme) {
            setDrawerOpen(false);
            toggleNavMenus();
            setCurrentTheme(theme);
        }
    }, [theme]);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleChangeTheme = (newTheme: Theme) => {
        setTheme(newTheme);
    };

    return {
        toggleDrawer,
        drawerOpen,
        theme,
        handleChangeTheme
    };
};
