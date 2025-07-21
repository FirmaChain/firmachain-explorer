import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Typography } from '@material-ui/core';
import { Box } from '@components';
import { useGetStyles } from './styles';

const Events: React.FC<{
  events: null | any[];
} & ComponentDefault> = ({ events }) => {
  const { classes } = useGetStyles();
  const { t } = useTranslation('transactions');
  return (
    <Box className={classes.root}>
      <Typography variant="h2" className={classes.header}>
        {t('events')}
      </Typography>
      <pre className={classes.pre}>
        <code>
          {JSON.stringify(events, null, 4)}
        </code>
      </pre>
    </Box>
  );
};

export default Events;
