/* eslint-disable max-len */
import * as R from 'ramda';
import {
  useRecoilState,
  SetterOrUpdater,
} from 'recoil';
import Big from 'big.js';
import {
  useMarketDataQuery,
  MarketDataQuery,
} from '@graphql/types';
import { chainConfig } from '@configs';
import {
  writeMarket,
} from '@recoil/market';
import { AtomState } from '@recoil/market/types';
import { getDenom } from '@utils/get_denom';
import { formatToken } from '@utils/format_token';

export const useMarketRecoil = () => {
  const [market, setMarket] = useRecoilState(writeMarket) as [AtomState, SetterOrUpdater<AtomState>];

  useMarketDataQuery(
    {
      onCompleted: (data) => {
        if (data) {
          setMarket(formatUseChainIdQuery(data));
        }
      },
    },
  );

  const formatUseChainIdQuery = (data: MarketDataQuery): AtomState => {
    let {
      communityPool, price, marketCap,
    } = market;

    const [communityPoolCoin] = R.pathOr([], ['communityPool', 0, 'coins'], data).filter((x) => x.denom === chainConfig.primaryTokenUnit);
    const inflation = R.pathOr(0, ['inflation', 0, 'value'], data);

    const rawSupplyAmount = getDenom(
      R.pathOr([], ['actionTotalSupply', 'coins'], data),
      chainConfig.primaryTokenUnit,
    ).amount;

    const supply = formatToken(
      rawSupplyAmount,
      chainConfig.primaryTokenUnit,
    );

    if (communityPoolCoin) {
      communityPool = formatToken(communityPoolCoin.amount, communityPoolCoin.denom);
    }

    const bondedTokens = R.pathOr(1, ['bondedTokens', 0, 'bonded_tokens'], data);
    const communityTax = R.pathOr('0', ['distributionParams', 0, 'params', 'community_tax'], data);

    const inflationWithCommunityTax = Big(1).minus(communityTax).times(inflation).toPrecision(2);
    const apr = Big(rawSupplyAmount).times(inflationWithCommunityTax).div(bondedTokens).toNumber();

    const chainVer = R.pathOr(0, ['version', 0, 'chainVer'], data);
    const sdkVer = R.pathOr(0, ['version', 0, 'sdkVer'], data);

    return ({
      price,
      supply,
      marketCap,
      inflation,
      communityPool,
      apr,
      chainVer,
      sdkVer
    });
  };
};
