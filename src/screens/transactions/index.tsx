import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { NextSeo } from '@/adapters/seo/seo';
import { Box, Layout, LoadAndExist, TransactionListDetails, TransactionsList } from '@components';
import { readTx } from '@recoil/settings';
import { useRecoilValue } from 'recoil';

import { useTransactions } from './hooks';
import { useStyles } from './styles';

const Transactions = () => {
    const txListFormat = useRecoilValue(readTx);
    const { t } = useTranslation('transactions');
    const classes = useStyles();
    const { state, loadNextPage } = useTransactions();
    const loadMoreItems = state.isNextPageLoading ? () => null : loadNextPage;
    const isItemLoaded = (index) => !state.hasNextPage || index < state.items.length;
    const itemCount = state.hasNextPage ? state.items.length + 1 : state.items.length;
    return (
        <>
            <NextSeo
                title={t('transactions')}
                openGraph={{
                    title: t('transactions')
                }}
            />
            <Layout navTitle={t('transactions')} className={classes.root}>
                <LoadAndExist exists={state.exists} loading={state.loading}>
                    <Box className={classes.box}>
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
                    </Box>
                </LoadAndExist>
            </Layout>
        </>
    );
};

export default Transactions;
