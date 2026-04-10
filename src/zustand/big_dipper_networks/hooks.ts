import { useEffect } from 'react';
import { ChainIdQuery, useChainIdQuery } from '@graphql/types';
import * as R from 'ramda';

import { readSelectedNetwork, writeSelectedNetwork } from './selectors';
import { useBigDipperNetworksStore } from './store';

const formatUseChainIdQuery = (data: ChainIdQuery, fallback: string) => {
    return R.pathOr(fallback, ['genesis', 0, 'chainId'], data);
};

export const useBigDipperNetworksRecoil = () => {
    const initializeNetworks = useBigDipperNetworksStore((state) => state.initializeNetworks);
    const selectedNetwork = useBigDipperNetworksStore(readSelectedNetwork);
    const setSelectedNetwork = useBigDipperNetworksStore(writeSelectedNetwork);

    useEffect(() => {
        void initializeNetworks();
    }, [initializeNetworks]);

    useChainIdQuery({
        onError: (error) => {
            console.error(error?.message);
        },
        onCompleted: (data) => {
            setSelectedNetwork(formatUseChainIdQuery(data, selectedNetwork));
        }
    });
};
