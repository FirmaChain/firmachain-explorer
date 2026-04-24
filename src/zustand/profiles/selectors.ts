import { useProfilesStore } from './store';
import { AtomState as ProfileAtomState, ProfilesStoreState } from './types';
import { applyValidatorIdentity, createProfileView, resolveDelegatorAddress, validatorToDelegatorAddress } from './utils';

const touchValidatorsVersion = (state: ProfilesStoreState) => {
    return state.validatorsVersion;
};

export const selectProfilesState = (state: ProfilesStoreState) => state.profiles;

export const readDelegatorAddress =
    (address: string) =>
    (state: ProfilesStoreState): string => {
        touchValidatorsVersion(state);
        return resolveDelegatorAddress(address);
    };

export const readDelegatorAddresses =
    (addresses: string[]) =>
    (state: ProfilesStoreState): string[] => {
        touchValidatorsVersion(state);
        return addresses.map((address) => resolveDelegatorAddress(address));
    };

export const readProfileExist =
    (address: string) =>
    (state: ProfilesStoreState): ProfileAtomState => {
        touchValidatorsVersion(state);
        const delegatorAddress = resolveDelegatorAddress(address);
        return delegatorAddress ? (state.profiles[delegatorAddress] ?? null) : null;
    };

export const readProfilesExist =
    (addresses: string[]) =>
    (state: ProfilesStoreState): ProfileAtomState[] => {
        touchValidatorsVersion(state);
        return addresses.map((address) => {
            const delegatorAddress = resolveDelegatorAddress(address);
            return delegatorAddress ? (state.profiles[delegatorAddress] ?? null) : null;
        });
    };

export const readProfile =
    (address: string) =>
    (state: ProfilesStoreState): AvatarName => {
        const rawProfile = readProfileExist(address)(state);
        const profile = createProfileView(address, rawProfile);
        return applyValidatorIdentity(profile, address, state.validatorsIdentityList);
    };

export const readProfiles =
    (addresses: string[]) =>
    (state: ProfilesStoreState): AvatarName[] => {
        return addresses.map((address) => {
            const rawProfile = readProfileExist(address)(state);
            const profile = createProfileView(address, rawProfile);
            return applyValidatorIdentity(profile, address, state.validatorsIdentityList);
        });
    };

export const writeProfile = (address: string) => (profile: AvatarName | null) => {
    useProfilesStore.getState().setProfileFromAvatar(address, profile);
};

export { validatorToDelegatorAddress };
