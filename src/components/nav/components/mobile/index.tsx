import React from 'react';
import { useGetComponentDimension } from '@hooks';
import { Box } from '@mui/material';
import classnames from 'classnames';

import { Networks, TitleBar } from '..';
import { Menu, Navbar, SearchBar } from './components';
import { useMobile } from './hooks';

const Mobile: React.FC<{
    className?: string;
    title: string;
}> = ({ className, title }) => {
    const { ref: heightRef, height } = useGetComponentDimension();
    const { isMenu, isNetwork, isOpen, openNetwork, toggleNavMenus } = useMobile();

    return (
        <div className={className}>
            <Box
                ref={heightRef}
                sx={(theme) => ({
                    zIndex: 500,
                    width: '100%',
                    position: 'fixed',
                    top: 0,
                    background: theme.palette.background.default,
                    '& .screens': {
                        opacity: 0,
                        background: theme.palette.background.paper,
                        visibility: 'hidden',
                        transition: '0.2s ease-in-out',
                        position: 'fixed',
                        width: '100%',
                        paddingTop: '3.5rem',
                        height: '100vh'
                    },
                    '& .screens.open': {
                        opacity: 1,
                        visibility: 'visible'
                    },
                    '& .screens.menu': {
                        zIndex: 151
                    },
                    '& .screens.network': {
                        zIndex: 1
                    },
                    '& .searchBar': {
                        padding: theme.spacing(2)
                    },
                    '& .networks': {
                        padding: theme.spacing(2),
                        height: '100%',
                        overflow: 'auto'
                    }
                })}
            >
                <Menu
                    toggleNavMenus={toggleNavMenus}
                    className={classnames('screens', {
                        open: isMenu,
                        menu: isMenu
                    })}
                />
                <span
                    className={classnames('screens', {
                        open: isNetwork,
                        network: isNetwork
                    })}
                >
                    <Networks className="networks" />
                </span>
                <Navbar isOpen={isOpen} openNetwork={openNetwork} toggleNavMenus={toggleNavMenus} />
                <SearchBar className="searchBar" />
            </Box>
            {/* ============================== */}
            {/* Height placeholder */}
            {/* ============================== */}
            <div style={{ height }} />
            <TitleBar title={title} />
        </div>
    );
};

export default Mobile;
