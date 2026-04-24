import React from 'react';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import clsx from 'clsx';

const VotingPower: React.FC<{
    className?: string;
    percentage: number;
    percentDisplay: string;
    content: string;
    topVotingPower: boolean;
}> = ({ className, percentage, content, percentDisplay }) => {
    const topVotingPower = true;
    return (
        <Box
            className={clsx(className)}
            sx={(theme) => ({
                '& .MuiTypography-body1': {
                    color: topVotingPower ? theme.palette.custom.fonts.fontFour : theme.palette.custom.fonts.fontTwo
                },
                '& .content': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 1,
                    '& .percentage': {
                        color: topVotingPower ? theme.palette.custom.fonts.fontFour : theme.palette.custom.primaryData.three
                    },
                    [theme.breakpoints.up('lg')]: {
                        mb: 0
                    }
                },
                '& .chart': {
                    display: 'flex',
                    height: '2px',
                    borderRadius: `${theme.shape.borderRadius}px`,
                    background: topVotingPower
                        ? alpha(theme.palette.custom.fonts.fontFour, 0.2)
                        : alpha(theme.palette.custom.primaryData.three, 0.2),
                    overflow: 'hidden'
                },
                '& .active': {
                    width: `${percentage}%`,
                    background: topVotingPower ? theme.palette.custom.fonts.fontFour : theme.palette.custom.primaryData.three
                }
            })}
        >
            <div className="content">
                <Typography variant="body1">{content}</Typography>
                <Typography variant="body1" className="percentage">
                    {percentDisplay}
                </Typography>
            </div>
            <div className="chart">
                <div className="active" />
            </div>
        </Box>
    );
};

export default VotingPower;
