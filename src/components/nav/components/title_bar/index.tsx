import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { chainConfig } from '@configs';
import { Box, Typography } from '@mui/material';
import { useMarketStore,  readMarket  } from '@zustand/market';
import { useSettingsStore,  readTheme  } from '@zustand/settings';
import classnames from 'classnames';
import * as R from 'ramda';

import { formatMarket } from './utils';

const TitleBar: React.FC<{
    className?: string;
    title: string;
}> = ({ className, title }) => {
    const theme = useSettingsStore(readTheme);
    const { t } = useTranslation('common');
    const marketState = useMarketStore(readMarket);

    const market = formatMarket(marketState);

    const logoUrl = R.pathOr(chainConfig.logo.default, ['logo', theme], chainConfig);

    return (
        <Box
            className={classnames(className)}
            sx={(theme) => ({
                p: theme.spacing(1, 2),
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'flex-start',
                [theme.breakpoints.up('lg')]: {
                    p: theme.spacing(1, 3),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '100%',
                    '& .MuiTypography-h1': {
                        lineHeight: 1,
                        alignSelf: 'flex-end'
                    }
                },
                '& .logo': {
                    height: '56px'
                },
                '& .content': {
                    width: '100%',
                    background: theme.palette.custom.general.surfaceOne,
                    mt: 2,
                    borderRadius: `${theme.shape.borderRadius}px`,
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    [theme.breakpoints.up('md')]: {
                        flexDirection: 'row'
                    },
                    [theme.breakpoints.up('lg')]: {
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: 0,
                        width: '70%',
                        p: theme.spacing(1, 3),
                        flexWrap: 'nowrap'
                    }
                },
                '& .item': {
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                    p: 1,
                    width: '100%',
                    '& .label': {
                        mr: 1
                    },
                    [theme.breakpoints.up('sm')]: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    },
                    [theme.breakpoints.up('md')]: {
                        width: '50%'
                    },
                    [theme.breakpoints.up('lg')]: {
                        p: 0,
                        width: 'auto'
                    }
                }
            })}
        >
            {title ? <Typography variant="h1">{title}</Typography> : <img src={logoUrl} className="logo" alt="logo" />}
            <div className="content">
                {market.map((x) => (
                    <div key={x.key} className="item">
                        <Typography variant="body1" className="label">
                            {t(x.key)}
                        </Typography>
                        <Typography variant="body1">{x.data}</Typography>
                    </div>
                ))}
            </div>
        </Box>
    );
};

export default TitleBar;
