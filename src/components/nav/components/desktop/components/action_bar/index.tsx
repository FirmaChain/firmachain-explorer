import React from 'react';
import { Box } from '@mui/material';
import clsx from 'clsx';

import SearchBar from '../../../seach_bar';
import Network from './components/network';
import SettingsList from './components/setting_list';

const ActionBar: React.FC<{
    className?: string;
}> = ({ className }) => {
    return (
        <Box
            className={clsx(className)}
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
