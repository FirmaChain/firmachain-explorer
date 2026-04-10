export type AtomState = {
    price: number | null;
    supply: TokenUnit;
    marketCap: number | null;
    inflation: number;
    communityPool: TokenUnit;
    apr: number;
    chainVer: string;
    sdkVer: string;
};

export type MarketStoreState = AtomState & {
    setMarket: (market: Partial<AtomState> | AtomState) => void;
    resetMarket: () => void;
};
