import React from 'react';
import { Box, CustomToolTip } from '@components';
import { chainConfig } from '@configs';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import clsx from 'clsx';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import { useTokenomics } from './hooks';

const Tokenomics: React.FC<{
    className?: string;
}> = ({ className }) => {
    const { t } = useTranslation('home');
    const theme = useTheme();
    const { state } = useTokenomics();

    const data = [
        {
            legendKey: 'bonded',
            percentKey: 'bondedPercent',
            value: numeral(state.bonded).format('0,0'),
            rawValue: state.bonded,
            percent: `${numeral((state.bonded * 100) / state.total).format('0.00')}%`,
            fill: theme.palette.custom.tokenomics.one
        },
        {
            legendKey: 'unbonded',
            percentKey: 'unbondedPercent',
            value: numeral(state.unbonded).format('0,0'),
            rawValue: state.unbonded,
            percent: `${numeral((state.unbonded * 100) / state.total).format('0.00')}%`,
            fill: theme.palette.custom.tokenomics.two
        },
        {
            legendKey: 'unbonding',
            value: numeral(state.unbonding).format('0,0'),
            rawValue: state.unbonding,
            percent: `${numeral((state.unbonding * 100) / state.total).format('0.00')}%`,
            fill: theme.palette.custom.tokenomics.three
        }
    ];

    return (
        <Box
            className={clsx(className)}
            sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                '& .label': {
                    marginBottom: theme.spacing(2)
                },
                '& .data': {
                    display: 'flex',
                    '& .data__item': {
                        width: '50%',
                        whiteSpace: 'pre-wrap',
                        '& h4': {
                            color: theme.palette.custom.fonts.fontTwo
                        },
                        '& .MuiTypography-caption': {
                            color: theme.palette.custom.fonts.fontThree
                        }
                    }
                },
                '& .content': {
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flexDirection: 'column'
                },
                '& .legends': {
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    width: '100%',
                    '& .MuiTypography-caption': {
                        color: theme.palette.custom.fonts.fontThree
                    },
                    '& .legends__item': {
                        width: '50%',
                        '&:before': {
                            content: '""',
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            marginRight: '5px'
                        },
                        '&:first-child:before': {
                            background: theme.palette.custom.tokenomics.one
                        },
                        '&:nth-child(2):before': {
                            background: theme.palette.custom.tokenomics.two
                        },
                        '&:last-child:before': {
                            background: theme.palette.custom.tokenomics.three
                        },
                        '& .caption__percent': {
                            color: theme.palette.custom.fonts.fontThree
                        }
                    }
                }
            }}
        >
            <Typography variant="h2" className="label">
                {t('tokenomics')}
            </Typography>
            <div className="data">
                {data.slice(0, 2).map((x) => (
                    <div className="data__item" key={x.percentKey}>
                        <Typography variant="h4">
                            {x.value} {chainConfig.tokenUnits[state.denom]?.display?.toUpperCase()}
                        </Typography>
                        <Typography variant="caption">
                            {t(x.percentKey, {
                                percent: x.percent
                            })}
                        </Typography>
                    </div>
                ))}
            </div>
            <div className="content">
                <PieChart width={200} height={100} cy={100}>
                    <Pie
                        stroke="none"
                        // cornerRadius={40}
                        cy={90}
                        data={data}
                        startAngle={180}
                        endAngle={0}
                        // innerRadius={79}
                        outerRadius={90}
                        fill="#8884d8"
                        // paddingAngle={-10}
                        dataKey="rawValue"
                        // stroke={theme.palette.background.paper}
                        // strokeWidth={3}
                        isAnimationActive={false}
                    >
                        {data.map((entry) => {
                            return <Cell key={entry.legendKey} fill={entry.fill} />;
                        })}
                    </Pie>
                    <Tooltip
                        content={
                            <CustomToolTip>
                                {(x) => {
                                    return (
                                        <>
                                            <Typography variant="caption">{t(x.legendKey)}</Typography>
                                            <Typography variant="body1">
                                                {x.value} ({x.percent})
                                            </Typography>
                                        </>
                                    );
                                }}
                            </CustomToolTip>
                        }
                    />
                </PieChart>

                <div className="legends">
                    {data.map((x) => {
                        return (
                            <div className="legends__item" key={x.legendKey}>
                                <Typography variant="caption">{t(x.legendKey)}</Typography>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Box>
    );
};

export default Tokenomics;
