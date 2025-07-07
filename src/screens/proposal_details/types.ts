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
  content: ContentType;
  metadata: string;
}

export type ContentType = {
  '@type': string;
  authority: string;
  plan?: {
    height: string;
    info: string;
    name: string;
    time: string;
    upgradedClientState: {
      typeUrl: string | undefined;
      value: Uint8Array | undefined;
    }
  }
}

export type ProposalState = {
  loading: boolean;
  exists: boolean;
  overview: OverviewType;
}
