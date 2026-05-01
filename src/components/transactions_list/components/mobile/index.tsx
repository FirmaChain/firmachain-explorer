import React from 'react';
import { Loading, Result, SingleTransactionMobile } from '@components';
import { Box, Divider, Typography } from '@mui/material';
import dayjs from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { BLOCK_DETAILS, TRANSACTION_DETAILS } from '@utils/go_to_page';
import clsx from 'clsx';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { DataTable, type DataTableColumn } from '@/components/DataTable';
import { getMessageByType } from '@/components/msg/utils';

import type { TransactionsListState } from '../../types';

const ROW_HEIGHT = 300;

const Mobile: React.FC<TransactionsListState> = ({
    className,
    itemCount = 0,
    hasNextPage = false,
    isNextPageLoading = false,
    loadMoreItems,
    transactions = []
}) => {
    const { t } = useTranslation('transactions');

    const handleReachEnd = React.useCallback(() => {
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
            render: (transaction, context) => {
                const firstType = transaction?.type?.[0] ?? {};
                const messageType = {
                    ...firstType,
                    type: firstType['@type']
                };
                const tag = getMessageByType(messageType, true, t);

                return (
                    <SingleTransactionMobile
                        block={
                            <Link to={BLOCK_DETAILS(transaction.height)}>
                                <Typography variant="body1" component="span">
                                    {numeral(transaction.height).format('0,0')}
                                </Typography>
                            </Link>
                        }
                        hash={
                            <Link to={TRANSACTION_DETAILS(transaction.hash)}>
                                <Typography variant="body1" component="span">
                                    {getMiddleEllipsis(transaction.hash, {
                                        beginning: 15,
                                        ending: 5
                                    })}
                                </Typography>
                            </Link>
                        }
                        result={<Result success={transaction.success} />}
                        time={dayjs.utc(transaction.timestamp).fromNow()}
                        messages={numeral(transaction?.messages?.count ?? 0).format('0,0')}
                        type={
                            <Typography variant="body1" component="span">
                                {tag?.type ?? '-'}
                            </Typography>
                        }
                    />
                );
            }
        }
    ];

    return (
        <Box
            className={clsx(className)}
            sx={{
                height: '100%',
                width: '100%',
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column'
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

export default Mobile;
