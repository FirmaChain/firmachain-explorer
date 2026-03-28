import React from 'react';
import BigDipperLogoRed from '@assets/big-dipper-red.svg?react';
import BigDipperLogoWhite from '@assets/big-dipper-white.svg?react';
import { Box } from '@material-ui/core';
import { readTheme } from '@recoil/settings/selectors';
import classnames from 'classnames';
import { useRecoilValue } from 'recoil';

import { Networks } from '@/components/nav/components';

import { useStyles } from './styles';

const NetworkList: React.FC<{
    className?: string;
    actionHeight?: number;
}> = ({ className, actionHeight }) => {
    const classes = useStyles();
    const theme = useRecoilValue(readTheme);

    return (
        <Box boxShadow={3} className={classnames(className, classes.root)}>
            <div
                style={{
                    height: actionHeight
                }}
            >
                {theme === 'light' ? <BigDipperLogoRed /> : <BigDipperLogoWhite />}
            </div>
            <Networks className={classes.content} />
        </Box>
    );
};

export default NetworkList;
