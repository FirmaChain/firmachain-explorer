import React from 'react';
import { CircularProgress } from '@mui/material';
import classnames from 'classnames';

import { useStyles } from './styles';

const Loading: React.FC<{
    className?: string;
}> = ({ className }) => {
    const classes = useStyles();
    return (
        <div className={classnames(className, classes.root)}>
            <CircularProgress />
        </div>
    );
};

export default Loading;
