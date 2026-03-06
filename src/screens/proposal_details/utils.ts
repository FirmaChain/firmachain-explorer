import * as R from 'ramda';

export const getProposalType = (proposalType: string) => {
  let type = proposalType;
  if (
    proposalType === '/cosmos.gov.v1beta1.TextProposal' || proposalType === '/cosmos.gov.v1.MsgExecLegacyContent' || proposalType === ''
  ) {
    type = 'textProposal';
  }

  if (
    proposalType === '/cosmos.params.v1beta1.ParameterChangeProposal' || proposalType.endsWith('.MsgUpdateParams')
  ) {
    type = 'parameterChangeProposal';
  }

  if (
    proposalType === '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal' || proposalType.endsWith('.MsgSoftwareUpgrade')
  ) {
    type = 'softwareUpgradeProposal';
  }

  if (
    proposalType === '/cosmos.upgrade.v1beta1.CommunityPoolSpendProposal' || proposalType.endsWith('.MsgCommunityPoolSpend')
  ) {
    type = 'communityPoolSpendProposal';
  }

  if (proposalType.endsWith('.MsgExec')) {
    type = 'authzExec';
  }

  return type;
};

const KNOWN_TYPES = [
  'textProposal',
  'parameterChangeProposal',
  'softwareUpgradeProposal',
  'communityPoolSpendProposal',
  'multiple',
  'authzExec',
];

/**
 * From raw proposal content, return an array of display types (1 or more).
 * Use for list: show each type as a tag.
 */
export const getProposalDisplayTypes = (rawContent: unknown): string[] => {
  const contentArray = Array.isArray(rawContent) ? rawContent : [rawContent];
  const types = contentArray
    .filter((c): c is Record<string, unknown> => typeof c === 'object' && c !== null)
    .map((c) => getProposalType(R.pathOr('', ['@type'], c) as string));
  const uniqueTypes = [...new Set(types.filter(Boolean))];
  if (uniqueTypes.length === 0) return ['textProposal'];
  return uniqueTypes.map((t) => (KNOWN_TYPES.includes(t) ? t : 'other'));
};

/**
 * Single display type for backward compatibility (detail header etc.): "multiple" when mixed.
 */
export const getProposalDisplayType = (rawContent: unknown): string => {
  const types = getProposalDisplayTypes(rawContent);
  if (types.length <= 1) return types[0] ?? 'textProposal';
  return 'multiple';
};

export const shouldShowData = (status: string) => [
  'PROPOSAL_STATUS_VOTING_PERIOD',
  'PROPOSAL_STATUS_PASSED',
  'PROPOSAL_STATUS_REJECTED',
  'PROPOSAL_STATUS_FAILED',
].includes(status);
