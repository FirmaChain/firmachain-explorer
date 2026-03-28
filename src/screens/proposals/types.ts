export type ProposalType = {
    id: number;
    title: string;
    description: string;
    status: string;
    /** Display types (1 or more): each shown as a tag on the list */
    types: string[];
};

export type ProposalsState = {
    loading: boolean;
    exists: boolean;
    hasNextPage: boolean;
    isNextPageLoading: boolean;
    rawDataTotal: number;
    items: ProposalType[];
};
