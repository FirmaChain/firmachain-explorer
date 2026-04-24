import BigDipperLogoRed from '@assets/big-dipper-red.svg';
import BigDipperLogoWhite from '@assets/big-dipper-white.svg';
import FirmachainTitle from '@assets/firma_chain_title.svg?react';
import { Box, LinearProgress } from '@mui/material';
import { readTheme, useSettingsStore } from '@zustand/settings';

const InitialLoad = () => {
    const theme = useSettingsStore(readTheme);

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
                    width: '100%'
                },
                [muiTheme.breakpoints.up('sm')]: {
                    '& .title-logo': {
                        width: '300px'
                    }
                }
            })}
        >
            <Box className="content">
                <FirmachainTitle className="title-logo" style={{ fill: theme === 'light' ? 'black' : 'white' }} />
                <LinearProgress sx={{ my: 2, width: '100%' }} />
                <img src={theme === 'light' ? BigDipperLogoRed : BigDipperLogoWhite} style={{ height: '40px' }} alt="big-dipper-logo" />
            </Box>
        </Box>
    );
};

export default InitialLoad;
