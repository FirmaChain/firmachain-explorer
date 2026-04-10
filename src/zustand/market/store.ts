import { create } from 'zustand';

import { AtomState, MarketStoreState } from './types';

export const initialState: AtomState = {
    price: null,
    supply: {
        value: '0',
        displayDenom: '',
        baseDenom: '',
        exponent: 0
    },
    marketCap: null,
    inflation: 0,
    communityPool: {
        value: '0',
        displayDenom: '',
        baseDenom: '',
        exponent: 0
    },
    apr: 0,
    chainVer: 'N/A',
    sdkVer: 'N/A'
};

export const useMarketStore = create<MarketStoreState>((set) => ({
    ...initialState,
    setMarket: (market: Partial<AtomState> | AtomState) => {
        set((state) => ({
            ...state,
            ...market
        }));
    },
    resetMarket: () => {
        set({ ...initialState });
    }
}));
