import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import Link from '@/adapters/routing/link';
import { Loading, Result } from '@components';
import { useGrid } from '@hooks';
import { Typography } from '@mui/material';
import dayjs from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { BLOCK_DETAILS, TRANSACTION_DETAILS } from '@utils/go_to_page';
import { mergeRefs } from '@utils/merge_refs';
import classnames from 'classnames';
import numeral from 'numeral';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { getMessageByType } from '@/components/msg';

import { TransactionsListState } from '../../types';
import { useStyles } from './styles';
import { columns } from './utils';

const Desktop: React.FC<TransactionsListState> = ({ className, itemCount, loadMoreItems, isItemLoaded, transactions }) => {
    const { gridRef, columnRef, onResize, getColumnWidth, getRowHeight } = useGrid(columns);

    const classes = useStyles();
    const { t } = useTranslation('transactions');

    const items = transactions.map((x: any) => {
        x.type[0].type = x.type[0]['@type'];
        const tag = getMessageByType(x.type[0], true, t);
        return {
            block: (
                <Link href={BLOCK_DETAILS(x.height)} passHref>
                    <Typography variant="body1" component="a">
                        {numeral(x.height).format('0,0')}
                    </Typography>
                </Link>
            ),
            hash: (
                <Link href={TRANSACTION_DETAILS(x.hash)} passHref>
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

    return (
        <div className={classnames(className, classes.root)}>
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
                                        <div style={style} className={classes.cell}>
                                            <Typography variant="h4" align={align}>
                                                {t(key)}
                                            </Typography>
                                        </div>
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
                                                const item = items[rowIndex][key];
                                                return (
                                                    <div
                                                        style={style}
                                                        className={classnames(classes.cell, classes.body, {
                                                            odd: !(rowIndex % 2)
                                                        })}
                                                    >
                                                        <Typography variant="body1" align={align} component="div">
                                                            {item}
                                                        </Typography>
                                                    </div>
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
        </div>
    );
};

export default Desktop;
