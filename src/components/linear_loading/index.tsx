import React from 'react';
import { LinearProgress } from '@mui/material';
import classnames from 'classnames';

import { useStyles } from './styles';

const LinearLoading: React.FC<{
    className?: string;
}> = ({ className }) => {
    const classes = useStyles();
    return (
        <div className={classnames(className, classes.root)}>
            <LinearProgress />
        </div>
    );
};

export default LinearLoading;
