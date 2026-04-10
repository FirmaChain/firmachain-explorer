import { BigDipperNetwork } from '@models';

export type Networks = BigDipperNetwork[];
export type Selected = string;

export type AtomState = {
    networks: Networks;
    selected: Selected;
};

export type BigDipperNetworksState = AtomState & {
    hasInitialized: boolean;
    isInitializing: boolean;
    setNetworks: (networks: Networks) => void;
    setSelectedNetwork: (selected: Selected) => void;
    initializeNetworks: () => Promise<void>;
    reset: () => void;
};
