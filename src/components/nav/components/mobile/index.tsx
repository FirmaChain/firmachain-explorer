import React from 'react';
import { useGetComponentDimension } from '@hooks';
import classnames from 'classnames';

import { Networks, TitleBar } from '..';
import { Menu, Navbar, SearchBar } from './components';
import { useMobile } from './hooks';
import { useStyles } from './styles';

const Mobile: React.FC<{
    className?: string;
    title: string;
}> = ({ className, title }) => {
    const { ref: heightRef, height } = useGetComponentDimension();
    const { isMenu, isNetwork, isOpen, openNetwork, toggleNavMenus } = useMobile();
    const classes = useStyles();

    return (
        <div className={className}>
            <div ref={heightRef} className={classes.root}>
                <Menu
                    toggleNavMenus={toggleNavMenus}
                    className={classnames(classes.screens, {
                        open: isMenu,
                        menu: isMenu
                    })}
                />
                <span
                    className={classnames(classes.screens, {
                        open: isNetwork,
                        network: isNetwork
                    })}
                >
                    <Networks className={classes.networks} />
                </span>
                <Navbar isOpen={isOpen} openNetwork={openNetwork} toggleNavMenus={toggleNavMenus} />
                <SearchBar className={classes.searchBar} />
            </div>
            {/* ============================== */}
            {/* Height placeholder */}
            {/* ============================== */}
            <div style={{ height }} />
            <TitleBar title={title} />
        </div>
    );
};

export default Mobile;
