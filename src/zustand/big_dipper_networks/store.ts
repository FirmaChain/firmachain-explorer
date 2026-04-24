import { chainConfig } from '@configs';
import { BigDipperNetwork } from '@models';
import { create } from 'zustand';

import { AtomState, BigDipperNetworksState, Networks, Selected } from './types';

const NETWORK_LIST_API = 'https://raw.githubusercontent.com/forbole/big-dipper-networks/main/networks.json';

export const initialState: AtomState = {
    networks: [],
    selected: chainConfig.network
};

const formatNetworks = (data: unknown[]): Networks => {
    return data
        .map((item) => BigDipperNetwork.fromJson(item as any))
        .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
};

export const useBigDipperNetworksStore = create<BigDipperNetworksState>((set, get) => ({
    ...initialState,
    hasInitialized: false,
    isInitializing: false,
    setNetworks: (networks: Networks) => {
        set({ networks });
    },
    setSelectedNetwork: (selected: Selected) => {
        set({ selected });
    },
    initializeNetworks: async () => {
        if (get().hasInitialized || get().isInitializing) {
            return;
        }

        set({ isInitializing: true });

        let data: unknown[] = [];

        try {
            const response = await fetch(NETWORK_LIST_API);
            const results = await response.json();

            data = Array.isArray(results?.data) ? results.data : [];
        } catch (error) {
            console.error(error);
        }

        set({
            networks: formatNetworks(data),
            hasInitialized: true,
            isInitializing: false
        });
    },
    reset: () => {
        set({
            ...initialState,
            hasInitialized: false,
            isInitializing: false
        });
    }
}));
