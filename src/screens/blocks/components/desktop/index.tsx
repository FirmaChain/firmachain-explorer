import React from 'react';
import { AvatarName, Loading } from '@components';
import { useGrid, useList, useListRow } from '@hooks';
import { Box, Typography } from '@mui/material';
import dayjs from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { BLOCK_DETAILS } from '@utils/go_to_page';
import clsx from 'clsx';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { List, type RowComponentProps } from 'react-window';
import { useInfiniteLoader } from 'react-window-infinite-loader';

import { ItemType } from '../../types';
import { columns } from './utils';

type DesktopProps = {
    className?: string;
    items: ItemType[];
    itemCount: number;
    loadMoreItems: (params: { startIndex: number; stopIndex: number }) => Promise<void> | void;
    isItemLoaded?: (index: number) => boolean;
};

type FormattedItem = {
    height: React.ReactNode;
    txs: string;
    time: string;
    proposer: React.ReactNode;
    hash: string;
};

type RowProps = {
    items: FormattedItem[];
    itemCount: number;
    isRowLoaded: (index: number) => boolean;
    setRowHeight: (index: number, size: number) => void;
    templateColumns: string;
};

function useElementSize<T extends HTMLElement>() {
    const ref = React.useRef<T | null>(null);
    const [size, setSize] = React.useState({ width: 0, height: 0 });

    React.useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new ResizeObserver(([entry]) => {
            setSize({
                width: entry.contentRect.width,
                height: entry.contentRect.height
            });
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    return { ref, size };
}

const TableRow = ({ index, style, items, itemCount, isRowLoaded, setRowHeight, templateColumns }: RowComponentProps<RowProps>) => {
    const { rowRef } = useListRow(index, setRowHeight);

    if (!isRowLoaded(index)) {
        return (
            <div style={style}>
                <div ref={rowRef}>
                    <Loading />
                </div>
            </div>
        );
    }

    const item = items[index];

    return (
        <div style={style}>
            <div ref={rowRef}>
                <Box
                    sx={(theme) => ({
                        display: 'grid',
                        gridTemplateColumns: templateColumns,
                        ...theme.mixins.tableCell,
                        color: theme.palette.custom.fonts.fontTwo
                    })}
                >
                    {columns.map(({ key, align }) => (
                        <Typography key={key} variant="body1" align={align} component="div">
                            {item[key as keyof FormattedItem]}
                        </Typography>
                    ))}
                </Box>
            </div>
        </div>
    );
};

const DEFAULT_ROW_HEIGHT = 50;

const Desktop: React.FC<DesktopProps> = ({ className, items, itemCount, loadMoreItems, isItemLoaded }) => {
    const { t } = useTranslation('blocks');
    const { getColumnWidth } = useGrid(columns);
    const { listRef, setRowHeight } = useList();
    const { ref, size } = useElementSize<HTMLDivElement>();

    const formattedItems = React.useMemo<FormattedItem[]>(() => {
        return items.map((x) => ({
            height: (
                <Link to={BLOCK_DETAILS(x.height)}>
                    <Typography variant="body1" className="value" component="a">
                        {numeral(x.height).format('0,0')}
                    </Typography>
                </Link>
            ),
            txs: numeral(x.txs).format('0,0'),
            time: dayjs.utc(x.timestamp).fromNow(),
            proposer: <AvatarName address={x.proposer.address} imageUrl={x.proposer.imageUrl} name={x.proposer.name} />,
            hash: getMiddleEllipsis(x.hash, {
                beginning: 13,
                ending: 15
            })
        }));
    }, [items]);

    const isRowLoaded = React.useCallback(
        (index: number) => {
            return isItemLoaded?.(index) ?? false;
        },
        [isItemLoaded]
    );

    const loadMoreRows = React.useCallback(
        async (startIndex: number, stopIndex: number): Promise<void> => {
            await Promise.resolve(loadMoreItems({ startIndex, stopIndex }));
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

    const templateColumns = React.useMemo(() => {
        if (size.width === 0) return '';

        return columns.map((_, index) => `${Math.floor(getColumnWidth(size.width, index))}px`).join(' ');
    }, [getColumnWidth, size.width]);

    return (
        <Box
            ref={ref}
            className={clsx(className)}
            sx={{
                height: '100%',
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {size.width > 0 && size.height > 0 ? (
                <>
                    <Box
                        sx={(theme) => ({
                            height: 50,
                            flex: '0 0 auto',
                            display: 'grid',
                            gridTemplateColumns: templateColumns,
                            ...theme.mixins.tableCell
                        })}
                    >
                        {columns.map(({ key, align }) => (
                            <Typography key={key} variant="h4" align={align}>
                                {t(key)}
                            </Typography>
                        ))}
                    </Box>

                    <Box sx={{ flex: '1 1 auto', minHeight: 0 }}>
                        <List<RowProps>
                            className="scrollbar"
                            listRef={listRef}
                            rowComponent={TableRow}
                            rowCount={itemCount}
                            rowHeight={DEFAULT_ROW_HEIGHT}
                            rowProps={{
                                items: formattedItems,
                                itemCount,
                                isRowLoaded,
                                setRowHeight,
                                templateColumns
                            }}
                            onRowsRendered={onRowsRendered}
                            style={{
                                width: size.width,
                                height: size.height - 50
                            }}
                        />
                    </Box>
                </>
            ) : null}
        </Box>
    );
};

export default Desktop;
