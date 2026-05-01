import React from 'react';
import { AvatarName, Loading, SingleBlockMobile } from '@components';
import { Box, Divider, Typography } from '@mui/material';
import dayjs from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { BLOCK_DETAILS } from '@utils/go_to_page';
import clsx from 'clsx';
import numeral from 'numeral';
import { Link } from 'react-router';

import { DataTable, type DataTableColumn } from '@/components/DataTable';

import { ItemType } from '../../types';

const ROW_HEIGHT = 280;

type MobileProps = {
    className?: string;
    items: ItemType[];
    itemCount: number;
    loadMoreItems: (params: { startIndex: number; stopIndex: number }) => Promise<void> | void;
    isNextPageLoading?: boolean;
};

const Mobile: React.FC<MobileProps> = ({ className, items, itemCount, loadMoreItems, isNextPageLoading = false }) => {
    const hasMore = itemCount > items.length;

    const handleReachEnd = React.useCallback(() => {
        void Promise.resolve(
            loadMoreItems({
                startIndex: items.length,
                stopIndex: itemCount - 1
            })
        );
    }, [itemCount, items.length, loadMoreItems]);

    const columns: DataTableColumn<ItemType>[] = [
        {
            key: 'block',
            header: '',
            render: (row) => (
                <SingleBlockMobile
                    height={
                        <Link to={BLOCK_DETAILS(row.height)}>
                            <Typography variant="body1" className="value" component="a">
                                {numeral(row.height).format('0,0')}
                            </Typography>
                        </Link>
                    }
                    txs={numeral(row.txs).format('0,0')}
                    time={dayjs.utc(row.timestamp).fromNow()}
                    proposer={<AvatarName address={row.proposer.address} imageUrl={row.proposer.imageUrl} name={row.proposer.name} />}
                    hash={getMiddleEllipsis(row.hash, {
                        beginning: 13,
                        ending: 10
                    })}
                />
            )
        }
    ];

    return (
        <Box className={clsx(className)} sx={{ height: '100%', minHeight: 0 }}>
            <DataTable
                data={items}
                columns={columns}
                getRowId={(row) => row.height}
                height="100%"
                hideHeader
                hasMore={hasMore}
                isFetchingMore={isNextPageLoading}
                onReachEnd={handleReachEnd}
                fetchMoreIndicator={<Loading />}
            />
        </Box>
    );
};

export default Mobile;
