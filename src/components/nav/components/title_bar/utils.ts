import { formatNumber } from '@utils/format_token';

export const formatMarket = (data: {
  marketCap: number;
  communityPool: TokenUnit;
  supply: TokenUnit;
  inflation: number;
  apr: number;
  chainVer:string;
  sdkVer:string
}) => {
  return ([
    // {
    //   key: 'marketCap',
    //   data: marketCap,
    // },
    {
      key: 'chainName',
      data: data.chainVer,
    },
    {
      key: 'sdkName',
      data: data.sdkVer,
    },
    // {
    //   key: 'inflation',
    //   data: `${formatNumber(Big(data.inflation).times(100).toPrecision(), 0)}%`,
    // },
    // {
    //   key: 'apr',
    //   data: `${formatNumber(Big(data.apr).times(100).toPrecision(), 2)}%`,
    // },
    {
      key: 'supply',
      data: `${formatNumber(data.supply.value, 2)} ${data.supply.displayDenom.toUpperCase()}`,
    },
    {
      key: 'communityPool',
      data: `${formatNumber(data.communityPool.value, 2)} ${data.communityPool.displayDenom.toUpperCase()}`,
    },
  ]);
};
