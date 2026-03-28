import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import Link from '@/adapters/routing/link';
import { Loading, Result, SingleTransactionMobile } from '@components';
import { useList, useListRow } from '@hooks';
import { Divider, Typography } from '@material-ui/core';
import dayjs from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { BLOCK_DETAILS, TRANSACTION_DETAILS } from '@utils/go_to_page';
import { mergeRefs } from '@utils/merge_refs';
import classnames from 'classnames';
import numeral from 'numeral';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { getMessageByType } from '@/components/msg';

import { TransactionsListState } from '../../types';
import { useStyles } from './styles';

const Mobile: React.FC<TransactionsListState> = ({ className, itemCount, loadMoreItems, isItemLoaded, transactions }) => {
    const { t } = useTranslation('transactions');
    const classes = useStyles();

    const { listRef, getRowHeight, setRowHeight } = useList();

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
                            beginning: 15,
                            ending: 5
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
                                                    <SingleTransactionMobile {...item} />
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
        </div>
    );
};

export default Mobile;
