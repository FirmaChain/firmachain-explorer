import React from 'react';
import BigDipperLogoRed from '@assets/big-dipper-red.svg?react';
import BigDipperLogoWhite from '@assets/big-dipper-white.svg?react';
import { Box } from '@mui/material';
import { useSettingsStore,  readTheme  } from '@zustand/settings';
import classnames from 'classnames';

import { Networks } from '@/components/nav/components';

const NetworkList: React.FC<{
    className?: string;
    actionHeight?: number;
}> = ({ className, actionHeight }) => {
    const theme = useSettingsStore(readTheme);

    return (
        <Box
            boxShadow={3}
            className={classnames(className)}
            sx={(theme) => ({
                background: theme.palette.background.paper,
                '& .logo': {
                    width: '216px',
                    padding: theme.spacing(2, 1.75, 2.5),
                    display: 'block'
                },
                '& .content': {
                    p: 3,
                    height: '400px',
                    overflow: 'auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: theme.spacing(3, 2)
                }
            })}
        >
            <div
                style={{
                    height: actionHeight
                }}
            >
                {theme === 'light' ? <BigDipperLogoRed className="logo" /> : <BigDipperLogoWhite className="logo" />}
            </div>
            <Networks className="content" />
        </Box>
    );
};

export default NetworkList;
