/**
 * Lightweight @type → { tagDisplay, tagTheme } mapping.
 * Mirrors the tagDisplay / tagTheme values in msg/utils.tsx defaultTypeToModel + customTypeToModel,
 * but without importing MODELS or COMPONENTS so it can be used in lightweight contexts.
 */

type TagInfo = { tagDisplay: string; tagTheme: TagTheme };

const TAG_MAP: Record<string, TagInfo> = {
  // staking
  '/cosmos.staking.v1beta1.MsgDelegate': { tagTheme: 'one', tagDisplay: 'txDelegateLabel' },
  '/cosmos.staking.v1beta1.MsgBeginRedelegate': { tagTheme: 'one', tagDisplay: 'txRedelegateLabel' },
  '/cosmos.staking.v1beta1.MsgUndelegate': { tagTheme: 'one', tagDisplay: 'txUndelegateLabel' },
  '/cosmos.staking.v1beta1.MsgCancelUnbondingDelegation': { tagTheme: 'one', tagDisplay: 'txCancelUndelegateLabel' },
  '/cosmos.staking.v1beta1.MsgCreateValidator': { tagTheme: 'one', tagDisplay: 'txCreateValidatorLabel' },
  '/cosmos.staking.v1beta1.MsgEditValidator': { tagTheme: 'one', tagDisplay: 'txEditValidatorLabel' },
  // bank
  '/cosmos.bank.v1beta1.MsgSend': { tagTheme: 'two', tagDisplay: 'txSendLabel' },
  '/cosmos.bank.v1beta1.MsgMultiSend': { tagTheme: 'two', tagDisplay: 'txMultisendLabel' },
  // crisis
  '/cosmos.crisis.v1beta1.MsgVerifyInvariant': { tagTheme: 'three', tagDisplay: 'txVerifyInvariantLabel' },
  // slashing
  '/cosmos.slashing.v1beta1.MsgUnjail': { tagTheme: 'five', tagDisplay: 'txUnjailLabel' },
  // distribution
  '/cosmos.distribution.v1beta1.MsgFundCommunityPool': { tagTheme: 'six', tagDisplay: 'txFundLabel' },
  '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress': { tagTheme: 'six', tagDisplay: 'txsetRewardAddressLabel' },
  '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward': { tagTheme: 'six', tagDisplay: 'txWithdrawRewardLabel' },
  '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission': { tagTheme: 'six', tagDisplay: 'txWithdrawCommissionLabel' },
  // governance
  '/cosmos.gov.v1beta1.MsgDeposit': { tagTheme: 'seven', tagDisplay: 'txDepositLabel' },
  '/cosmos.gov.v1.MsgDeposit': { tagTheme: 'seven', tagDisplay: 'txDepositLabel' },
  '/cosmos.gov.v1beta1.MsgVote': { tagTheme: 'seven', tagDisplay: 'txVoteLabel' },
  '/cosmos.gov.v1.MsgVote': { tagTheme: 'seven', tagDisplay: 'txVoteLabel' },
  '/cosmos.gov.v1beta1.MsgSubmitProposal': { tagTheme: 'seven', tagDisplay: 'txSubmitProposalLabel' },
  '/cosmos.gov.v1.MsgSubmitProposal': { tagTheme: 'seven', tagDisplay: 'txSubmitProposalLabel' },
  '/cosmos.gov.v1.MsgCancelProposal': { tagTheme: 'seven', tagDisplay: 'txCancelProposalLabel' },
  // ibc client
  '/ibc.core.client.v1.MsgCreateClient': { tagTheme: 'nine', tagDisplay: 'txCreateClientLabel' },
  '/ibc.core.client.v1.MsgUpdateClient': { tagTheme: 'nine', tagDisplay: 'txUpdateClientLabel' },
  '/ibc.core.client.v1.MsgUpgradeClient': { tagTheme: 'nine', tagDisplay: 'txUpgradeClientLabel' },
  '/ibc.core.client.v1.MsgSubmitMisbehaviour': { tagTheme: 'nine', tagDisplay: 'txSubmitMisbehaviourLabel' },
  // ibc channel
  '/ibc.core.channel.v1.MsgRecvPacket': { tagTheme: 'nine', tagDisplay: 'txRecvPacketLabel' },
  '/ibc.core.channel.v1.MsgAcknowledgement': { tagTheme: 'nine', tagDisplay: 'txAcknowledgementLabel' },
  '/ibc.core.channel.v1.MsgChannelCloseConfirm': { tagTheme: 'nine', tagDisplay: 'txChannelCloseConfirmLabel' },
  '/ibc.core.channel.v1.MsgChannelCloseInit': { tagTheme: 'nine', tagDisplay: 'txChannelCloseInitLabel' },
  '/ibc.core.channel.v1.MsgChannelOpenAck': { tagTheme: 'nine', tagDisplay: 'txChannelOpenAckLabel' },
  '/ibc.core.channel.v1.MsgChannelOpenConfirm': { tagTheme: 'nine', tagDisplay: 'txChannelOpenConfirmLabel' },
  '/ibc.core.channel.v1.MsgChannelOpenInit': { tagTheme: 'nine', tagDisplay: 'txChannelOpenInitLabel' },
  '/ibc.core.channel.v1.MsgChannelOpenTry': { tagTheme: 'nine', tagDisplay: 'txChannelOpenTryLabel' },
  '/ibc.core.channel.v1.MsgTimeout': { tagTheme: 'nine', tagDisplay: 'txTimeoutLabel' },
  '/ibc.core.channel.v1.MsgTimeoutOnClose': { tagTheme: 'nine', tagDisplay: 'txTimeoutOnCloseLabel' },
  // ibc connection
  '/ibc.core.connection.v1.MsgConnectionOpenAck': { tagTheme: 'nine', tagDisplay: 'txConnectionOpenAckLabel' },
  '/ibc.core.connection.v1.MsgConnectionOpenConfirm': { tagTheme: 'nine', tagDisplay: 'txConnectionOpenConfirmLabel' },
  '/ibc.core.connection.v1.MsgConnectionOpenInit': { tagTheme: 'nine', tagDisplay: 'txConnectionOpenInitLabel' },
  '/ibc.core.connection.v1.MsgConnectionOpenTry': { tagTheme: 'nine', tagDisplay: 'txConnectionOpenTryLabel' },
  // ibc transfer
  '/ibc.applications.transfer.v1.MsgTransfer': { tagTheme: 'ten', tagDisplay: 'txTransferLabel' },
  // authz
  '/cosmos.authz.v1beta1.MsgGrant': { tagTheme: 'thirteen', tagDisplay: 'MsgGrant' },
  '/cosmos.authz.v1beta1.MsgRevoke': { tagTheme: 'thirteen', tagDisplay: 'MsgRevoke' },
  '/cosmos.authz.v1beta1.MsgExec': { tagTheme: 'thirteen', tagDisplay: 'MsgExec' },
  // feegrant
  '/cosmos.feegrant.v1beta1.MsgGrantAllowance': { tagTheme: 'fourteen', tagDisplay: 'MsgGrantAllowance' },
  '/cosmos.feegrant.v1beta1.MsgRevokeAllowance': { tagTheme: 'fourteen', tagDisplay: 'MsgRevokeAllowance' },
  // vesting
  '/cosmos.vesting.v1beta1.MsgCreateVestingAccount': { tagTheme: 'fifteen', tagDisplay: 'MsgCreateVestingAccount' },
  '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount': { tagTheme: 'fifteen', tagDisplay: 'MsgCreatePeriodicVestingAccount' },
  // firmachain nft
  '/firmachain.firmachain.nft.MsgMint': { tagTheme: 'four', tagDisplay: 'txNFTMintLabel' },
  '/firmachain.nft.MsgMint': { tagTheme: 'four', tagDisplay: 'txNFTMintLabel' },
  '/firmachain.firmachain.nft.MsgTransfer': { tagTheme: 'four', tagDisplay: 'txNFTTransferLabel' },
  '/firmachain.nft.MsgTransfer': { tagTheme: 'four', tagDisplay: 'txNFTTransferLabel' },
  '/firmachain.firmachain.nft.MsgBurn': { tagTheme: 'four', tagDisplay: 'txNFTBurnLabel' },
  '/firmachain.nft.MsgBurn': { tagTheme: 'four', tagDisplay: 'txNFTBurnLabel' },
  // firmachain contract
  '/firmachain.firmachain.contract.MsgAddContractLog': { tagTheme: 'four', tagDisplay: 'txAddContractLogLabel' },
  '/firmachain.contract.MsgAddContractLog': { tagTheme: 'four', tagDisplay: 'txAddContractLogLabel' },
  '/firmachain.firmachain.contract.MsgCreateContractFile': { tagTheme: 'four', tagDisplay: 'txCreateContractFileLabel' },
  '/firmachain.contract.MsgCreateContractFile': { tagTheme: 'four', tagDisplay: 'txCreateContractFileLabel' },
  // firmachain token
  '/firmachain.firmachain.token.MsgCreateToken': { tagTheme: 'two', tagDisplay: 'txTokenCreateLabel' },
  '/firmachain.token.MsgCreateToken': { tagTheme: 'two', tagDisplay: 'txTokenCreateLabel' },
  '/firmachain.firmachain.token.MsgMint': { tagTheme: 'two', tagDisplay: 'txTokenMintLabel' },
  '/firmachain.token.MsgMint': { tagTheme: 'two', tagDisplay: 'txTokenMintLabel' },
  '/firmachain.firmachain.token.MsgBurn': { tagTheme: 'four', tagDisplay: 'txTokenBurnLabel' },
  '/firmachain.token.MsgBurn': { tagTheme: 'four', tagDisplay: 'txTokenBurnLabel' },
  '/firmachain.firmachain.token.MsgUpdateTokenURI': { tagTheme: 'three', tagDisplay: 'txTokenUpdateURILabel' },
  '/firmachain.token.MsgUpdateTokenURI': { tagTheme: 'three', tagDisplay: 'txTokenUpdateURILabel' },
  // cosmwasm
  '/cosmwasm.wasm.v1.MsgStoreCode': { tagTheme: 'nine', tagDisplay: 'txCosmwasmStoreCodeLabel' },
  '/cosmwasm.wasm.v1.MsgInstantiateContract': { tagTheme: 'nine', tagDisplay: 'txCosmwasmInstantiateContractLabel' },
  '/cosmwasm.wasm.v1.MsgInstantiateContract2': { tagTheme: 'nine', tagDisplay: 'txCosmwasmInstantiateContractLabel2' },
  '/cosmwasm.wasm.v1.MsgExecuteContract': { tagTheme: 'nine', tagDisplay: 'txCosmwasmExecuteContractLabel' },
  '/cosmwasm.wasm.v1.MsgMigrateContract': { tagTheme: 'nine', tagDisplay: 'txCosmwasmMigrateContractLabel' },
  '/cosmwasm.wasm.v1.MsgUpdateAdmin': { tagTheme: 'nine', tagDisplay: 'txCosmwasmUpdateAdminLabel' },
  '/cosmwasm.wasm.v1.MsgClearAdmin': { tagTheme: 'nine', tagDisplay: 'txCosmwasmClearAdminLabel' },
  '/cosmwasm.wasm.v1.MsgUpdateContractLabel': { tagTheme: 'nine', tagDisplay: 'txCosmwasmUpdateLabelLabel' },
};

const DEFAULT_TAG_INFO: TagInfo = { tagDisplay: 'txUnknownLabel', tagTheme: 'zero' };

export const getTagInfoByType = (type: string): TagInfo => TAG_MAP[type] ?? DEFAULT_TAG_INFO;
