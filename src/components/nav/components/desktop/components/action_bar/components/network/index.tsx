import React from 'react';
import { chainConfig } from '@configs';
import { ExpandMore } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useBigDipperNetworksStore,  readSelectedNetwork  } from '@zustand/big_dipper_networks';
import classnames from 'classnames';

const Network: React.FC<{
    className?: string;
    toggleNetwork: () => void;
}> = ({ className, toggleNetwork }) => {
    const selected = useBigDipperNetworksStore(readSelectedNetwork);

    return (
        <Box
            className={classnames(className)}
            onClick={toggleNetwork}
            role="button"
            sx={(theme) => ({
                p: theme.spacing(0.8, 2),
                background: theme.palette.background.paper,
                color: theme.palette.custom.fonts.fontTwo,
                borderRadius: `${theme.shape.borderRadius}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                '&:hover': {
                    cursor: 'pointer'
                },
                '& .MuiSvgIcon-root': {
                    ml: '0.1rem'
                },
                '& .icon': {
                    width: 24,
                    mr: 1
                }
            })}
        >
            <img src={chainConfig.icon} className="icon" alt="icon" />
            <Typography variant="body1">{selected}</Typography>
            <ExpandMore />
        </Box>
    );
};

export default Network;
