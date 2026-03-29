import React from 'react';
import Link from '@/adapters/routing/link';
import { Box, Loading } from '@components';
import { useList, useListRow } from '@hooks';
import { Divider, Typography } from '@mui/material';
import { PROPOSAL_DETAILS } from '@utils/go_to_page';
import { mergeRefs } from '@utils/merge_refs';
import classnames from 'classnames';
import numeral from 'numeral';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { ProposalType } from '../../types';
import { SingleProposal, Total } from './components';

const ProposalsList: React.FC<{
    className?: string;
    items: ProposalType[];
    rawDataTotal: number;
    isItemLoaded: (index: number) => boolean;
    itemCount: number;
    loadMoreItems: () => void;
}> = ({ className, items, rawDataTotal, isItemLoaded, itemCount, loadMoreItems }) => {
    const { listRef, getRowHeight, setRowHeight } = useList();

    const formattedItems = items.map((x) => {
        return {
            description: x.description.length > 200 ? `${x.description.slice(0, 200)}...` : x.description,
            status: x.status,
            types: x.types,
            title: (
                <Link href={PROPOSAL_DETAILS(x.id)} passHref>
                    <Typography variant="h3" className="value" component="a">
                        {x.title}
                    </Typography>
                </Link>
            ),
            id: `#${numeral(x.id).format('0,0')}`
        };
    });

    return (
        <Box
            className={classnames(className)}
            sx={(theme) => ({
                minHeight: '500px',
                height: '50vh',
                display: 'flex',
                flexDirection: 'column',
                [theme.breakpoints.up('lg')]: {
                    height: '100%',
                    minHeight: '65vh'
                },
                '& .list': {
                    flex: 1,
                    minHeight: 0
                },
                '& .listScroll': {
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
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
                },
                '& .topContent': {
                    [theme.breakpoints.up('lg')]: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: theme.spacing(2)
                    }
                }
            })}
        >
            <div className="topContent">
                <Total className="total" total={numeral(rawDataTotal).format('0,0')} />
                {/* <Search className={classes.search} /> */}
            </div>
            <div className="list">
                <AutoSizer>
                    {({ height, width }) => (
                        <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
                            {({ onItemsRendered, ref }) => (
                                <List
                                    className="listScroll"
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
                                                    <SingleProposal {...item} />
                                                    {index !== itemCount - 1 && <Divider className="rowDivider" />}
                                                </div>
                                            </div>
                                        );
                                    }}
                                </List>
                            )}
                        </InfiniteLoader>
                    )}
                </AutoSizer>
            </div>
        </Box>
    );
};

export default ProposalsList;
