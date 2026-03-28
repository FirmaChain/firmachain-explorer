import React from 'react';
import BigDipperLogoRed from '@assets/big-dipper-red.svg?react';
import BigDipperLogoWhite from '@assets/big-dipper-white.svg?react';
import FirmachainTitle from '@assets/firma_chain_title.svg?react';
import { LinearProgress } from '@mui/material';
// import { chainConfig } from '@configs';
import { readTheme } from '@recoil/settings';
// import * as R from 'ramda';
import { useRecoilValue } from 'recoil';

import { useStyles } from './styles';

const InitialLoad = () => {
    const theme = useRecoilValue(readTheme);
    const classes = useStyles();

    // const logoUrl = R.pathOr(chainConfig.logo.default, ['logo', theme], chainConfig);

    return (
        <div className={classes.root}>
            <div>
                <FirmachainTitle />
                {/* <img src={logoUrl} className={classes.logo} alt="logo" /> */}
                <LinearProgress className={classes.divider} />
                {theme === 'light' ? <BigDipperLogoRed style={{ height: '40px' }} /> : <BigDipperLogoWhite style={{ height: '40px' }} />}
            </div>
        </div>
    );
};

export default InitialLoad;
