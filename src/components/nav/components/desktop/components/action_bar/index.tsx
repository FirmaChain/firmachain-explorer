import React from 'react';
import { useGetComponentDimension } from '@hooks';
import classnames from 'classnames';

import { SearchBar } from '../../..';
import { Network, NetworkList, SettingsList } from './components';
import { useStyles } from './styles';

const ActionBar: React.FC<{
    isNetwork: boolean;
    className?: string;
    toggleNetwork: () => void;
}> = ({ toggleNetwork, className, isNetwork }) => {
    const { ref: heightRef, height } = useGetComponentDimension();
    const classes = useStyles();
    return (
        <div className={classnames(className, classes.root)} ref={heightRef}>
            <div className={classes.actions}>
                <SearchBar className={classnames(classes.searchBar, { open: isNetwork })} />
                <Network className={classnames(classes.network, { open: isNetwork })} toggleNetwork={toggleNetwork} />
                <SettingsList />
            </div>
            <NetworkList
                actionHeight={height}
                className={classnames(classes.networkList, {
                    open: isNetwork
                })}
            />
        </div>
    );
};

export default ActionBar;
