import React from 'react';
import { AvatarName, Loading, SingleBlockMobile } from '@components';
import { useList, useListRow } from '@hooks';
import { Box, Divider, Typography } from '@mui/material';
import dayjs from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { BLOCK_DETAILS } from '@utils/go_to_page';
import { mergeRefs } from '@utils/merge_refs';
import classnames from 'classnames';
import numeral from 'numeral';
import { Link } from 'react-router';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { ItemType } from '../../types';

const Mobile: React.FC<{
    className?: string;
    items: ItemType[];
    itemCount: number;
    loadMoreItems: (any) => void;
    isItemLoaded?: (index: number) => boolean;
}> = ({ className, items, itemCount, loadMoreItems, isItemLoaded }) => {
    const { listRef, getRowHeight, setRowHeight } = useList();

    const formattedItems = items.map((x) => {
        return {
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
        };
    });

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
                                        const item = formattedItems[index];
                                        return (
                                            <div style={style}>
                                                <div ref={rowRef}>
                                                    <SingleBlockMobile {...item} />
                                                    {index !== itemCount - 1 && <Divider />}
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

export default Mobile;
