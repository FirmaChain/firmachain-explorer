import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { Box } from '@components';
import { Typography } from '@mui/material';

import { useGetStyles } from './styles';

const Logs: React.FC<
    {
        datas: null | any[];
        isEvents: boolean;
    } & ComponentDefault
> = ({ datas, isEvents = false }) => {
    const { classes } = useGetStyles();
    const { t } = useTranslation('transactions');
    return (
        <Box className={classes.root}>
            <Typography variant="h2" className={classes.header}>
                {isEvents ? t('events') : t('logs')}
            </Typography>
            <pre className={classes.pre}>
                <code>{JSON.stringify(datas, null, 4)}</code>
            </pre>
        </Box>
    );
};

export default Logs;
