import { AtomState, MarketStoreState } from './types';

export const selectMarketState = (state: MarketStoreState): AtomState => ({
    price: state.price,
    supply: state.supply,
    marketCap: state.marketCap,
    inflation: state.inflation,
    communityPool: state.communityPool,
    apr: state.apr,
    chainVer: state.chainVer,
    sdkVer: state.sdkVer
});

export const readMarket = (state: MarketStoreState): AtomState => state;
export const writeMarket = (state: MarketStoreState) => state.setMarket;
