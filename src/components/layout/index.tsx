import { Footer, Nav } from '@components';
import { useScreenSize } from '@hooks';
import { Box, ClickAwayListener } from '@mui/material';

import { DesktopHeader, DesktopSidebar } from '../nav/components/desktop';
import { useDesktop } from '../nav/components/desktop/hooks';
import { LayoutProps } from './types';

const Layout = (props: LayoutProps) => {
    const { children, navTitle, className } = props;
    const { isDesktop } = useScreenSize();
    const { isMenu, isNetwork, toggleMenu, toggleNetwork, turnOffAll } = useDesktop();
    const desktopControls = { isMenu, isNetwork, toggleMenu, toggleNetwork };

    return (
        <Box
            sx={(theme) => ({
                [theme.breakpoints.up('lg')]: {
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh'
                },
                '& .contentWrapper': {
                    [theme.breakpoints.up('lg')]: {
                        display: 'flex',
                        flex: 1
                    }
                },
                '& .footer': {
                    [theme.breakpoints.up('lg')]: {
                        position: 'relative',
                        zIndex: 1299
                    }
                },
                '& .appBarPlaceholder': {
                    ...theme.mixins.toolbar
                },
                '& .children': {
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    '& .main-content': {
                        width: '100%',
                        flex: 1
                    }
                }
            })}
        >
            {isDesktop ? (
                <ClickAwayListener onClickAway={turnOffAll}>
                    <div className="contentWrapper">
                        <DesktopSidebar controls={desktopControls} />
                        <div className="children">
                            <DesktopHeader title={navTitle ?? ''} controls={desktopControls} />
                            <div className={`${className ?? ''} main-content`.trim()}>{children}</div>
                        </div>
                    </div>
                </ClickAwayListener>
            ) : (
                <div className="contentWrapper">
                    <Nav title={navTitle} />
                    <div className="children">
                        <div className="appBarPlaceholder" />
                        <div className={`${className ?? ''} main-content`.trim()}>{children}</div>
                    </div>
                </div>
            )}
            <Footer className="footer" />
        </Box>
    );
};

export default Layout;
