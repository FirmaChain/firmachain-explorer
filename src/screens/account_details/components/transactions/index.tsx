import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { Box, TransactionListDetails, TransactionsList } from '@components';
import { Typography } from '@material-ui/core';
import { readTx } from '@recoil/settings';
import classnames from 'classnames';
import { useRecoilValue } from 'recoil';

import { useTransactions } from './hooks';
import { useStyles } from './styles';

const Transactions: React.FC<ComponentDefault> = (props) => {
    const txListFormat = useRecoilValue(readTx);
    const classes = useStyles();
    const { t } = useTranslation('validators');

    const { state, loadNextPage } = useTransactions();

    const loadMoreItems = state.isNextPageLoading ? () => null : loadNextPage;
    const isItemLoaded = (index) => !state.hasNextPage || index < state.data.length;
    const itemCount = state.hasNextPage ? state.data.length + 1 : state.data.length;

    return (
        <Box className={classnames(props.className, classes.root)}>
            <Typography variant="h2">{t('transactions')}</Typography>
            <div className={classes.list}>
                {txListFormat === 'compact' ? (
                    <TransactionsList
                        transactions={state.data}
                        itemCount={itemCount}
                        hasNextPage={state.hasNextPage}
                        isNextPageLoading={state.isNextPageLoading}
                        loadNextPage={loadNextPage}
                        loadMoreItems={loadMoreItems}
                        isItemLoaded={isItemLoaded}
                    />
                ) : (
                    <TransactionListDetails
                        transactions={state.data}
                        itemCount={itemCount}
                        hasNextPage={state.hasNextPage}
                        isNextPageLoading={state.isNextPageLoading}
                        loadNextPage={loadNextPage}
                        loadMoreItems={loadMoreItems}
                        isItemLoaded={isItemLoaded}
                    />
                )}
            </div>
        </Box>
    );
};

export default Transactions;
