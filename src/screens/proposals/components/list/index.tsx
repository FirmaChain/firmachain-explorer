import React from 'react';
import { Box, Loading } from '@components';
import { Divider, Typography } from '@mui/material';
import { PROPOSAL_DETAILS } from '@utils/go_to_page';
import clsx from 'clsx';
import numeral from 'numeral';
import { Link } from 'react-router';
import { List, useDynamicRowHeight } from 'react-window';
import { useInfiniteLoader } from 'react-window-infinite-loader';

import { ProposalType } from '../../types';
import { SingleProposal, Total } from './components';

type FormattedProposalItem = {
    description: string;
    status: ProposalType['status'];
    types: ProposalType['types'];
    title: React.ReactNode;
    id: string;
};

type RowExtraProps = {
    items: FormattedProposalItem[];
    rowCount: number;
    hasNextPage: boolean;
};

type RowProps = {
    index: number;
    style: React.CSSProperties;
} & Partial<RowExtraProps>;

function useElementSize<T extends HTMLElement>() {
    const ref = React.useRef<T | null>(null);
    const [size, setSize] = React.useState({ width: 0, height: 0 });

    React.useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;

        const updateSize = () => {
            const rect = element.getBoundingClientRect();

            setSize({
                width: rect.width,
                height: rect.height
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

const Row: React.FC<RowProps> = ({ index, style, items = [], rowCount = 0, hasNextPage = false }) => {
    const item = items[index];
    const isLoaderRow = hasNextPage && index === items.length;

    return (
        <div
            style={{
                ...style,
                width: '100%',
                overflowX: 'hidden'
            }}
        >
            {!item ? (
                isLoaderRow ? (
                    <Loading />
                ) : null
            ) : (
                <>
                    <SingleProposal {...item} />
                    {index !== rowCount - 1 && <Divider className="rowDivider" />}
                </>
            )}
        </div>
    );
};

const ProposalsList: React.FC<{
    className?: string;
    items: ProposalType[];
    rawDataTotal: number;
    hasNextPage: boolean;
    loadMoreItems: () => void;
}> = ({ className, items, rawDataTotal, hasNextPage, loadMoreItems }) => {
    const { ref: viewportRef, size } = useElementSize<HTMLDivElement>();

    const formattedItems = React.useMemo<FormattedProposalItem[]>(() => {
        return items.map((item) => ({
            description: item.description.length > 200 ? `${item.description.slice(0, 200)}...` : item.description,
            status: item.status,
            types: item.types,
            title: (
                <Link to={PROPOSAL_DETAILS(item.id)}>
                    <Typography variant="h3" className="value" component="span">
                        {item.title}
                    </Typography>
                </Link>
            ),
            id: `#${numeral(item.id).format('0,0')}`
        }));
    }, [items]);

    const rowCount = hasNextPage ? formattedItems.length + 1 : formattedItems.length;

    const rowHeight = useDynamicRowHeight({
        defaultRowHeight: 120
    });

    const loadingRef = React.useRef(false);

    const isRowLoaded = React.useCallback(
        (index: number) => {
            return index < formattedItems.length;
        },
        [formattedItems.length]
    );

    const safeLoadMoreItems = React.useCallback(
        async (startIndex: number, stopIndex: number) => {
            if (!hasNextPage) return;
            if (loadingRef.current) return;

            const loaderRowIndex = formattedItems.length;
            const reachedLoaderRow = startIndex <= loaderRowIndex && stopIndex >= loaderRowIndex;

            if (!reachedLoaderRow) return;

            loadingRef.current = true;

            try {
                await Promise.resolve(loadMoreItems(startIndex, stopIndex));
            } finally {
                loadingRef.current = false;
            }
        },
        [formattedItems.length, hasNextPage, loadMoreItems]
    );

    const onRowsRendered = useInfiniteLoader({
        isRowLoaded,
        loadMoreRows: safeLoadMoreItems,
        rowCount,
        threshold: 3,
        minimumBatchSize: 10
    });

    const rowProps = React.useMemo<RowExtraProps>(
        () => ({
            items: formattedItems,
            rowCount,
            hasNextPage
        }),
        [formattedItems, rowCount, hasNextPage]
    );

    const canRenderList = size.width > 0 && size.height > 0;

    return (
        <Box
            className={clsx(className)}
            sx={(theme) => ({
                minHeight: '500px',
                height: '50vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                [theme.breakpoints.up('lg')]: {
                    height: '100%',
                    minHeight: '65vh'
                },
                '& .topContent': {
                    flexShrink: 0,
                    [theme.breakpoints.up('lg')]: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: theme.spacing(2)
                    }
                },
                '& .listShell': {
                    flex: 1,
                    minHeight: 0,
                    position: 'relative',
                    overflow: 'hidden'
                },
                '& .listViewport': {
                    position: 'absolute',
                    inset: 0,
                    overflowX: 'hidden',
                    overflowY: 'hidden'
                },
                '& .rowDivider': {
                    marginLeft: theme.spacing(-2),
                    marginRight: theme.spacing(-2),
                    marginTop: theme.spacing(1),
                    marginBottom: theme.spacing(1)
                },
                '& .total': {
                    color: theme.palette.custom.fonts.fontThree,
                    textAlign: 'right',
                    [theme.breakpoints.up('lg')]: {
                        color: theme.palette.custom.fonts.fontTwo
                    }
                }
            })}
        >
            <div className="topContent">
                <Total className="total" total={numeral(rawDataTotal).format('0,0')} />
            </div>

            <div className="listShell">
                <div ref={viewportRef} className="listViewport">
                    {!canRenderList ? (
                        <Loading />
                    ) : (
                        <List
                            height={size.height}
                            width={size.width}
                            rowCount={rowCount}
                            rowComponent={Row}
                            rowHeight={rowHeight}
                            rowProps={rowProps}
                            onRowsRendered={onRowsRendered}
                            overscanCount={3}
                            style={{
                                overflowX: 'hidden'
                            }}
                        />
                    )}
                </div>
            </div>
        </Box>
    );
};

export default ProposalsList;
