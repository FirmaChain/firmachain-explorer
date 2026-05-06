import { useCallback } from 'react';
import { useScreenSize } from '@/hooks';
import { Loading, Result } from '@components';
import { Box, Typography } from '@mui/material';
import dayjs, { formatDayJs } from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { BLOCK_DETAILS, TRANSACTION_DETAILS } from '@utils/go_to_page';
import { readDate, useSettingsStore } from '@zustand/settings';
import clsx from 'clsx';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { DataTable, type DataTableColumn } from '@/components/DataTable';
import { getMessageByType } from '@/components/msg/utils';

import { TransactionsListDetailsState } from '../../types';
import { SingleTransaction } from './components';

const TransactionList = ({
    className,
    itemCount = 0,
    hasNextPage = false,
    isNextPageLoading = false,
    loadMoreItems,
    transactions = []
}: TransactionsListDetailsState) => {
    const { isMobile } = useScreenSize();
    const { t } = useTranslation('transactions');
    const dateFormat = useSettingsStore(readDate);

    const handleReachEnd = useCallback(() => {
        void Promise.resolve(
            loadMoreItems?.({
                startIndex: transactions.length,
                stopIndex: itemCount - 1
            })
        );
    }, [itemCount, loadMoreItems, transactions.length]);

    const columns: DataTableColumn<(typeof transactions)[number]>[] = [
        {
            key: 'transaction',
            header: '',
            render: (transaction) => (
                <SingleTransaction
                    block={
                        <Link to={BLOCK_DETAILS(transaction.height)}>
                            <Typography variant="body1">{numeral(transaction.height).format('0,0')}</Typography>
                        </Link>
                    }
                    hash={
                        <Link to={TRANSACTION_DETAILS(transaction.hash)}>
                            <Typography variant="body1">
                                {isMobile
                                    ? getMiddleEllipsis(transaction.hash, {
                                          beginning: 15,
                                          ending: 5
                                      })
                                    : transaction.hash}
                            </Typography>
                        </Link>
                    }
                    result={<Result success={transaction.success} />}
                    time={formatDayJs(dayjs.utc(transaction.timestamp), dateFormat)}
                    messageCount={numeral(transaction.messages.count).format('0,0')}
                    messages={transaction.messages.items.map((message) => getMessageByType(message, false, t))}
                />
            )
        }
    ];

    return (
        <Box
            className={clsx(className)}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                '& [data-datatable-row="true"]': {
                    height: 'auto'
                }
            }}
        >
            <DataTable
                data={transactions}
                columns={columns}
                getRowId={(row) => row.hash}
                height="100%"
                hideHeader
                hasMore={hasNextPage}
                isFetchingMore={isNextPageLoading}
                onReachEnd={handleReachEnd}
                fetchMoreIndicator={<Loading />}
            />
        </Box>
    );
};

export default TransactionList;
