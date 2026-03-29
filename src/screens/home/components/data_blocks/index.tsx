import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { Box } from '@mui/material';
import { readMarket } from '@recoil/market';
import classnames from 'classnames';
import numeral from 'numeral';
import { useRecoilValue } from 'recoil';

import { SingleBlock } from './components';
import { useDataBlocks } from './hooks';

const DataBlocks: React.FC<{
    className?: string;
}> = ({ className }) => {
    const { t } = useTranslation('home');
    const { state } = useDataBlocks();
    const marketState = useRecoilValue(readMarket);

    const data = [
        {
            key: t('latestBlock'),
            value: numeral(state.blockHeight).format('0,0'),
            sx: (theme) => ({ background: theme.palette.custom.primaryData.one })
        },
        {
            key: t('averageBlockTime'),
            value: `${numeral(state.blockTime).format('0.00')} s`,
            sx: (theme) => ({ background: theme.palette.custom.primaryData.two })
        },
        // {
        //   key: t('price'),
        //   value: state.price !== null ? `$${numeral(state.price).format('0.00')}` : 'N/A',
        //   className: classes.price,
        // },
        {
            key: t('inflationRate'),
            value: `${numeral(Number(marketState.inflation) * 100).format('0.00')} %`,
            sx: (theme) => ({ background: theme.palette.custom.primaryData.three })
        },
        {
            key: t('activeValidators'),
            value: numeral(state.validators.active).format('0,0'),
            description: t('outOfValidators', {
                count: numeral(state.validators.total).format('0,0')
            }),
            sx: (theme) => ({ background: theme.palette.custom.primaryData.four })
        }
    ];

    return (
        <Box
            className={classnames(className)}
            sx={(theme) => ({
                display: 'grid',
                gap: theme.spacing(1),
                gridTemplateRows: 'auto',
                [theme.breakpoints.up('sm')]: {
                    gridTemplateColumns: 'repeat(2, 1fr)'
                },
                [theme.breakpoints.up('lg')]: {
                    gap: theme.spacing(2),
                    gridTemplateColumns: 'repeat(4, 1fr)'
                }
            })}
        >
            {data.map((x) => (
                <SingleBlock key={x.key} label={x.key} value={x.value} description={x.description} sx={x.sx} />
            ))}
        </Box>
    );
};

export default DataBlocks;
