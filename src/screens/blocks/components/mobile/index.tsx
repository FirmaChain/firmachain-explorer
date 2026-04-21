import React from 'react';
import { AvatarName, Loading, SingleBlockMobile } from '@components';
import { Box, Divider, Typography } from '@mui/material';
import dayjs from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { BLOCK_DETAILS } from '@utils/go_to_page';
import classnames from 'classnames';
import numeral from 'numeral';
import { Link } from 'react-router';
import { List, useListRef, type RowComponentProps } from 'react-window';
import { useInfiniteLoader } from 'react-window-infinite-loader';

import { ItemType } from '../../types';

const ROW_HEIGHT = 295;

type MobileProps = {
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

const BlockRow = ({ index, style, items, itemCount, isRowLoaded }: RowComponentProps<RowProps>) => {
    if (!isRowLoaded(index)) {
        return (
            <div style={style}>
                <Box sx={{ height: '100%', px: 2, py: 2 }}>
                    <Loading />
                </Box>
            </div>
        );
    }

    const item = items[index];

    return (
        <div style={style}>
            <Box sx={{ height: '100%', px: 2, py: 2, boxSizing: 'border-box' }}>
                <SingleBlockMobile {...item} />
                {index !== itemCount - 1 && <Divider />}
            </Box>
        </div>
    );
};

const Mobile: React.FC<MobileProps> = ({ className, items, itemCount, loadMoreItems, isItemLoaded }) => {
    const listRef = useListRef();
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
                ending: 10
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

    return (
        <Box ref={ref} className={classnames(className)} sx={{ height: '100%', minHeight: 0 }}>
            {size.width > 0 && size.height > 0 ? (
                <List<RowProps>
                    className="List"
                    listRef={listRef}
                    rowComponent={BlockRow}
                    rowCount={itemCount}
                    rowHeight={ROW_HEIGHT}
                    rowProps={{
                        items: formattedItems,
                        itemCount,
                        isRowLoaded
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

export default Mobile;
