import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { Typography } from '@material-ui/core';
import { Cancel, CheckCircle } from '@material-ui/icons';
import classnames from 'classnames';

import { useStyles } from './styles';

const Result: React.FC<{
    className?: string;
    success?: boolean;
}> = ({ className, success }) => {
    const { t } = useTranslation('common');
    const classes = useStyles();

    return (
        <div
            className={classnames(className, classes.root, {
                [classes.success]: success,
                [classes.fail]: !success
            })}
        >
            {success ? (
                <>
                    <CheckCircle />
                    <Typography variant="body1">{t('success')}</Typography>
                </>
            ) : (
                <>
                    <Cancel />
                    <Typography variant="body1">{t('fail')}</Typography>
                </>
            )}
        </div>
    );
};

export default Result;
