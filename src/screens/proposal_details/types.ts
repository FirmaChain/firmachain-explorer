export type OverviewType = {
    title: string;
    id: number;
    proposer: string;
    description: string;
    status: string;
    submitTime: string;
    depositEndTime: string;
    votingStartTime: string | null;
    votingEndTime: string | null;
    content: ContentType[];
    metadata: string;
};

/** Gov params payload for MsgUpdateParams (parameterChangeProposal) */
export type MsgUpdateParamsContent = {
    '@type': string;
    authority: string;
    params: Record<string, unknown>;
};

/** Single spend for MsgCommunityPoolSpend (communityPoolSpendProposal) */
export type MsgCommunityPoolSpendContent = {
    '@type': string;
    authority: string;
    recipient: string;
    amount: { denom: string; amount: string }[];
};

/** Plan payload for MsgSoftwareUpgrade (softwareUpgradeProposal) - API uses snake_case */
export type MsgSoftwareUpgradePlan = {
    info: string;
    name: string;
    time: string;
    height: string;
    upgraded_client_state: unknown | null;
};

export type MsgSoftwareUpgradeContent = {
    '@type': string;
    authority: string;
    plan: MsgSoftwareUpgradePlan;
};

/** One item in overview.content array; API returns [] for TextProposal */
export type ContentType =
    | MsgUpdateParamsContent
    | MsgCommunityPoolSpendContent
    | MsgSoftwareUpgradeContent
    | { '@type': string; authority: string; [key: string]: unknown };

export type ProposalState = {
    loading: boolean;
    exists: boolean;
    overview: OverviewType;
};
