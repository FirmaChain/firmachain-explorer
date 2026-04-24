import React from 'react';
import FirmachainLogo from '@assets/firma_chain_title.svg?react';
import { Box, ClickAwayListener, Drawer } from '@mui/material';
import clsx from 'clsx';

import MenuItems from '../menu_items';
import TitleBar from '../title_bar';
import ActionBar from './components/action_bar';
import { useDesktop } from './hooks';

type DesktopNavControls = {
    isMenu: boolean;
    toggleMenu: () => void;
};

const OPEN_DRAWER_WIDTH = 230;
const CLOSED_DRAWER_WIDTH = 59;

export const DesktopHeader = ({ title }: { title: string }) => {
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
            <ActionBar />
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
            className={clsx(className)}
            sx={{
                '& .MuiDrawer-paperAnchorDockedLeft': {
                    border: 'none'
                }
            }}
        >
            <Drawer
                variant="permanent"
                className={clsx({ open: isMenu, closed: !isMenu })}
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
                        cursor: 'pointer'
                    }}
                >
                    <FirmachainLogo style={{ fill: 'white' }} />
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
    const { isMenu, toggleMenu, turnOffAll } = useDesktop();
    const controls = { isMenu, toggleMenu };

    return (
        <ClickAwayListener onClickAway={turnOffAll}>
            <Box className={clsx(className)}>
                <DesktopHeader title={title} />
                <DesktopSidebar controls={controls} />
            </Box>
        </ClickAwayListener>
    );
};

export default Desktop;
