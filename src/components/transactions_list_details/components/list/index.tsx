import React from 'react';
import Link from '@/adapters/routing/link';
import { Loading, Result } from '@components';
import { useList, useListRow, useScreenSize } from '@hooks';
import { getMessageByType } from '@msg';
import { Box, Typography } from '@mui/material';
import dayjs, { formatDayJs } from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { BLOCK_DETAILS, TRANSACTION_DETAILS } from '@utils/go_to_page';
import { mergeRefs } from '@utils/merge_refs';
import { readDate, useSettingsStore } from '@zustand/settings';
import classnames from 'classnames';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { TransactionsListDetailsState } from '../../types';
import { SingleTransaction } from './components';

const TransactionList: React.FC<TransactionsListDetailsState> = ({ className, itemCount, loadMoreItems, isItemLoaded, transactions }) => {
    const { isMobile } = useScreenSize();
    const { t } = useTranslation('transactions');
    const dateFormat = useSettingsStore(readDate);

    const { listRef, getRowHeight, setRowHeight } = useList();

    const items = transactions.map((x) => ({
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
        messages: x.messages.items.map((message) => {
            return getMessageByType(message, false, t);
        })
    }));

    return (
        <Box className={classnames(className)} sx={{ height: '100%' }}>
            <AutoSizer>
                {({ height, width }) => {
                    return (
                        <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
                            {({ onItemsRendered, ref }) => (
                                <List
                                    className="List"
                                    height={height}
                                    itemCount={itemCount}
                                    itemSize={getRowHeight}
                                    onItemsRendered={onItemsRendered}
                                    ref={mergeRefs(listRef, ref)}
                                    width={width}
                                >
                                    {({ index, style }) => {
                                        const { rowRef } = useListRow(index, setRowHeight);
                                        if (!isItemLoaded(index)) {
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
                                                    <SingleTransaction {...item} />
                                                </div>
                                            </div>
                                        );
                                    }}
                                </List>
                            )}
                        </InfiniteLoader>
                    );
                }}
            </AutoSizer>
        </Box>
    );
};

export default TransactionList;
