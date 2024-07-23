import chainConfigTestnet from './chain_config.testnet.json';
import chainConfigMainnet from './chain_config.mainnet.json';
import generalConfig from './general_config.json';

/**
 * Helper function to return different configs based on the same chain
 * @returns config
 */
const getChainConfig = () => {
  const chainType = process.env.NEXT_PUBLIC_CHAIN_TYPE || process.env.NEXT_PUBLIC_CHAIN_STATUS;
  if (chainType === 'mainnet') {
    return chainConfigMainnet;
  }
  return chainConfigTestnet;
};

const chainConfig = getChainConfig();
const ibcConfig = {
  'ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B': {
    display: 'osmo',
    exponent: 6,
    explorer: 'https://www.mintscan.io/osmosis/address',
  },
  'ibc/FA0006F056DB6719B8C16C551FC392B62F5729978FC0B125AC9A432DBB2AA1A5': {
    display: 'atom',
    exponent: 6,
    explorer: 'https://www.mintscan.io/cosmos/address',
  },
};

const tokenConfig = {
  uuet: {
    display: 'uet',
    exponent: 6,
  },
};

export { chainConfig, generalConfig, ibcConfig, tokenConfig };
