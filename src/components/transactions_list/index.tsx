import React from 'react';
import dynamic from '@/adapters/routing/dynamic';
import { NoData } from '@components';
import { Box } from '@mui/material';
import { useScreenSize } from '@hooks';

import { TransactionsListState } from './types';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const TransactionsList: React.FC<TransactionsListState> = (props) => {
    const { isDesktop } = useScreenSize();
    // setting fallback values
    const {
        hasNextPage = false,
        isNextPageLoading = false,
        loadNextPage = () => null,
        loadMoreItems = () => null,
        isItemLoaded = () => true,
        itemCount,
        transactions
    } = props;

    const formatProps = {
        hasNextPage,
        isNextPageLoading,
        isItemLoaded,
        loadNextPage,
        loadMoreItems,
        itemCount,
        transactions
    };

    if (!itemCount) {
        return <NoData />;
    }

    return (
        <>
            {isDesktop ? (
                <Box
                    sx={{
                        display: { xs: 'none', lg: 'block' },
                        height: '100%'
                    }}
                >
                    <Desktop {...formatProps} />
                </Box>
            ) : (
                <Box
                    sx={{
                        display: { lg: 'none' },
                        height: '100%'
                    }}
                >
                    <Mobile {...formatProps} />
                </Box>
            )}
        </>
    );
};

export default TransactionsList;
