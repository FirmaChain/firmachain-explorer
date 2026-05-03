import { NoData } from '@components';
import { useScreenSize } from '@hooks';
import { Box } from '@mui/material';

import Desktop from './components/desktop';
import Mobile from './components/mobile';
import { TransactionsListState } from './types';

const TransactionsList = (props: TransactionsListState) => {
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
                        height: '100%',
                        minHeight: 0
                    }}
                >
                    <Desktop {...formatProps} />
                </Box>
            ) : (
                <Box
                    sx={{
                        display: { lg: 'none' },
                        height: '100%',
                        minHeight: 0,
                        width: '100%'
                    }}
                >
                    <Mobile {...formatProps} />
                </Box>
            )}
        </>
    );
};

export default TransactionsList;
