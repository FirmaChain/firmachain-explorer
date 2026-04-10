import { AtomState, BigDipperNetworksState } from './types';

export const selectBigDipperNetworksState = (state: BigDipperNetworksState): AtomState => ({
    networks: state.networks,
    selected: state.selected
});

export const readNetworks = (state: BigDipperNetworksState) => state.networks;
export const readSelectedNetwork = (state: BigDipperNetworksState) => state.selected;
export const writeNetworks = (state: BigDipperNetworksState) => state.setNetworks;
export const writeSelectedNetwork = (state: BigDipperNetworksState) => state.setSelectedNetwork;
