import {
  useEffect, useState,
} from 'react';
import * as R from 'ramda';
import DOMPurify from 'dompurify';
import {
  useProposalsQuery,
  ProposalsQuery,
} from '@graphql/types';
import { ProposalsState } from './types';

export const useProposals = () => {
  const [state, setState] = useState<ProposalsState>({
    loading: true,
    exists: true,
    items: [],
    hasNextPage: false,
    isNextPageLoading: false,
    rawDataTotal: 0,
  });

  const [ignoredProposals, setIgnoredProposals] = useState<number[]>([]);
  const [ignoredProposalsLoaded, setIgnoredProposalsLoaded] = useState(false);

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  // ================================
  // Load ignored proposals
  // ================================
  useEffect(() => {
    const fetchIngnoreProposals = async () => {
      const ignoreListUrl = process.env.NEXT_PUBLIC_IGNORE_LIST_URL;

      if (!ignoreListUrl) {
        // eslint-disable-next-line no-console
        console.error('Environment variable NEXT_PUBLIC_IGNORE_LIST_URL is not defined.');
        return;
      }

      try {
        const response = await fetch(ignoreListUrl);
        if (!response.ok) {
          throw new Error(`Failed to load ignored proposals: ${response.status}`);
        }
        const data = await response.json();
        setIgnoredProposals(data.ignoreProposalIdList || []);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching ignored proposals:', error);
      } finally {
        setIgnoredProposalsLoaded(true);
      }
    };

    fetchIngnoreProposals();
  }, []);

  // ================================
  // proposals query
  // ================================
  const proposalQuery = useProposalsQuery({
    variables: {
      limit: 50,
      offset: 0,
    },
    skip: !ignoredProposalsLoaded, // Wait until ignoredProposals are loaded
    onCompleted: (data) => {
      const newItems = R.uniq([...state.items, ...formatProposals(data)]);
      handleSetState({
        items: newItems,
        hasNextPage: newItems.length < (data.total.aggregate.count - ignoredProposals.length),
        isNextPageLoading: false,
        rawDataTotal: (data.total.aggregate.count - ignoredProposals.length),
      });
    },
  });

  const loadNextPage = async () => {
    handleSetState({
      isNextPageLoading: true,
    });
    // refetch query
    await proposalQuery.fetchMore({
      variables: {
        offset: state.items.length,
        limit: 50,
      },
    }).then(({ data }) => {
      const newItems = R.uniq([
        ...state.items,
        ...formatProposals(data),
      ]);
      handleSetState({
        items: newItems,
        isNextPageLoading: false,
        hasNextPage: newItems.length < data.total.aggregate.count,
        rawDataTotal: data.total.aggregate.count,
      });
    });
  };

  const formatProposals = (data: ProposalsQuery) => {
    return data.proposals
      .filter((x) => !ignoredProposals.includes(x.proposalId))
      .map((x) => {
        const description = DOMPurify.sanitize(x.description);
        return {
          description,
          id: x.proposalId,
          title: x.title,
          status: x.status,
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
    isItemLoaded,
  };
};
