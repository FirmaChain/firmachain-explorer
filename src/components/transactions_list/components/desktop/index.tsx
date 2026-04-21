import React from 'react';
import { Loading, Result } from '@components';
import { useList, useListRow } from '@hooks';
import { Box, Typography } from '@mui/material';
import dayjs from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { BLOCK_DETAILS, TRANSACTION_DETAILS } from '@utils/go_to_page';
import classnames from 'classnames';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { List, type RowComponentProps } from 'react-window';
import { useInfiniteLoader } from 'react-window-infinite-loader';

import { getMessageByType } from '@/components/msg';

import { TransactionsListState } from '../../types';
import { columns } from './utils';

type ItemRow = {
    block: React.ReactNode;
    hash: React.ReactNode;
    result: React.ReactNode;
    time: React.ReactNode;
    messages: React.ReactNode;
    type: React.ReactNode;
};

type RowProps = {
    items: ItemRow[];
    isRowLoaded: (index: number) => boolean;
    width: number;
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

function getTemplateColumns(width: number) {
    const values = columns.map((_, index) => {
        if (index === 0) return Math.max(120, width * 0.12);
        if (index === 1) return Math.max(320, width * 0.34);
        return Math.max(120, width * 0.12);
    });

    return values.map((value) => `${Math.floor(value)}px`).join(' ');
}

const Row = ({ index, style, items, isRowLoaded, width, setRowHeight }: RowComponentProps<RowProps>) => {
    const { rowRef } = useListRow(index, setRowHeight);
    const templateColumns = getTemplateColumns(width);

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
                <Box
                    sx={(theme: any) => ({
                        display: 'grid',
                        gridTemplateColumns: templateColumns,
                        alignItems: 'center',
                        ...theme.mixins.tableCell,
                        color: theme.palette.custom.fonts.fontTwo,
                        py: 2
                    })}
                >
                    {columns.map(({ key, align }) => (
                        <Typography key={key} variant="body1" align={align} component="div">
                            {item[key as keyof ItemRow]}
                        </Typography>
                    ))}
                </Box>
            </div>
        </div>
    );
};

const DEFAULT_ROW_HEIGHT = 50;

const Desktop: React.FC<TransactionsListState> = ({ className, itemCount = 0, loadMoreItems, isItemLoaded, transactions = [] }) => {
    const { t } = useTranslation('transactions');
    const { ref, size } = useElementSize<HTMLDivElement>();
    const { listRef, setRowHeight } = useList();

    const items = React.useMemo<ItemRow[]>(() => {
        return transactions.map((x: any) => {
            const typeSource = {
                ...x.type[0],
                type: x.type[0]['@type']
            };
            const tag = getMessageByType(typeSource, true, t);

            return {
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
                            {getMiddleEllipsis(x.hash, {
                                beginning: 20,
                                ending: 15
                            })}
                        </Typography>
                    </Link>
                ),
                result: <Result success={x.success} />,
                time: dayjs.utc(x.timestamp).fromNow(),
                messages: numeral(x.messages.count).format('0,0'),
                type: (
                    <Typography variant="body1" component="a">
                        {tag.type}
                    </Typography>
                )
            };
        });
    }, [transactions, t]);

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

    const templateColumns = React.useMemo(() => getTemplateColumns(size.width), [size.width]);

    return (
        <Box
            ref={ref}
            className={classnames(className)}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0
            }}
        >
            <Box
                sx={(theme: any) => ({
                    height: 50,
                    display: 'grid',
                    gridTemplateColumns: templateColumns,
                    alignItems: 'center',
                    ...theme.mixins.tableCell,
                    flex: '0 0 auto'
                })}
            >
                {columns.map(({ key, align }) => (
                    <Typography key={key} variant="h4" align={align}>
                        {t(key)}
                    </Typography>
                ))}
            </Box>

            <Box sx={{ flex: '1 1 auto', minHeight: 0 }}>
                {size.width > 0 && size.height > 50 ? (
                    <List<RowProps>
                        className="scrollbar"
                        listRef={listRef}
                        rowComponent={Row}
                        rowCount={itemCount}
                        rowHeight={DEFAULT_ROW_HEIGHT}
                        rowProps={{
                            items,
                            isRowLoaded,
                            width: size.width,
                            setRowHeight
                        }}
                        onRowsRendered={onRowsRendered}
                        style={{
                            width: size.width,
                            height: size.height - 50
                        }}
                    />
                ) : (
                    <Loading />
                )}
            </Box>
        </Box>
    );
};

export default Desktop;
