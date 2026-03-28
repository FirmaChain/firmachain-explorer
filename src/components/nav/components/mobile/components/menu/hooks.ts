import { useEffect, useState } from 'react';
import { writeTheme } from '@recoil/settings';
import { Theme } from '@recoil/settings/types';
import { SetterOrUpdater, useRecoilState } from 'recoil';

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
    const [theme, setTheme] = useRecoilState(writeTheme) as [Theme, SetterOrUpdater<Theme>];

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
