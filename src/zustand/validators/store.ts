import { create } from 'zustand';

import { AtomState, ValidatorRecord, ValidatorsStoreState } from './types';

const removeKey = <T extends Record<string, unknown>>(record: T, key: string): T => {
    const nextRecord = { ...record };
    delete nextRecord[key];
    return nextRecord;
};

export const useValidatorsStore = create<ValidatorsStoreState>((set) => ({
    validators: {},
    loading: true,
    setLoading: (loading: boolean) => {
        set({ loading });
    },
    setValidator: (consensusAddress: string, validator: AtomState) => {
        if (!consensusAddress) {
            return;
        }

        if (validator === null) {
            set((state) => ({
                validators: removeKey(state.validators, consensusAddress)
            }));
            return;
        }

        set((state) => ({
            validators: {
                ...state.validators,
                [consensusAddress]: validator
            }
        }));
    },
    setValidators: (entries: Array<{ consensusAddress: string; validator: ValidatorRecord }>) => {
        if (!entries.length) {
            return;
        }

        set((state) => ({
            validators: {
                ...state.validators,
                ...entries.reduce<Record<string, ValidatorRecord>>((acc, entry) => {
                    if (entry.consensusAddress) {
                        acc[entry.consensusAddress] = entry.validator;
                    }

                    return acc;
                }, {})
            }
        }));
    },
    reset: () => {
        set({
            validators: {},
            loading: true
        });
    }
}));
