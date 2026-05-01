import React from 'react';
import { AvatarName, Loading } from '@components';
import { Box, Typography } from '@mui/material';
import dayjs from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { BLOCK_DETAILS } from '@utils/go_to_page';
import clsx from 'clsx';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { DataTable, DataTableColumn } from '@/components/DataTable';

import { ItemType } from '../../types';

type DesktopProps = {
    className?: string;
    items: ItemType[];
    itemCount: number;
    loadMoreItems: (params: { startIndex: number; stopIndex: number }) => Promise<void> | void;
    isItemLoaded?: (index: number) => boolean;
    isNextPageLoading?: boolean;
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

const DEFAULT_ROW_HEIGHT = 50;

const Desktop: React.FC<DesktopProps> = ({ className, items, itemCount, loadMoreItems, isItemLoaded, isNextPageLoading = false }) => {
    const { t } = useTranslation('blocks');
    const { ref, size } = useElementSize<HTMLDivElement>();
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
            key: 'height',
            header: t('height'),
            width: 150,
            render: (x) => (
                <Link to={BLOCK_DETAILS(x.height)}>
                    <Typography variant="body1" className="value" component="a">
                        {numeral(x.height).format('0,0')}
                    </Typography>
                </Link>
            )
        },
        {
            key: 'proposer',
            header: t('proposer'),
            minWidth: 150,
            render: (x) => <AvatarName address={x?.proposer?.address} imageUrl={x.proposer.imageUrl} name={x.proposer.name} />
        },
        {
            key: 'hash',
            header: t('hash'),
            grow: 2,
            render: (x) =>
                getMiddleEllipsis(x.hash, {
                    beginning: 13,
                    ending: 15
                })
        },
        {
            key: 'txs',
            header: t('txs'),
            width: 100,
            render: (x) => numeral(x.txs).format('0,0')
        },
        {
            key: 'time',
            header: t('time'),
            width: 150,
            align: 'right',
            render: (x) => dayjs.utc(x.timestamp).fromNow()
        }
    ];

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
                <DataTable
                    data={items}
                    columns={columns}
                    getRowId={(row) => row.height}
                    height="100%"
                    hasMore={hasMore}
                    isFetchingMore={isNextPageLoading}
                    onReachEnd={handleReachEnd}
                    fetchMoreIndicator={<Loading />}
                />
            ) : null}
        </Box>
    );
};

export default Desktop;
