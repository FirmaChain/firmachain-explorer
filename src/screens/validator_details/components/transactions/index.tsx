import React from 'react';
import { Box, TransactionListDetails, TransactionsList } from '@components';
import { Box as MuiBox, Typography } from '@mui/material';
import { readTx, useSettingsStore } from '@zustand/settings';
import { useTranslation } from 'react-i18next';

import { useTransactions } from './hooks';

const Transactions: React.FC<ComponentDefault> = (props) => {
    const txListFormat = useSettingsStore(readTx);
    const { t } = useTranslation('validators');

    const { state, loadNextPage } = useTransactions();

    const loadMoreItems = state.isNextPageLoading ? () => null : loadNextPage;
    const isItemLoaded = (index: number) => !state.hasNextPage || index < state.data.length;
    const itemCount = state.hasNextPage ? state.data.length + 1 : state.data.length;

    return (
        <Box className={props.className}>
            <Typography variant="h2" sx={{ mb: 2 }}>
                {t('transactions')}
            </Typography>
            <MuiBox
                sx={{
                    minHeight: { xs: '500px', lg: '65vh' },
                    height: '50vh'
                }}
            >
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
            </MuiBox>
        </Box>
    );
};

export default Transactions;
