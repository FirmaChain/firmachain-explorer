/* eslint-disable max-len */
import * as R from 'ramda';
import {
  useRecoilState,
  SetterOrUpdater,
} from 'recoil';
import Big from 'big.js';
import Axios from 'axios';

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
      onCompleted: async(data) => {
        if (data) {
          setMarket(await formatUseChainIdQuery(data));
        }
      },
    },
  );

  const getChainVersion = async () => {
    try {
      const axios = Axios.create({
        baseURL: process.env.NEXT_PUBLIC_REST_CHAIN_URL,
        headers: {Accept: 'application/json'},
        timeout: 15000,
      });

      const path = '/cosmos/base/tendermint/v1beta1/node_info';
      const result = await axios.get(path);

      const nodeInfo = result.data.default_node_info;
      const appInfo = result.data.application_version;

      const chainId: string = nodeInfo.network;
      const appVersion: string = appInfo.version;
      let cosmosVersion: string = '';

      for (let i = 0; i < appInfo.build_deps.length; i++) {
        const dep = appInfo.build_deps[i];

        if (dep.path == 'github.com/cosmos/cosmos-sdk') {
          cosmosVersion = dep.version;
          break;
        }
      }

      return { chainId, appVersion, cosmosVersion };
    } catch (error) {
      return null;
    }
  };

  const formatUseChainIdQuery = async(data: MarketDataQuery): Promise<AtomState> => {
    let {
      communityPool, price, marketCap,
    } = market;

    const [communityPoolCoin] = R.pathOr([], ['communityPool', 0, 'coins'], data).filter((x) => x.denom === chainConfig.primaryTokenUnit);
    const inflation = R.pathOr(0, ['actionInflation', 'amount'], data);

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

    let chainVer = 'N/A';
    let sdkVer = 'N/A';
    const version = await getChainVersion();

    if(version !== null){
      chainVer = version.appVersion;
      sdkVer = version.cosmosVersion;
    }

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
