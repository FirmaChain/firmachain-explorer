import numeral from 'numeral';

export const formatMarket = (data: {
  marketCap: number;
  communityPool: TokenUnit;
  supply: TokenUnit;
  inflation: number;
  chainVer: string;
  sdkVer: string;
}) => {
  return ([
    {
      key: 'chainName',
      data: `${data.chainVer}`,
    },
    {
      key: 'sdkName',
      data: `${data.sdkVer}`,
    },
    {
      key: 'supply',
      data: `${numeral(data.supply.value).format('0,0.[00]')} ${data.supply.denom.toUpperCase()}`,
    },
    {
      key: 'communityPool',
      data: `${numeral(data.communityPool.value).format('0,0.00')} ${data.communityPool.denom.toUpperCase()}`,
    },
  ]);
};
