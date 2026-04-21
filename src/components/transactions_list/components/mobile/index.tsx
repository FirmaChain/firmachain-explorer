import React from 'react';
import { Loading, Result, SingleTransactionMobile } from '@components';
import { Box, Divider, Typography } from '@mui/material';
import dayjs from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { BLOCK_DETAILS, TRANSACTION_DETAILS } from '@utils/go_to_page';
import classnames from 'classnames';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { List, useDynamicRowHeight } from 'react-window';
import { useInfiniteLoader } from 'react-window-infinite-loader';

import { getMessageByType } from '@/components/msg';

import type { TransactionsListState } from '../../types';

type TransactionItem = {
    block: React.ReactNode;
    hash: React.ReactNode;
    result: React.ReactNode;
    time: string;
    messages: string;
    type: React.ReactNode;
};

type RowExtraProps = {
    items: TransactionItem[];
    itemCount: number;
    isItemLoaded: (index: number) => boolean;
};

function useElementSize<T extends HTMLElement>() {
    const ref = React.useRef<T | null>(null);
    const [size, setSize] = React.useState({ width: 0, height: 0 });

    React.useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;

            setSize({
                width,
                height
            });
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    return { ref, size };
}

type RowProps = {
    index: number;
    style: React.CSSProperties;
} & Partial<RowExtraProps>;

const Row: React.FC<RowProps> = ({ index, style, items = [], itemCount = 0, isItemLoaded }) => {
    const item = items[index];
    const loaded = item ? true : (isItemLoaded?.(index) ?? false);

    return (
        <div style={style}>
            {!loaded || !item ? (
                <Loading />
            ) : (
                <>
                    <SingleTransactionMobile {...item} />
                    {index !== itemCount - 1 && <Divider />}
                </>
            )}
        </div>
    );
};

const Mobile: React.FC<TransactionsListState> = ({ className, itemCount, loadMoreItems, isItemLoaded, transactions }) => {
    const { t } = useTranslation('transactions');
    const { ref: containerRef, size } = useElementSize<HTMLDivElement>();

    const items = React.useMemo<TransactionItem[]>(() => {
        return transactions.map((transaction: any) => {
            const firstType = transaction?.type?.[0] ?? {};
            const messageType = {
                ...firstType,
                type: firstType['@type']
            };

            const tag = getMessageByType(messageType, true, t);

            return {
                block: (
                    <Link to={BLOCK_DETAILS(transaction.height)}>
                        <Typography variant="body1" component="span">
                            {numeral(transaction.height).format('0,0')}
                        </Typography>
                    </Link>
                ),
                hash: (
                    <Link to={TRANSACTION_DETAILS(transaction.hash)}>
                        <Typography variant="body1" component="span">
                            {getMiddleEllipsis(transaction.hash, {
                                beginning: 15,
                                ending: 5
                            })}
                        </Typography>
                    </Link>
                ),
                result: <Result success={transaction.success} />,
                time: dayjs.utc(transaction.timestamp).fromNow(),
                messages: numeral(transaction?.messages?.count ?? 0).format('0,0'),
                type: (
                    <Typography variant="body1" component="span">
                        {tag?.type ?? '-'}
                    </Typography>
                )
            };
        });
    }, [transactions, t]);

    const rowHeight = useDynamicRowHeight({
        defaultRowHeight: 88
    });

    const safeIsItemLoaded = React.useCallback(
        (index: number) => {
            if (transactions[index]) return true;
            return isItemLoaded?.(index) ?? false;
        },
        [transactions, isItemLoaded]
    );

    const safeLoadMoreItems = React.useCallback(
        (startIndex: number, stopIndex: number) => {
            return Promise.resolve(loadMoreItems?.(startIndex, stopIndex));
        },
        [loadMoreItems]
    );

    const onRowsRendered = useInfiniteLoader({
        isRowLoaded: safeIsItemLoaded,
        loadMoreRows: safeLoadMoreItems,
        rowCount: itemCount,
        threshold: 10,
        minimumBatchSize: 20
    });

    const rowProps = React.useMemo<RowExtraProps>(
        () => ({
            items,
            itemCount,
            isItemLoaded: safeIsItemLoaded
        }),
        [items, itemCount, safeIsItemLoaded]
    );

    const canRenderList = size.width > 0 && size.height > 0;

    return (
        <Box
            ref={containerRef}
            className={classnames(className)}
            sx={{
                height: '100%',
                width: '100%',
                minHeight: 0,
                overflow: 'hidden'
            }}
        >
            {!canRenderList ? (
                <Loading />
            ) : (
                <List
                    className="List"
                    height={size.height}
                    width={size.width}
                    rowCount={itemCount}
                    rowComponent={Row}
                    rowHeight={rowHeight}
                    rowProps={rowProps}
                    onRowsRendered={onRowsRendered}
                    overscanCount={4}
                />
            )}
        </Box>
    );
};

export default Mobile;
