import React from 'react';
import { Box } from '@components';
import { Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { BLOCK_DETAILS } from '@utils/go_to_page';
import clsx from 'clsx';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { VotingPowerType } from '../../types';

const VotingPower: React.FC<{
    className?: string;
    data: VotingPowerType;
    status: number;
}> = ({ className, data, status }) => {
    const { t } = useTranslation('validators');
    const votingPowerPercent = status === 3 ? numeral((data.self / 10 ** 6 / numeral(data.overall.value).value()) * 100) : numeral(0);
    const percentage = votingPowerPercent.format(0, Math.floor);
    const votingPower = status === 3 ? numeral(data.self / 10 ** 6).format('0,0') : '0';

    return (
        <Box
            className={clsx(className)}
            sx={(theme) => ({
                height: '100%',
                '& .MuiTypography-h2': { mb: 2 },
                '& .data': {
                    display: 'flex',
                    alignItems: 'flex-end',
                    '& .primary__data': {
                        color: theme.palette.primary.main,
                        mr: 2,
                        fontSize: '2.5rem'
                    }
                },
                '& .chart': {
                    display: 'flex',
                    height: '8px',
                    borderRadius: `${theme.shape.borderRadius}px`,
                    background: alpha(theme.palette.primary.main, 0.2),
                    overflow: 'hidden',
                    my: 2
                },
                '& .active': {
                    width: `${percentage}%`,
                    background: theme.palette.primary.main,
                    transition: '0.3s'
                },
                '& .item': {
                    '&:not(:last-child)': { mb: 2 },
                    '& .label': {
                        mb: 1,
                        color: theme.palette.custom.fonts.fontThree
                    },
                    '& p.value': {
                        color: theme.palette.custom.fonts.fontTwo
                    },
                    '& a': {
                        color: theme.palette.custom.fonts.highlight
                    },
                    [theme.breakpoints.up('md')]: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }
                }
            })}
        >
            <Typography variant="h2">{t('votingPower')}</Typography>
            <div className="data">
                <Typography variant="h3" className="primary__data">
                    {`${votingPowerPercent.format('0,0.00')}%`}
                </Typography>
                <Typography variant="body1">
                    {votingPower} / {numeral(data.overall.value).format('0,0')}
                </Typography>
            </div>
            <div className="chart">
                <div className="active" />
            </div>
            <div className="item">
                <Typography variant="h4" className="label">
                    {t('block')}
                </Typography>
                <Link to={BLOCK_DETAILS(data.height)}>
                    <Typography variant="body1" className="value" component="a">
                        {numeral(data.height).format('0,0')}
                    </Typography>
                </Link>
            </div>
            <div className="item">
                <Typography variant="h4" className="label">
                    {t('votingPower')}
                </Typography>
                <Typography variant="body1" className="value">
                    {votingPower}
                </Typography>
            </div>
            <div className="item">
                <Typography variant="h4" className="label">
                    {t('votingPowerPercent')}
                </Typography>
                <Typography variant="body1" className="value">
                    {`${votingPowerPercent.format('0,0.00')}%`}
                </Typography>
            </div>
        </Box>
    );
};

export default VotingPower;
