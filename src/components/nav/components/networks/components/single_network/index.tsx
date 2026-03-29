import React from 'react';
import { Box, Typography } from '@mui/material';
import classnames from 'classnames';

const SingleNetwork = (props: { url: string; chainId: string; name: string; className: string }) => {
    const { url, chainId, name, className } = props;
    return (
        <a href={url} target="_blank" rel="noreferrer" style={{ width: '100%' }}>
            <Box
                sx={(theme) => ({
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    my: 3,
                    '& p': {
                        flex: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        mr: 1
                    },
                    '& .status': {
                        py: 0.5,
                        px: 1,
                        color: 'white',
                        borderRadius: `${theme.shape.borderRadius}px`,
                        background: theme.palette.custom.general.icon
                    },
                    '& .status.retired': {
                        background: theme.palette.custom.primaryData.four
                    },
                    '& .status.testnet': {
                        background: theme.palette.custom.primaryData.three
                    },
                    '& .status.mainnet': {
                        background: theme.palette.primary.main
                    }
                })}
            >
                <p>{chainId}</p>
                <Typography className={classnames(className, 'status')} component="div" variant="caption">
                    {name}
                </Typography>
            </Box>
        </a>
    );
};

export default SingleNetwork;
