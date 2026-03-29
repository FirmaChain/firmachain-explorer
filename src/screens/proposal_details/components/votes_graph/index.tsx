import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { Box, InfoPopover } from '@components';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Big from 'big.js';
import classnames from 'classnames';
import numeral from 'numeral';
import { Cell, Pie, PieChart } from 'recharts';

import { QuorumExplanation } from './components';
import { useVotesGraph } from './hooks';
import { formatGraphData } from './utils';

const VotesGraph: React.FC<ComponentDefault> = (props) => {
    const theme = useTheme();
    const { t } = useTranslation('proposals');
    const { state } = useVotesGraph();
    const { votes } = state;
    const { quorum } = state;

    const total = Big(votes.yes.value).plus(votes.no.value).plus(votes.veto.value).plus(votes.abstain.value);

    const formattedData = formatGraphData({
        data: votes,
        theme,
        total
    });
    const totalVotedFormat = numeral(total.toFixed(2)).format('0,0.[00]');
    const totalBondedFormat = numeral(state.bonded.value).format('0,0.[00]');
    const totalVotedPercent =
        total.gt(0) && state.bonded.value && !Big(state.bonded.value).eq(0)
            ? `${numeral(Big(total.toFixed(2)).div(state.bonded.value).times(100).toFixed(2)).format('0.[00]')}%`
            : '0%';

    return (
        <Box
            className={classnames(props.className)}
            sx={(theme) => ({
                position: 'relative',
                [theme.breakpoints.up('lg')]: {
                    display: 'flex',
                    alignItems: 'center'
                },
                '& .pie': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                '& .legend': {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    gap: theme.spacing(2),
                    [theme.breakpoints.up('md')]: {
                        gridTemplateColumns: 'repeat(2, 1fr)'
                    },
                    [theme.breakpoints.up('lg')]: {
                        flex: 1,
                        ml: 4
                    }
                },
                '& .total': {
                    [theme.breakpoints.up('md')]: {
                        gridColumn: '1/3'
                    }
                },
                '& .popOver': {
                    position: 'absolute',
                    top: theme.spacing(2),
                    right: theme.spacing(2)
                },
                '& .voteItem': {
                    position: 'relative',
                    pl: '10px',
                    '&::before': {
                        content: '""',
                        display: 'block',
                        width: '5px',
                        background: 'pink',
                        height: '100%',
                        position: 'absolute',
                        borderRadius: `${theme.shape.borderRadius}px`,
                        left: 0
                    }
                },
                '& .voteItem.yes::before': { background: theme.palette.custom.charts.four },
                '& .voteItem.no::before': { background: theme.palette.custom.charts.one },
                '& .voteItem.veto::before': { background: theme.palette.custom.charts.three },
                '& .voteItem.abstain::before': { background: theme.palette.custom.charts.two }
            })}
        >
            <div className="pie">
                <PieChart width={250} height={250}>
                    <Pie cx="50%" cy="50%" stroke="none" dataKey="value" data={formattedData} fill="#8884d8" isAnimationActive={false}>
                        {formattedData.map((entry, index) => {
                            return <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />;
                        })}
                    </Pie>
                </PieChart>
            </div>
            <div className="legend">
                <div className="total">
                    <Typography variant="caption">
                        {t('votedTotalCaption', {
                            totalVotedPercent
                        })}
                    </Typography>
                    <Typography variant="h2">
                        {totalVotedFormat} / {totalBondedFormat}
                    </Typography>
                </div>

                {formattedData
                    .filter((x) => x.name !== 'empty')
                    .map((x) => {
                        return (
                            <div key={x.name} className={classnames('voteItem', x.name)}>
                                <Typography variant="caption">
                                    {t(x.name)} ({x.percentage})
                                </Typography>
                                <Typography>{x.display}</Typography>
                            </div>
                        );
                    })}
            </div>
            <div className="popOver">
                <InfoPopover content={<QuorumExplanation quorum={quorum} />} />
            </div>
        </Box>
    );
};

export default VotesGraph;
