import { useEffect, useMemo } from 'react';
import { chainConfig } from '@configs';

import { readDelegatorAddress, readProfileExist, selectProfilesState } from './selectors';
import { useProfilesStore } from './store';
import { applyValidatorIdentity, createProfileView, resolveDelegatorAddress } from './utils';

export const useProfileRecoil = (address: string): AvatarName | null => {
    const delegatorAddress = useProfilesStore(readDelegatorAddress(address));
    const rawProfile = useProfilesStore(readProfileExist(address));
    const validatorsIdentityList = useProfilesStore((state) => state.validatorsIdentityList);
    const fetchProfileByAddress = useProfilesStore((state) => state.fetchProfileByAddress);
    const fetchValidatorsIdentityList = useProfilesStore((state) => state.fetchValidatorsIdentityList);
    const profile = useMemo(() => {
        const view = createProfileView(address, rawProfile);
        return applyValidatorIdentity(view, address, validatorsIdentityList);
    }, [address, rawProfile, validatorsIdentityList]);

    useEffect(() => {
        void fetchValidatorsIdentityList();
    }, [fetchValidatorsIdentityList]);

    useEffect(() => {
        if (chainConfig.extra.profile && delegatorAddress && rawProfile === null) {
            void fetchProfileByAddress(address);
        }
    }, [address, delegatorAddress, fetchProfileByAddress, rawProfile]);

    return profile;
};

export const useProfilesRecoil = (addresses: string[]): AvatarName[] => {
    const profilesState = useProfilesStore(selectProfilesState);
    const validatorsIdentityList = useProfilesStore((state) => state.validatorsIdentityList);
    const validatorsVersion = useProfilesStore((state) => state.validatorsVersion);
    const fetchProfilesByAddress = useProfilesStore((state) => state.fetchProfilesByAddress);
    const fetchValidatorsIdentityList = useProfilesStore((state) => state.fetchValidatorsIdentityList);
    const addressesKey = addresses.join('|');

    const delegatorAddresses = useMemo(() => {
        return addresses.map((address) => resolveDelegatorAddress(address));
    }, [addressesKey, validatorsVersion]);

    const rawProfiles = useMemo(() => {
        return delegatorAddresses.map((delegatorAddress) => (delegatorAddress ? (profilesState[delegatorAddress] ?? null) : null));
    }, [delegatorAddresses, profilesState]);

    const profiles = useMemo(() => {
        return addresses.map((address, index) => {
            const view = createProfileView(address, rawProfiles[index]);
            return applyValidatorIdentity(view, address, validatorsIdentityList);
        });
    }, [addressesKey, rawProfiles, validatorsIdentityList]);

    const delegatorAddressesKey = delegatorAddresses.join('|');
    const rawProfilesKey = rawProfiles.map((item) => JSON.stringify(item)).join('|');

    useEffect(() => {
        void fetchValidatorsIdentityList();
    }, [fetchValidatorsIdentityList]);

    useEffect(() => {
        if (chainConfig.extra.profile) {
            void fetchProfilesByAddress(addresses);
        }
    }, [addressesKey, delegatorAddressesKey, fetchProfilesByAddress, rawProfilesKey]);

    return profiles;
};
