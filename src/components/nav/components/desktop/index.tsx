import React from 'react';
import FirmachainLogo from '@assets/firma_chain_title.svg?react';
import { Box, ClickAwayListener, Drawer } from '@mui/material';
import classnames from 'classnames';

import { firmachainTitleLogoSx } from '@/styles/ui';

import { MenuItems, TitleBar } from '..';
import { ActionBar } from './components';
import { useDesktop } from './hooks';

type DesktopNavControls = {
    isMenu: boolean;
    isNetwork: boolean;
    toggleMenu: () => void;
    toggleNetwork: () => void;
};

const OPEN_DRAWER_WIDTH = 230;
const CLOSED_DRAWER_WIDTH = 59;

export const DesktopHeader = ({ title, controls }: { title: string; controls: DesktopNavControls }) => {
    const { toggleNetwork, isNetwork } = controls;

    return (
        <Box
            sx={(theme) => ({
                position: 'sticky',
                top: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                background: theme.palette.background.default,
                color: theme.palette.custom.fonts.fontTwo,
                zIndex: theme.zIndex.drawer + 1,
                width: '100%',
                paddingBottom: '12px'
            })}
        >
            <ActionBar toggleNetwork={toggleNetwork} isNetwork={isNetwork} />
            <TitleBar title={title} />
        </Box>
    );
};

export const DesktopSidebar: React.FC<{
    className?: string;
    controls: DesktopNavControls;
}> = ({ className, controls }) => {
    const { isMenu, toggleMenu } = controls;

    return (
        <Box
            className={classnames(className)}
            sx={{
                '& .MuiDrawer-paperAnchorDockedLeft': {
                    border: 'none'
                }
            }}
        >
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
    );
};

const Desktop: React.FC<{
    className?: string;
    title: string;
}> = ({ className, title }) => {
    const { isMenu, toggleMenu, turnOffAll, toggleNetwork, isNetwork } = useDesktop();
    const controls = { isMenu, toggleMenu, toggleNetwork, isNetwork };

    return (
        <ClickAwayListener onClickAway={turnOffAll}>
            <Box className={classnames(className)}>
                <DesktopHeader title={title} controls={controls} />
                <DesktopSidebar controls={controls} />
            </Box>
        </ClickAwayListener>
    );
};

export default Desktop;
