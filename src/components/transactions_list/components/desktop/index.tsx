import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Loading, Result } from '@components';
import { Box, Typography } from '@mui/material';
import dayjs from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { BLOCK_DETAILS, TRANSACTION_DETAILS } from '@utils/go_to_page';
import clsx from 'clsx';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { DataTable, type DataTableColumn } from '@/components/DataTable';
import { getMessageByType } from '@/components/msg/utils';

import { TransactionsListState } from '../../types';

function useElementSize<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
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

const DEFAULT_ROW_HEIGHT = 50;

const Desktop: React.FC<TransactionsListState> = ({
    className,
    itemCount = 0,
    hasNextPage = false,
    isNextPageLoading = false,
    loadMoreItems,
    transactions = []
}) => {
    const { t } = useTranslation('transactions');
    const { ref, size } = useElementSize<HTMLDivElement>();

    const columns: DataTableColumn<(typeof transactions)[number]>[] = [
        {
            key: 'block',
            header: t('block'),
            width: 150,
            render: (row) => (
                <Link to={BLOCK_DETAILS(row.height)}>
                    <Typography variant="body1" component="span" noWrap>
                        {numeral(row.height).format('0,0')}
                    </Typography>
                </Link>
            )
        },
        {
            key: 'type',
            header: t('type'),
            minWidth: 180,
            render: (row) => {
                const firstType = row.type?.[0] ?? {};
                const typeSource = {
                    ...firstType,
                    type: firstType['@type']
                };
                const tag = getMessageByType(typeSource, true, t);

                return (
                    <Typography variant="body1" component="span" noWrap>
                        {tag.type}
                    </Typography>
                );
            }
        },
        {
            key: 'hash',
            header: t('hash'),
            minWidth: 320,
            grow: 2,
            render: (row) => (
                <Link to={TRANSACTION_DETAILS(row.hash)}>
                    <Typography variant="body1" component="span" noWrap>
                        {getMiddleEllipsis(row.hash, {
                            beginning: 20,
                            ending: 15
                        })}
                    </Typography>
                </Link>
            )
        },
        {
            key: 'messages',
            header: t('messages'),
            width: 110,
            align: 'right',
            render: (row) => numeral(row.messages?.count ?? 0).format('0,0')
        },
        {
            key: 'result',
            header: t('result'),
            width: 110,
            align: 'right',
            render: (row) => <Result success={row.success} />
        },
        {
            key: 'time',
            header: t('time'),
            width: 140,
            align: 'right',
            render: (row) => dayjs.utc(row.timestamp).fromNow()
        }
    ];

    const handleReachEnd = useCallback(() => {
        void Promise.resolve(
            loadMoreItems?.({
                startIndex: transactions.length,
                stopIndex: itemCount - 1
            })
        );
    }, [itemCount, loadMoreItems, transactions.length]);

    return (
        <Box
            ref={ref}
            className={clsx(className)}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0
            }}
        >
            {size.width > 0 && size.height > 0 ? (
                <DataTable
                    data={transactions}
                    columns={columns}
                    getRowId={(row) => row.hash}
                    height="100%"
                    rowHeight={DEFAULT_ROW_HEIGHT}
                    virtualization={{ enabled: true }}
                    hasMore={hasNextPage}
                    isFetchingMore={isNextPageLoading}
                    onReachEnd={handleReachEnd}
                    fetchMoreIndicator={<Loading />}
                />
            ) : (
                <Loading />
            )}
        </Box>
    );
};

export default Desktop;
