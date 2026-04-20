import React from 'react';
import { AvatarName, Box } from '@components';
import { Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useProfileRecoil } from '@zustand/profiles';
import classnames from 'classnames';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { PolarAngleAxis, RadialBar, RadialBarChart, Tooltip } from 'recharts';

import { useConsensus } from './hooks';

const Consensus: React.FC<{
    className?: string;
}> = ({ className }) => {
    const theme = useTheme();
    const { state } = useConsensus();
    const { t } = useTranslation('home');

    const data = [
        {
            value: state.roundCompletion,
            fill: theme.palette.primary.main
        }
    ];

    const circleSize = 200;
    const proposerProfile = useProfileRecoil(state.proposer);

    return (
        <Box
            className={classnames(className)}
            sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                overflow: 'auto',
                '& .content': {
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flexDirection: 'column'
                },
                '& .chart .recharts-radial-bar-background-sector': {
                    fill: alpha(theme.palette.primary.main, 0.4)
                },
                '& .info': {
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    color: theme.palette.custom.fonts.fontTwo,
                    '& > *': {
                        display: 'flex',
                        alignItems: 'center',
                        '& > *': {
                            width: '50%'
                        }
                    },
                    [theme.breakpoints.up('lg')]: {
                        marginBottom: 0
                    }
                }
            }}
        >
            <Typography variant="h2" sx={{ mb: 2 }}>
                {t('consensus')}
            </Typography>
            <div className="info">
                <div>
                    <Typography variant="caption" component="div" sx={{ color: theme.palette.custom.fonts.fontThree, mb: 0.5 }}>
                        {t('height')}
                    </Typography>
                    <Typography variant="caption" component="div" sx={{ color: theme.palette.custom.fonts.fontThree, mb: 0.5 }}>
                        {t('proposer')}
                    </Typography>
                </div>
                <div>
                    <Typography variant="h4">{numeral(state.height).format('0,0')}</Typography>
                    {state.proposer ? (
                        <AvatarName address={proposerProfile.address} imageUrl={proposerProfile.imageUrl} name={proposerProfile.name} />
                    ) : (
                        '-'
                    )}
                </div>
            </div>
            <div className="content">
                <RadialBarChart
                    className="chart"
                    width={circleSize}
                    height={circleSize}
                    cx={circleSize / 2}
                    cy={circleSize / 2}
                    innerRadius={90}
                    outerRadius={90}
                    barSize={10}
                    data={data}
                    startAngle={90}
                    endAngle={-270}
                >
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar background dataKey="value" cornerRadius={circleSize / 2} />
                    <Tooltip />
                    <text x={circleSize / 2} y={circleSize / 2} textAnchor="middle" dominantBaseline="middle" className="progress-label">
                        <tspan style={{ fontSize: '2rem', fill: theme.palette.custom.fonts.fontOne }}>
                            {t('step', {
                                step: numeral(state.step).format('0,0')
                            })}
                        </tspan>
                    </text>
                    <text x={circleSize / 2 - 32} y={circleSize / 2 + 35} style={{ fill: theme.palette.custom.fonts.fontTwo }}>
                        <tspan style={{ fontSize: '1rem', color: theme.palette.custom.fonts.fontOne }}>
                            {t('round', {
                                round: numeral(state.round).format('0,0')
                            })}
                        </tspan>
                    </text>
                </RadialBarChart>
            </div>
        </Box>
    );
};

export default Consensus;
