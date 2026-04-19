import { Box as ContentBox, LoadAndExist, TransactionListDetails, TransactionsList } from '@components';
import { Box as MuiBox } from '@mui/material';
import { readTx, useSettingsStore } from '@zustand/settings';

import { useTransactions } from './hooks';

const Transactions = () => {
    const txListFormat = useSettingsStore(readTx);
    const { state, loadNextPage } = useTransactions();
    const loadMoreItems = state.isNextPageLoading ? () => null : loadNextPage;
    const isItemLoaded = (index: number) => !state.hasNextPage || index < state.items.length;
    const itemCount = state.hasNextPage ? state.items.length + 1 : state.items.length;

    return (
        <MuiBox
            sx={(theme: any) => ({
                ...theme.mixins.layout,
                '& a': {
                    color: theme.palette.custom.fonts.highlight
                }
            })}
        >
            <LoadAndExist exists={state.exists} loading={state.loading}>
                <ContentBox
                    sx={(theme) => ({
                        minHeight: '500px',
                        height: {
                            xs: '50vh',
                            lg: '100%'
                        },
                        [theme.breakpoints.up('lg')]: {
                            minHeight: '65vh'
                        }
                    })}
                >
                    {txListFormat === 'compact' ? (
                        <TransactionsList
                            transactions={state.items}
                            itemCount={itemCount}
                            hasNextPage={state.hasNextPage}
                            isNextPageLoading={state.isNextPageLoading}
                            loadNextPage={loadNextPage}
                            loadMoreItems={loadMoreItems}
                            isItemLoaded={isItemLoaded}
                        />
                    ) : (
                        <TransactionListDetails
                            transactions={state.items}
                            itemCount={itemCount}
                            hasNextPage={state.hasNextPage}
                            isNextPageLoading={state.isNextPageLoading}
                            loadNextPage={loadNextPage}
                            loadMoreItems={loadMoreItems}
                            isItemLoaded={isItemLoaded}
                        />
                    )}
                </ContentBox>
            </LoadAndExist>
        </MuiBox>
    );
};

export default Transactions;
