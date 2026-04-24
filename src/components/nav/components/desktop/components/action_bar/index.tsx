import React from 'react';
import { Box } from '@mui/material';
import classnames from 'classnames';

import { SearchBar } from '../../..';
import { Network, SettingsList } from './components';

const ActionBar: React.FC<{
    className?: string;
}> = ({ className }) => {
    return (
        <Box
            className={classnames(className)}
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
                '& .network': {
                    mr: 2
                }
            })}
        >
            <div className="actions">
                <SearchBar className="searchBar" />
                <Network className="network" />
                <SettingsList />
            </div>
        </Box>
    );
};

export default ActionBar;
