import { useState } from 'react';
import * as R from 'ramda';
import {
  useTransactionsQuery,
  useTransactionsListenerSubscription,
  TransactionsListenerSubscription,
  TransactionsQuery,
} from '@graphql/types';
import { convertMsgsToModels } from '@msg';
import { TransactionsState } from './types';

export const useTransactions = () => {
  const [state, setState] = useState<TransactionsState>({
    loading: true,
    exists: true,
    hasNextPage: false,
    isNextPageLoading: false,
    items: [],
  });
  console.log("state1:", state);

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  // This is a bandaid as it can get extremely
  // expensive if there is too much data
  /**
   * Helps remove any possible duplication
   * and sorts by height in case it bugs out
   */
  const uniqueAndSort = R.pipe(
    R.uniqBy(R.prop('hash')),
    R.sort(R.descend(R.prop('height'))),
  );

  // ================================
  // tx subscription
  // ================================
  useTransactionsListenerSubscription({
    variables: {
      limit: 1,
      offset: 0,
    },
    onSubscriptionData: (data) => {
      const newItems = uniqueAndSort([
        ...formatTransactions(data.subscriptionData.data),
        ...state.items,
      ]);
      handleSetState({
        loading: false,
        items: newItems,
      });
    },
  });

  // ================================
  // tx query
  // ================================
  const LIMIT = 51;
  const transactionQuery = useTransactionsQuery({
    variables: {
      limit: LIMIT,
      offset: 0,
    },
    onError: () => {
      handleSetState({
        loading: false,
      });
    },
    onCompleted: (data) => {
      const itemsLength = data.transactions.length;
      const newItems = uniqueAndSort([
        ...state.items,
        ...formatTransactions(data),
      ]);
      handleSetState({
        loading: false,
        items: newItems,
        hasNextPage: itemsLength === 51,
        isNextPageLoading: false,
      });
    },
  });

  const loadNextPage = async () => {
    handleSetState({
      isNextPageLoading: true,
    });
  
    await transactionQuery.fetchMore({
      variables: {
        offset: state.items.length,
        limit: LIMIT,
      },
      updateQuery: (
        prev: TransactionsQuery,
        { fetchMoreResult }: { fetchMoreResult?: TransactionsQuery; variables: { offset: number; limit: number } },
      ) => {
        if (!fetchMoreResult) return prev;
        return {
          transactions: [
            ...(prev.transactions ?? []),
            ...fetchMoreResult.transactions,
          ],
        };
      },
    }).then(({ data }) => {
      const itemsLength = data.transactions.length;
      // Format the merged data and update your state
      const newItems = uniqueAndSort([
        ...state.items,
        ...formatTransactions(data),
      ]);
      handleSetState({
        items: newItems,
        isNextPageLoading: false,
        hasNextPage: itemsLength === 51,
      });
    });
  };
  

  const formatTransactions = (data: TransactionsListenerSubscription) => {
    let formattedData = data.transactions;
    if (data.transactions.length === 51) {
      formattedData = data.transactions.slice(0, 51);
    }

    return formattedData.map((x) => {
      const messages = convertMsgsToModels(x);
      return ({
        height: x.height,
        hash: x.hash,
        messages: {
          count: x.messages.length,
          items: messages,
        },
        success: x.success,
        timestamp: x.block.timestamp,
        type: x.messages,
      });
    });
  };

  return {
    state,
    loadNextPage,
  };
};
