import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { Typography } from '@material-ui/core';
import classnames from 'classnames';

import { useStyles } from './styles';

const SingleTransactionMobile: React.FC<{
    className?: string;
    block: React.ReactNode;
    hash: React.ReactNode;
    time: string;
    messages: string;
    type: any;
    result?: React.ReactNode;
}> = ({ className, block, hash, time, messages, type, result }) => {
    const { t } = useTranslation('transactions');
    const classes = useStyles();

    return (
        <div className={classnames(className, classes.root)}>
            <div className={classes.flex}>
                <div className={classes.item}>
                    <Typography variant="h4" className="label" component="span">
                        {t('block')}
                    </Typography>
                    {block}
                </div>
                <div className={classes.item}>
                    <Typography variant="h4" className="label" component="span">
                        {t('type')}
                    </Typography>
                    <Typography variant="body1" className="value" component="span">
                        {type}
                    </Typography>
                </div>
            </div>
            <div className={classes.item}>
                <Typography variant="h4" className="label" component="span">
                    {t('hash')}
                </Typography>
                <Typography variant="body1" className="value" component="span">
                    {hash}
                </Typography>
            </div>
            <div className={classes.flex}>
                {!!messages && (
                    <div className={classes.item}>
                        <Typography variant="h4" className="label" component="span">
                            {t('messages')}
                        </Typography>
                        <Typography variant="body1" className="value" component="span">
                            {messages}
                        </Typography>
                    </div>
                )}
                <div className={classes.item}>
                    <Typography variant="h4" className="label" component="span">
                        {t('result')}
                    </Typography>
                    {result}
                </div>
            </div>
            <div className={classes.item}>
                <Typography variant="h4" className="label" component="span">
                    {t('time')}
                </Typography>
                <Typography variant="body1" className="value" component="span">
                    {time}
                </Typography>
            </div>
        </div>
    );
};

export default SingleTransactionMobile;
