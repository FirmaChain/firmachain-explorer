import React from 'react';
import { useGetComponentDimension } from '@hooks';
import { Box } from '@mui/material';
import classnames from 'classnames';

import { SearchBar } from '../../..';
import { Network, NetworkList, SettingsList } from './components';

const ActionBar: React.FC<{
    isNetwork: boolean;
    className?: string;
    toggleNetwork: () => void;
}> = ({ toggleNetwork, className, isNetwork }) => {
    const { ref: heightRef, height } = useGetComponentDimension();
    return (
        <Box
            className={classnames(className)}
            ref={heightRef}
            sx={(theme) => ({
                width: '100%',
                background: theme.palette.background.default,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                p: 3,
                '& .actions': {
                    width: '70%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    zIndex: 5000
                },
                '& .searchBar': {
                    flex: 1,
                    mr: 2
                },
                '& .searchBar.open .MuiInputBase-root': {
                    background: theme.palette.background.default
                },
                '& .network': {
                    mr: 2
                },
                '& .network.open': {
                    background: theme.palette.background.default
                },
                '& .networkList': {
                    width: '100%',
                    zIndex: 1201,
                    opacity: 0,
                    visibility: 'hidden',
                    transition: '0.2s ease-in-out',
                    position: 'fixed',
                    top: 0,
                    left: 0
                },
                '& .networkList.open': {
                    opacity: 1,
                    visibility: 'visible'
                }
            })}
        >
            <div className="actions">
                <SearchBar className={classnames('searchBar', { open: isNetwork })} />
                <Network className={classnames('network', { open: isNetwork })} toggleNetwork={toggleNetwork} />
                <SettingsList />
            </div>
            <NetworkList
                actionHeight={height}
                className={classnames('networkList', {
                    open: isNetwork
                })}
            />
        </Box>
    );
};

export default ActionBar;
