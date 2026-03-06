/** Gov proposal types + MsgExec, Other – use Tag theme "seven" for consistent display */
export const KNOWN_GOV_TYPES = [
  'textProposal',
  'parameterChangeProposal',
  'softwareUpgradeProposal',
  'communityPoolSpendProposal',
  'multiple',
  'msgExec',
  'other',
] as const;

export type KnownGovType = (typeof KNOWN_GOV_TYPES)[number];
