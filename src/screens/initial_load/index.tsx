import React from 'react';
import BigDipperLogoRed from '@assets/big-dipper-red.svg';
import BigDipperLogoWhite from '@assets/big-dipper-white.svg';
import FirmachainTitle from '@assets/firma_chain_title.svg?react';
import { Box, LinearProgress } from '@mui/material';
// import { chainConfig } from '@configs';
import { readTheme, useSettingsStore } from '@zustand/settings';

import { firmachainTitleLogoSx } from '@/styles/ui';

// import * as R from 'ramda';

const InitialLoad = () => {
    const theme = useSettingsStore(readTheme);

    // const logoUrl = R.pathOr(chainConfig.logo.default, ['logo', theme], chainConfig);

    return (
        <Box
            sx={(muiTheme) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                p: 6,
                '& .content': {
                    width: '100%',
                    maxWidth: '360px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                },
                '& .title-logo': {
                    width: '100%',
                    ...firmachainTitleLogoSx
                },
                [muiTheme.breakpoints.up('sm')]: {
                    '& .title-logo': {
                        width: '300px'
                    }
                }
            })}
        >
            <Box className="content">
                <FirmachainTitle className="title-logo" style={{ fill: 'white' }} />
                {/* <img src={logoUrl} alt="logo" /> */}
                <LinearProgress sx={{ my: 2, width: '100%' }} />
                <img src={theme === 'light' ? BigDipperLogoRed : BigDipperLogoWhite} style={{ height: '40px' }} alt="big-dipper-logo" />
            </Box>
        </Box>
    );
};

export default InitialLoad;
