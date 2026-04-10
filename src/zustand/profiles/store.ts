import { ENV } from '@configs/env';
import { create } from 'zustand';

import { useValidatorsStore } from '../validators/store';
import { AtomState, ProfilesStoreState, ValidatorsIdentityList } from './types';
import { getProfile, resolveDelegatorAddress, toProfileAtomState } from './utils';

const removeKey = <T extends Record<string, unknown>>(record: T, key: string): T => {
    const nextRecord = { ...record };
    delete nextRecord[key];
    return nextRecord;
};

export const useProfilesStore = create<ProfilesStoreState>((set, get) => ({
    profiles: {},
    pendingProfiles: {},
    validatorsIdentityList: null,
    validatorsIdentityListLoaded: false,
    validatorsIdentityListLoading: false,
    validatorsVersion: 0,
    setProfileEntry: (delegatorAddress: string, profile: AtomState) => {
        if (!delegatorAddress) {
            return;
        }

        set((state) => ({
            profiles: {
                ...state.profiles,
                [delegatorAddress]: profile
            }
        }));
    },
    setProfileEntries: (entries: Array<{ delegatorAddress: string; profile: AtomState }>) => {
        if (!entries.length) {
            return;
        }

        set((state) => ({
            profiles: {
                ...state.profiles,
                ...entries.reduce<Record<string, AtomState>>((acc, entry) => {
                    if (entry.delegatorAddress) {
                        acc[entry.delegatorAddress] = entry.profile;
                    }

                    return acc;
                }, {})
            }
        }));
    },
    setProfileFromAvatar: (address: string, profile: AvatarName | null) => {
        const delegatorAddress = resolveDelegatorAddress(address);

        if (!delegatorAddress) {
            return;
        }

        if (profile === null) {
            get().setProfileEntry(delegatorAddress, false);
            return;
        }

        get().setProfileEntry(delegatorAddress, {
            moniker: profile.name,
            imageUrl: profile.imageUrl
        });
    },
    fetchProfileByDelegatorAddress: async (delegatorAddress: string, fallbackAddress = delegatorAddress) => {
        if (!delegatorAddress) {
            return null;
        }

        const currentProfile = get().profiles[delegatorAddress];

        if (currentProfile !== undefined && currentProfile !== null) {
            return currentProfile;
        }

        if (get().pendingProfiles[delegatorAddress]) {
            return currentProfile ?? null;
        }

        set((state) => ({
            profiles: {
                ...state.profiles,
                [delegatorAddress]: state.profiles[delegatorAddress] ?? null
            },
            pendingProfiles: {
                ...state.pendingProfiles,
                [delegatorAddress]: true
            }
        }));

        try {
            const fetchedProfile = await getProfile(delegatorAddress);
            const profileState = toProfileAtomState(fetchedProfile, fallbackAddress);

            set((state) => ({
                profiles: {
                    ...state.profiles,
                    [delegatorAddress]: profileState
                },
                pendingProfiles: removeKey(state.pendingProfiles, delegatorAddress)
            }));

            return profileState;
        } catch (error) {
            console.error(error);

            set((state) => ({
                profiles: {
                    ...state.profiles,
                    [delegatorAddress]: false
                },
                pendingProfiles: removeKey(state.pendingProfiles, delegatorAddress)
            }));

            return false;
        }
    },
    fetchProfileByAddress: async (address: string) => {
        const delegatorAddress = resolveDelegatorAddress(address);
        return get().fetchProfileByDelegatorAddress(delegatorAddress, address);
    },
    fetchProfilesByAddress: async (addresses: string[]) => {
        await Promise.allSettled(addresses.map((address) => get().fetchProfileByAddress(address)));
    },
    fetchValidatorsIdentityList: async () => {
        const validatorsIdentityListUrl = ENV.VALIDATORS_IDENTITY_LIST_URL;

        if (!validatorsIdentityListUrl || get().validatorsIdentityListLoaded || get().validatorsIdentityListLoading) {
            return;
        }

        set({ validatorsIdentityListLoading: true });

        try {
            const response = await fetch(validatorsIdentityListUrl);

            if (!response.ok) {
                throw new Error(`Failed to load validators identity list: ${response.status}`);
            }

            const data = (await response.json()) as ValidatorsIdentityList;

            set({
                validatorsIdentityList: data,
                validatorsIdentityListLoaded: true,
                validatorsIdentityListLoading: false
            });
        } catch (error) {
            console.error('Error fetching validators identity list:', error);

            set({
                validatorsIdentityListLoaded: true,
                validatorsIdentityListLoading: false
            });
        }
    },
    bumpValidatorsVersion: () => {
        set((state) => ({
            validatorsVersion: state.validatorsVersion + 1
        }));
    },
    reset: () => {
        set({
            profiles: {},
            pendingProfiles: {},
            validatorsIdentityList: null,
            validatorsIdentityListLoaded: false,
            validatorsIdentityListLoading: false,
            validatorsVersion: 0
        });
    }
}));

useValidatorsStore.subscribe((state, previousState) => {
    if (state.validators !== previousState.validators) {
        useProfilesStore.getState().bumpValidatorsVersion();
    }
});
