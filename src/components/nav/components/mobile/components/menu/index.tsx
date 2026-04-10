import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import Link from '@/adapters/routing/link';
import { useRouter } from '@/adapters/routing/router';
import Language from '@assets/icon-language.svg?react';
import ThemeIcon from '@assets/icon-theme.svg?react';
import { Box, Drawer, MenuItem, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ExpandMoreOutlined } from '@mui/icons-material';
import { THEME_LIST } from '@zustand/settings';
import classnames from 'classnames';

import { MenuItems } from '../../..';
import { useLanguageDrawer, useThemeDrawer } from './hooks';
import { MenuProps } from './types';

const Menu = (props: MenuProps) => {
    const router = useRouter();
    const { t, lang } = useTranslation('common');

    const { toggleNavMenus, className } = props;
    const languageOptions = useLanguageDrawer(lang, toggleNavMenus);

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
                className={classnames('lang-drawer')}
                sx={(theme) => ({
                    '& .MuiDrawer-paper': {
                        background: alpha(theme.palette.background.paper, 0.5)
                    }
                })}
            >
                <div className={classnames('content')}>
                    {router.locales
                        .filter((l) => l !== lang)
                        .map((l) => (
                            <div key={l}>
                                <Link
                                    href={{
                                        pathname: router.pathname,
                                        query: router.query
                                    }}
                                    locale={l}
                                    passHref
                                >
                                    <MenuItem component="a">
                                        {t(l)}
                                    </MenuItem>
                                </Link>
                            </div>
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
                <div className={classnames('content')}>
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
                className={classnames(className)}
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
                        <Typography variant="caption">{t(router.locale)}</Typography>
                        <ExpandMoreOutlined fontSize="small" />
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
