import React from 'react';
import FirmachainLogo from '@assets/firma_chain_title.svg?react';
import { AppBar, Box, ClickAwayListener, Drawer } from '@mui/material';
import classnames from 'classnames';
import { firmachainTitleLogoSx } from '@/styles/ui';

import { MenuItems, TitleBar } from '..';
import { ActionBar } from './components';
import { useDesktop } from './hooks';

const Desktop: React.FC<{
    className?: string;
    title: string;
}> = ({ className, title }) => {
    const { isMenu, toggleMenu, turnOffAll, toggleNetwork, isNetwork } = useDesktop();
    const OPEN_DRAWER_WIDTH = 230;
    const CLOSED_DRAWER_WIDTH = 59;

    return (
        <ClickAwayListener onClickAway={turnOffAll}>
            <Box
                className={classnames(className)}
                sx={{
                    '& .MuiDrawer-paperAnchorDockedLeft': {
                        border: 'none'
                    }
                }}
            >
                <AppBar
                    position="fixed"
                    className={classnames({ open: isMenu })}
                    sx={(theme) => ({
                        ...theme.mixins.toolbar,
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-start',
                        background: theme.palette.background.default,
                        color: theme.palette.custom.fonts.fontTwo,
                        width: `calc(100% - ${CLOSED_DRAWER_WIDTH}px)`,
                        zIndex: theme.zIndex.drawer + 1,
                        transition: theme.transitions.create(['width', 'margin'], {
                            easing: theme.transitions.easing.easeIn,
                            duration: theme.transitions.duration.enteringScreen
                        }),
                        '&.MuiPaper-elevation4': {
                            boxShadow: 'none'
                        },
                        '&.open': {
                            ml: `${OPEN_DRAWER_WIDTH}px`,
                            width: `calc(100% - ${OPEN_DRAWER_WIDTH}px)`,
                            transition: theme.transitions.create(['width', 'margin'], {
                                easing: theme.transitions.easing.easeIn,
                                duration: theme.transitions.duration.enteringScreen
                            })
                        }
                    })}
                >
                    <ActionBar toggleNetwork={toggleNetwork} isNetwork={isNetwork} />
                    <TitleBar title={title} />
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={classnames({ open: isMenu, closed: !isMenu })}
                    sx={(theme) => ({
                        width: isMenu ? OPEN_DRAWER_WIDTH : CLOSED_DRAWER_WIDTH,
                        flexShrink: 0,
                        whiteSpace: 'nowrap',
                        pl: 2,
                        boxSizing: 'border-box',
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.easeIn,
                            duration: theme.transitions.duration.enteringScreen
                        }),
                        '& .MuiDrawer-paper': {
                            overflowX: 'hidden',
                            width: isMenu ? OPEN_DRAWER_WIDTH : CLOSED_DRAWER_WIDTH,
                            transition: theme.transitions.create('width', {
                                easing: theme.transitions.easing.easeIn,
                                duration: theme.transitions.duration.enteringScreen
                            })
                        }
                    })}
                >
                    <Box
                        className="logo"
                        onClick={toggleMenu}
                        role="button"
                        sx={{
                            width: '216px',
                            ml: '2px',
                            p: '16px 14px 20px',
                            cursor: 'pointer',
                            ...firmachainTitleLogoSx
                        }}
                    >
                        <FirmachainLogo />
                    </Box>
                    <MenuItems />
                </Drawer>
            </Box>
        </ClickAwayListener>
    );
};

export default Desktop;
