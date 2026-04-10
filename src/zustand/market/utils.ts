import { chainConfig } from '@configs';
import { ENV } from '@configs/env';
import { MarketDataQuery } from '@graphql/types';
import { formatToken } from '@utils/format_token';
import { getDenom } from '@utils/get_denom';
import Axios from 'axios';
import Big from 'big.js';
import * as R from 'ramda';

import { AtomState } from './types';

export const getChainVersion = async () => {
    try {
        const axios = Axios.create({
            baseURL: ENV.REST_CHAIN_URL,
            headers: { Accept: 'application/json' },
            timeout: 15000
        });

        const path = '/cosmos/base/tendermint/v1beta1/node_info';
        const result = await axios.get(path);

        const nodeInfo = result.data.default_node_info;
        const appInfo = result.data.application_version;

        const chainId: string = nodeInfo.network;
        const appVersion: string = 'v' + appInfo.version;
        let cosmosVersion = '';

        for (let i = 0; i < appInfo.build_deps.length; i += 1) {
            const dep = appInfo.build_deps[i];

            if (dep.path === 'github.com/cosmos/cosmos-sdk') {
                cosmosVersion = dep.version;
                break;
            }
        }

        return { chainId, appVersion, cosmosVersion };
    } catch (error) {
        return null;
    }
};

export const formatMarketData = async (data: MarketDataQuery, currentMarket: AtomState): Promise<AtomState> => {
    let { communityPool, price, marketCap } = currentMarket;

    const communityPoolCoins = R.pathOr([], ['communityPool', 0, 'coins'], data) as Array<{ amount: string; denom: string }>;
    const [communityPoolCoin] = communityPoolCoins.filter((item) => item.denom === chainConfig.primaryTokenUnit);
    const inflation = R.pathOr(0, ['inflation', 0, 'value'], data) as number;

    const rawSupplyAmount = getDenom(R.pathOr([], ['supply', 0], data), chainConfig.primaryTokenUnit).amount;
    const supply = formatToken(rawSupplyAmount, chainConfig.primaryTokenUnit);

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

    if (version !== null) {
        chainVer = version.appVersion;
        sdkVer = version.cosmosVersion;
    }

    return {
        price,
        supply,
        marketCap,
        inflation,
        communityPool,
        apr,
        chainVer,
        sdkVer
    };
};
