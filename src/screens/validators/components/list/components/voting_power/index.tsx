import React from 'react';
import { Typography } from '@material-ui/core';
import classnames from 'classnames';

import { useStyles } from './styles';

const VotingPower: React.FC<{
    className?: string;
    percentage: number;
    percentDisplay: string;
    content: string;
    topVotingPower: boolean;
}> = ({ className, percentage, content, percentDisplay }) => {
    const classes = useStyles(percentage, true);
    return (
        <div className={classnames(className, classes.root)}>
            <div className={classes.content}>
                <Typography variant="body1">{content}</Typography>
                <Typography variant="body1" className="percentage">
                    {percentDisplay}
                </Typography>
            </div>
            <div className={classes.chart}>
                <div className={classes.active} />
            </div>
        </div>
    );
};

export default VotingPower;
