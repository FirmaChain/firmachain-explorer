import React from 'react';
import { Box } from '@components';
import { chainConfig } from '@configs';
import { Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { formatNumber } from '@utils/format_token';
import { readMarket, useMarketStore } from '@zustand/market';
import Big from 'big.js';
import classnames from 'classnames';
import numeral from 'numeral';
import * as R from 'ramda';
import { useTranslation } from 'react-i18next';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { formatBalanceData } from './utils';

const Balance: React.FC<{
    className?: string;
    available: TokenUnit;
    delegate: TokenUnit;
    unbonding: TokenUnit;
    reward: TokenUnit;
    commission?: TokenUnit;
    total: TokenUnit;
}> = (props) => {
    const { t } = useTranslation('accounts');
    const theme = useTheme();
    const market = useMarketStore(readMarket);
    const formattedChartData = formatBalanceData(props);

    const empty = {
        key: 'empty',
        value: 2400,
        background: theme.palette.custom.charts.zero,
        display: ''
    };

    const backgrounds = [
        theme.palette.custom.charts.one,
        theme.palette.custom.charts.two,
        theme.palette.custom.charts.three,
        theme.palette.custom.charts.four,
        theme.palette.custom.charts.five
    ];

    const formatData = formattedChartData.map((x, i) => ({
        ...x,
        value: numeral(x.value).value(),
        background: backgrounds[i]
    }));

    const notEmpty = formatData.some((x) => Big(x.value).gt(0));

    const dataCount = formatData.filter((x) => Big(x.value).gt(0)).length;
    const data = notEmpty ? formatData : [...formatData, empty];
    const totalAmount = `$${numeral(
        Big(market.price || 0)
            .times(props.total.value)
            .toPrecision()
    ).format('0,0.00')}`;

    // format
    const totalDisplay = formatNumber(props.total.value, props.total.exponent);

    return (
        <Box
            className={classnames(props.className)}
            sx={(theme) => ({
                '& .MuiTypography-h2': { mb: 2 },
                [theme.breakpoints.up('lg')]: { display: 'flex', flexDirection: 'column' },
                '& .chart': {
                    height: '300px',
                    [theme.breakpoints.up('md')]: { height: '200px', width: '200px' },
                    [theme.breakpoints.up('lg')]: { height: '150px', width: '150px' }
                },
                '& .chartWrapper': {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    [theme.breakpoints.up('md')]: { flexDirection: 'row', alignItems: 'center' }
                },
                '& .legends': {
                    color: theme.palette.custom.fonts.fontTwo,
                    '& .legends__single--container': {
                        mb: 1,
                        [theme.breakpoints.up('md')]: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }
                    },
                    '& .single__label--container': { display: 'flex', alignItems: 'center', mb: 0.5 },
                    '& .legend-color': {
                        width: theme.spacing(1.75),
                        height: theme.spacing(1.75),
                        borderRadius: '2px',
                        mr: 1
                    },
                    [theme.breakpoints.up('md')]: { flex: 1, ml: 3 }
                },
                '& .divider': { my: 2 },
                '& .total .total__single--container': {
                    mb: 1,
                    '& .label': {
                        mb: 0.5,
                        color: theme.palette.custom.fonts.fontTwo,
                        [theme.breakpoints.up('md')]: { color: theme.palette.custom.fonts.fontOne }
                    },
                    [theme.breakpoints.up('md')]: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }
                },
                '& .total .total__secondary--container': {
                    [theme.breakpoints.up('md')]: { color: theme.palette.custom.fonts.fontTwo }
                }
            })}
        >
            <Typography variant="h2">{t('balance')}</Typography>
            <div className="chartWrapper">
                <div className="chart">
                    <ResponsiveContainer width="99%">
                        <PieChart>
                            <Pie
                                dataKey="value"
                                data={data}
                                isAnimationActive={false}
                                innerRadius="90%"
                                outerRadius="100%"
                                cornerRadius={40}
                                paddingAngle={dataCount > 1 ? 5 : 0}
                                fill="#82ca9d"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.background} stroke={entry.background} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="legends">
                    {data.map((x) => {
                        if (x.key.toLowerCase() === 'empty') {
                            return null;
                        }

                        return (
                            <div key={x.key} className="legends__single--container">
                                <div className="single__label--container">
                                    <div className="legend-color" style={{ background: x.background }} />
                                    <Typography variant="body1">{t(x.key)}</Typography>
                                </div>
                                <Typography variant="body1">{x.display}</Typography>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>
                <Divider className="divider" />
                <div className="total">
                    <div className="total__single--container">
                        <Typography variant="h3" className="label">
                            {t('total', {
                                unit: props.total.displayDenom.toUpperCase()
                            })}
                        </Typography>
                        <Typography variant="h3">{totalDisplay}</Typography>
                    </div>
                    <div className="total__secondary--container total__single--container">
                        <Typography variant="body1" className="label">
                            ${numeral(market.price).format('0,0.[00]', Math.floor)} /{' '}
                            {R.pathOr('', ['tokenUnits', chainConfig.primaryTokenUnit, 'display'], chainConfig).toUpperCase()}
                        </Typography>
                        <Typography variant="body1">{totalAmount}</Typography>
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default Balance;
