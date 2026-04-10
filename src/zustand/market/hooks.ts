import { chainConfig } from '@configs';
import { useMarketDataQuery } from '@graphql/types';

import { readMarket, writeMarket } from './selectors';
import { useMarketStore } from './store';
import { formatMarketData } from './utils';

export const useMarketRecoil = () => {
    const setMarket = useMarketStore(writeMarket);

    useMarketDataQuery({
        variables: {
            denom: chainConfig?.primaryTokenUnit
        },
        onCompleted: async (data) => {
            if (data) {
                const currentMarket = readMarket(useMarketStore.getState());
                setMarket(await formatMarketData(data, currentMarket));
            }
        }
    });
};
