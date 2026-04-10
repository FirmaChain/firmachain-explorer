import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { TransactionListDetails, TransactionsList } from '@components';
import { Box as MuiBox, Typography } from '@mui/material';
import { useSettingsStore,  readTx  } from '@zustand/settings';

const Transactions: React.FC<
    ComponentDefault & {
        transactions: Transactions[];
    }
> = ({ className, transactions }) => {
    const txListFormat = useSettingsStore(readTx);
    const { t } = useTranslation('transactions');
    return (
        <MuiBox
            className={className}
            sx={{
                minHeight: '500px',
                height: { xs: '50vh', lg: '100%' },
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <MuiBox
                sx={(theme) => ({
                    mb: 2,
                    [theme.breakpoints.up('lg')]: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }
                })}
            >
                <Typography variant="h2">{t('transactions')}</Typography>
            </MuiBox>
            {txListFormat === 'compact' ? (
                <TransactionsList
                    transactions={transactions}
                    itemCount={transactions.length}
                    hasNextPage={false}
                    isNextPageLoading={false}
                    loadNextPage={() => null}
                    loadMoreItems={() => null}
                    isItemLoaded={() => true}
                />
            ) : (
                <TransactionListDetails
                    transactions={transactions}
                    itemCount={transactions.length}
                    hasNextPage={false}
                    isNextPageLoading={false}
                    loadNextPage={() => null}
                    loadMoreItems={() => null}
                    isItemLoaded={() => true}
                />
            )}
        </MuiBox>
    );
};

export default Transactions;
