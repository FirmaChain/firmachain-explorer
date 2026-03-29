import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import Link from '@/adapters/routing/link';
import { mergeRefs } from '@/utils/merge_refs';
import { AvatarName, Loading } from '@components';
import { useGrid } from '@hooks';
import { Box, Typography } from '@mui/material';
import dayjs from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { BLOCK_DETAILS } from '@utils/go_to_page';
import classnames from 'classnames';
import numeral from 'numeral';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { ItemType } from '../../types';
import { columns } from './utils';

const Desktop: React.FC<{
    className?: string;
    items: ItemType[];
    itemCount: number;
    loadMoreItems: (any) => void;
    isItemLoaded?: (index: number) => boolean;
}> = ({ className, items, itemCount, loadMoreItems, isItemLoaded }) => {
    const { t } = useTranslation('blocks');
    const { gridRef, columnRef, onResize, getColumnWidth, getRowHeight } = useGrid(columns);

    const formattedItems = items.map((x) => {
        return {
            height: (
                <Link href={BLOCK_DETAILS(x.height)} passHref>
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
        };
    });

    return (
        <Box className={classnames(className)} sx={{ height: '100%' }}>
            <AutoSizer onResize={onResize}>
                {({ height, width }) => {
                    return (
                        <>
                            {/* ======================================= */}
                            {/* Table Header */}
                            {/* ======================================= */}
                            <Grid
                                ref={columnRef}
                                columnCount={columns.length}
                                columnWidth={(index) => getColumnWidth(width, index)}
                                height={50}
                                rowCount={1}
                                rowHeight={() => 50}
                                width={width}
                            >
                                {({ columnIndex, style }) => {
                                    const { key, align } = columns[columnIndex];

                                    return (
                                        <Box
                                            style={style}
                                            sx={(theme: any) => ({
                                                ...theme.mixins.tableCell
                                            })}
                                        >
                                            <Typography variant="h4" align={align}>
                                                {t(key)}
                                            </Typography>
                                        </Box>
                                    );
                                }}
                            </Grid>
                            {/* ======================================= */}
                            {/* Table Body */}
                            {/* ======================================= */}
                            <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
                                {({ onItemsRendered, ref }) => {
                                    return (
                                        <Grid
                                            onItemsRendered={({
                                                visibleRowStartIndex,
                                                visibleRowStopIndex,
                                                overscanRowStopIndex,
                                                overscanRowStartIndex
                                            }) => {
                                                onItemsRendered({
                                                    overscanStartIndex: overscanRowStartIndex,
                                                    overscanStopIndex: overscanRowStopIndex,
                                                    visibleStartIndex: visibleRowStartIndex,
                                                    visibleStopIndex: visibleRowStopIndex
                                                });
                                            }}
                                            ref={mergeRefs(gridRef, ref)}
                                            columnCount={columns.length}
                                            columnWidth={(index) => getColumnWidth(width, index)}
                                            height={height - 50}
                                            rowCount={itemCount}
                                            rowHeight={getRowHeight}
                                            width={width}
                                            className="scrollbar"
                                        >
                                            {({ columnIndex, rowIndex, style }) => {
                                                if (!isItemLoaded(rowIndex) && columnIndex === 0) {
                                                    return (
                                                        <div
                                                            style={{
                                                                ...style,
                                                                width
                                                            }}
                                                        >
                                                            <Loading />
                                                        </div>
                                                    );
                                                }

                                                if (!isItemLoaded(rowIndex)) {
                                                    return null;
                                                }

                                                const { key, align } = columns[columnIndex];
                                                const item = formattedItems[rowIndex][key];
                                                return (
                                                    <Box
                                                        style={style}
                                                        sx={(theme: any) => ({
                                                            ...theme.mixins.tableCell,
                                                            color: theme.palette.custom.fonts.fontTwo
                                                        })}
                                                    >
                                                        <Typography variant="body1" align={align} component="div">
                                                            {item}
                                                        </Typography>
                                                    </Box>
                                                );
                                            }}
                                        </Grid>
                                    );
                                }}
                            </InfiniteLoader>
                        </>
                    );
                }}
            </AutoSizer>
        </Box>
    );
};

export default Desktop;
