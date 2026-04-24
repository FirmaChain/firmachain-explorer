import React from 'react';
import { Loading, Result } from '@components';
import { useList, useListRow, useScreenSize } from '@hooks';
import { Box, Typography } from '@mui/material';
import dayjs, { formatDayJs } from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { BLOCK_DETAILS, TRANSACTION_DETAILS } from '@utils/go_to_page';
import { readDate, useSettingsStore } from '@zustand/settings';
import clsx from 'clsx';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { List, type RowComponentProps } from 'react-window';
import { useInfiniteLoader } from 'react-window-infinite-loader';

import { getMessageByType } from '@/components/msg/utils';

import { TransactionsListDetailsState } from '../../types';
import { SingleTransaction } from './components';

type TransactionItem = {
    block: React.ReactNode;
    hash: React.ReactNode;
    result: React.ReactNode;
    time: React.ReactNode;
    messageCount: string;
    messages: ReturnType<typeof getMessageByType>[];
};

type RowProps = {
    items: TransactionItem[];
    itemCount: number;
    isRowLoaded: (index: number) => boolean;
    setRowHeight: (index: number, size: number) => void;
};

function useElementSize<T extends HTMLElement>() {
    const ref = React.useRef<T | null>(null);
    const [size, setSize] = React.useState({ width: 0, height: 0 });

    React.useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;

        const updateSize = () => {
            const rect = element.getBoundingClientRect();

            setSize((prev) => {
                const next = {
                    width: Math.ceil(rect.width),
                    height: Math.ceil(rect.height)
                };

                if (prev.width === next.width && prev.height === next.height) {
                    return prev;
                }

                return next;
            });
        };

        updateSize();

        const observer = new ResizeObserver(() => {
            updateSize();
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    return { ref, size };
}

const TransactionRow = ({ index, style, items, isRowLoaded, setRowHeight }: RowComponentProps<RowProps>) => {
    const { rowRef } = useListRow(index, setRowHeight);

    if (!isRowLoaded(index)) {
        return (
            <div style={style}>
                <div ref={rowRef}>
                    <Box sx={{ py: 2 }}>
                        <Loading />
                    </Box>
                </div>
            </div>
        );
    }

    const item = items[index];

    return (
        <div style={style}>
            <div ref={rowRef}>
                <Box sx={{ py: 2 }}>
                    <SingleTransaction {...item} />
                </Box>
            </div>
        </div>
    );
};

const TransactionList: React.FC<TransactionsListDetailsState> = ({
    className,
    itemCount = 0,
    loadMoreItems,
    isItemLoaded,
    transactions = []
}) => {
    const { isMobile } = useScreenSize();
    const { t } = useTranslation('transactions');
    const dateFormat = useSettingsStore(readDate);

    const { listRef, getRowHeight, setRowHeight } = useList();
    const { ref, size } = useElementSize<HTMLDivElement>();

    const items = React.useMemo<TransactionItem[]>(() => {
        return transactions.map((x) => ({
            block: (
                <Link to={BLOCK_DETAILS(x.height)}>
                    <Typography variant="body1" component="a">
                        {numeral(x.height).format('0,0')}
                    </Typography>
                </Link>
            ),
            hash: (
                <Link to={TRANSACTION_DETAILS(x.hash)}>
                    <Typography variant="body1" component="a">
                        {isMobile
                            ? getMiddleEllipsis(x.hash, {
                                  beginning: 15,
                                  ending: 5
                              })
                            : x.hash}
                    </Typography>
                </Link>
            ),
            result: <Result success={x.success} />,
            time: formatDayJs(dayjs.utc(x.timestamp), dateFormat),
            messageCount: numeral(x.messages.count).format('0,0'),
            messages: x.messages.items.map((message) => getMessageByType(message, false, t))
        }));
    }, [transactions, isMobile, dateFormat, t]);

    const isRowLoaded = React.useCallback(
        (index: number) => {
            return isItemLoaded?.(index) ?? false;
        },
        [isItemLoaded]
    );

    const loadMoreRows = React.useCallback(
        async (startIndex: number, stopIndex: number): Promise<void> => {
            await Promise.resolve(loadMoreItems?.({ startIndex, stopIndex }));
        },
        [loadMoreItems]
    );

    const onRowsRendered = useInfiniteLoader({
        isRowLoaded,
        loadMoreRows,
        rowCount: itemCount,
        threshold: 15,
        minimumBatchSize: 10
    });

    return (
        <Box ref={ref} className={clsx(className)} sx={{ height: '100%', minHeight: 0 }}>
            {size.width > 0 && size.height > 0 ? (
                <List<RowProps>
                    className="List"
                    listRef={listRef}
                    rowComponent={TransactionRow}
                    rowCount={itemCount}
                    rowHeight={getRowHeight}
                    rowProps={{
                        items,
                        itemCount,
                        isRowLoaded,
                        setRowHeight
                    }}
                    onRowsRendered={onRowsRendered}
                    style={{
                        width: size.width,
                        height: size.height
                    }}
                />
            ) : null}
        </Box>
    );
};

export default TransactionList;
