import { useValidatorsStore } from './store';
import { AtomState, ValidatorsStoreState } from './types';

export const selectValidatorsState = (state: ValidatorsStoreState) => state.validators;

export const readValidator =
    (address: string) =>
    (state: ValidatorsStoreState): AtomState => {
        return state.validators[address] ?? null;
    };

export const writeValidator = (address: string) => (validator: AtomState) => {
    useValidatorsStore.getState().setValidator(address, validator);
};
