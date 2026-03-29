import React from 'react';
import { Footer, Nav } from '@components';
import { Box } from '@mui/material';
import { LayoutProps } from './types';

const Layout = (props: LayoutProps) => {
    const { children, navTitle, className } = props;

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
            <div className="contentWrapper">
                <Nav title={navTitle} />
                <div className="children">
                    <div className="appBarPlaceholder" />
                    <div className={`${className ?? ''} main-content`.trim()}>{children}</div>
                </div>
            </div>
            <Footer className="footer" />
        </Box>
    );
};

export default Layout;
