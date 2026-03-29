import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { NextSeo } from '@/adapters/seo/seo';
import { Box as ContentBox, Layout, LoadAndExist, TransactionListDetails, TransactionsList } from '@components';
import { Box as MuiBox } from '@mui/material';
import { readTx } from '@recoil/settings';
import { useRecoilValue } from 'recoil';

import { useTransactions } from './hooks';

const Transactions = () => {
    const txListFormat = useRecoilValue(readTx);
    const { t } = useTranslation('transactions');
    const { state, loadNextPage } = useTransactions();
    const loadMoreItems = state.isNextPageLoading ? () => null : loadNextPage;
    const isItemLoaded = (index: number) => !state.hasNextPage || index < state.items.length;
    const itemCount = state.hasNextPage ? state.items.length + 1 : state.items.length;
    return (
        <>
            <NextSeo
                title={t('transactions')}
                openGraph={{
                    title: t('transactions')
                }}
            />
            <Layout navTitle={t('transactions')}>
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
            </Layout>
        </>
    );
};

export default Transactions;
