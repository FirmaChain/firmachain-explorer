import { useEffect, useState } from 'react';
import { BlocksListenerSubscription, BlocksQuery, useBlocksListenerSubscription, useBlocksQuery } from '@graphql/types';
import * as R from 'ramda';

import { BlocksState, BlockType } from './types';

export const useBlocks = () => {
    const [state, setState] = useState<BlocksState>({
        loading: true,
        exists: true,
        items: [],
        hasNextPage: false,
        isNextPageLoading: false
    });

    const handleSetState = (stateChange: any) => {
        setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
    };

    // This is a bandaid as it can get extremely
    // expensive if there is too much data
    /**
     * Helps remove any possible duplication
     * and sorts by height in case it bugs out
     */
    const uniqueAndSort = R.pipe(R.uniqBy(R.prop('height')), R.sort(R.descend(R.prop('height'))));

    // ================================
    // block subscription
    // ================================
    useBlocksListenerSubscription({
        variables: {
            limit: 1,
            offset: 0
        },
        onSubscriptionData: (data) => {
            try {
                const newItems = uniqueAndSort([...formatBlocks(data.subscriptionData.data), ...state.items]);
                handleSetState({
                    loading: false,
                    items: newItems
                });
            } catch {
                handleSetState({
                    loading: false
                });
            }
        }
    });

    // ================================
    // block query
    // ================================
    const LIMIT = 51;
    const blockQuery = useBlocksQuery({
        variables: {
            limit: LIMIT,
            offset: 1
        },
        onError: () => {
            handleSetState({
                loading: false
            });
        },
        onCompleted: (data) => {
            try {
                const itemsLength = data.blocks.length;
                const newItems = uniqueAndSort([...state.items, ...formatBlocks(data)]);
                handleSetState({
                    loading: false,
                    items: newItems,
                    hasNextPage: itemsLength === 51,
                    isNextPageLoading: false
                });
            } catch {
                handleSetState({
                    loading: false,
                    isNextPageLoading: false
                });
            }
        }
    });

    useEffect(() => {
        if (blockQuery.data) {
            try {
                const itemsLength = blockQuery.data.blocks.length;
                const newItems = uniqueAndSort([...state.items, ...formatBlocks(blockQuery.data)]);
                handleSetState({
                    loading: false,
                    items: newItems,
                    hasNextPage: itemsLength === 51,
                    isNextPageLoading: false
                });
                return;
            } catch {
                handleSetState({
                    loading: false,
                    isNextPageLoading: false
                });
                return;
            }
        }

        if (blockQuery.error || !blockQuery.loading) {
            handleSetState({
                loading: false,
                isNextPageLoading: false
            });
        }
    }, [blockQuery.data, blockQuery.loading, blockQuery.error]);

    const loadNextPage = async () => {
        handleSetState({
            isNextPageLoading: true
        });
        // refetch query
        await blockQuery
            .fetchMore({
                variables: {
                    offset: state.items.length,
                    limit: LIMIT
                },
                updateQuery: (
                    prev: BlocksQuery,
                    { fetchMoreResult }: { fetchMoreResult?: BlocksQuery; variables: { offset: number; limit: number } }
                ) => {
                    if (!fetchMoreResult) return prev;
                    return {
                        ...prev,
                        blocks: [...(prev?.blocks ?? []), ...(fetchMoreResult?.blocks ?? [])]
                    };
                }
            })
            .then(({ data }) => {
                try {
                    const itemsLength = data.blocks.length;
                    const newItems = uniqueAndSort([...state.items, ...formatBlocks(data)]);

                    // set new state
                    handleSetState({
                        items: newItems,
                        isNextPageLoading: false,
                        hasNextPage: itemsLength === 51
                    });
                } catch {
                    handleSetState({
                        isNextPageLoading: false
                    });
                }
            });
    };

    const formatBlocks = (data: BlocksListenerSubscription): BlockType[] => {
        let formattedData = data.blocks;
        if (data.blocks.length === 51) {
            formattedData = data.blocks.slice(0, 51);
        }
        return formattedData.map((x) => {
            const proposerAddress = R.pathOr('', ['validator', 'validatorInfo', 'operatorAddress'], x);
            return {
                height: x.height,
                txs: x.txs,
                hash: x.hash,
                timestamp: x.timestamp,
                proposer: proposerAddress
            };
        });
    };

    const itemCount = state.hasNextPage ? state.items.length + 1 : state.items.length;
    const loadMoreItems = state.isNextPageLoading ? () => null : loadNextPage;
    const isItemLoaded = (index) => !state.hasNextPage || index < state.items.length;

    return {
        state,
        loadNextPage,
        itemCount,
        loadMoreItems,
        isItemLoaded
    };
};
