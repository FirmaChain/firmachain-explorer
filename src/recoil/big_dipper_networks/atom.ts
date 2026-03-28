import { chainConfig } from '@configs';
import { atom } from 'recoil';

import { AtomState } from './types';

const initialState: AtomState = {
    networks: [],
    selected: chainConfig.network
};

export const atomState = atom<AtomState>({
    key: 'bigDipperNetworks',
    default: initialState
});
