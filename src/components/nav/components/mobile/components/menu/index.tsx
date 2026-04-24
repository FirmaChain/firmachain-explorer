import { locale, locales } from '@/i18n';
import ExpandMoreIcon from '@assets/icon-expand-more.svg?react';
import Language from '@assets/icon-language.svg?react';
import ThemeIcon from '@assets/icon-theme.svg?react';
import { Box, Drawer, MenuItem, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { THEME_LIST } from '@zustand/settings';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import MenuItems from '../../../menu_items';
import { useLanguageDrawer, useThemeDrawer } from './hooks';
import { MenuProps } from './types';

const Menu = (props: MenuProps) => {
    const { t, i18n } = useTranslation('common');

    const { toggleNavMenus, className } = props;
    const languageOptions = useLanguageDrawer(i18n.language, toggleNavMenus);

    const themeOptions = useThemeDrawer(toggleNavMenus);
    return (
        <>
            {/* ================================== */}
            {/* Lang Drawer */}
            {/* ================================== */}
            <Drawer
                anchor="bottom"
                open={languageOptions.drawerOpen}
                onClose={languageOptions.toggleDrawer}
                className={clsx('lang-drawer')}
                sx={(theme) => ({
                    '& .MuiDrawer-paper': {
                        background: alpha(theme.palette.background.paper, 0.5)
                    }
                })}
            >
                <div className={clsx('content')}>
                    {locales
                        ?.filter((l) => l !== i18n.language)
                        .map((l) => (
                            <MenuItem key={l} component="button" onClick={() => i18n.changeLanguage(l)}>
                                {t(l)}
                            </MenuItem>
                        ))}
                </div>
            </Drawer>
            {/* ================================== */}
            {/* Theme Drawer */}
            {/* ================================== */}
            <Drawer
                anchor="bottom"
                open={themeOptions.drawerOpen}
                onClose={themeOptions.toggleDrawer}
                sx={(theme) => ({
                    '& .MuiDrawer-paper': {
                        background: alpha(theme.palette.background.paper, 0.5)
                    }
                })}
            >
                <div className={clsx('content')}>
                    {THEME_LIST.filter((l) => l !== themeOptions.theme).map((l) => (
                        <div key={l}>
                            <MenuItem component="a" onClick={() => themeOptions.handleChangeTheme(l)}>
                                {t(l)}
                            </MenuItem>
                        </div>
                    ))}
                </div>
            </Drawer>
            {/* ================================== */}
            {/* Main Content */}
            {/* ================================== */}
            <Box
                className={clsx(className)}
                sx={(theme) => ({
                    background: theme?.palette?.background.paper,
                    display: 'flex',
                    flexDirection: 'column',
                    '& .menu': {
                        flex: 1
                    },
                    '& .footerActions': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        padding: '1rem'
                    },
                    '& .language': {
                        width: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        '& .MuiTypography-caption': {
                            margin: '0 0.3rem'
                        }
                    },
                    '& .theme': {
                        width: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        '& svg': {
                            width: theme.spacing(3),
                            height: theme.spacing(3)
                        },
                        '& .MuiTypography-caption': {
                            margin: '0 0.3rem'
                        }
                    }
                })}
            >
                <div className="menu">
                    <MenuItems />
                </div>
                {/* ========================= */}
                {/* Footer Actions */}
                {/* ========================= */}
                <div className="footerActions">
                    <div className="language" role="button" onClick={languageOptions.toggleDrawer}>
                        <Language />
                        <Typography variant="caption">{t(locale)}</Typography>
                        <ExpandMoreIcon style={{ width: '20px' }} />
                    </div>
                    <div className="theme" role="button" onClick={themeOptions.toggleDrawer}>
                        <span role="button">
                            <ThemeIcon />
                        </span>
                        <Typography variant="caption">{t(themeOptions.theme)}</Typography>
                    </div>
                </div>
            </Box>
        </>
    );
};

export default Menu;
