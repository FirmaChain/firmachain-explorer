import { chainConfig } from '@configs';
import { useValidatorAddressesQuery, ValidatorAddressesQuery } from '@graphql/types';
import { useDesmosProfile } from '@hooks';
import * as R from 'ramda';

import { useProfilesStore } from '../profiles/store';
import { useValidatorsStore } from './store';

const formatAndSetValidatorsAddressList = (data: ValidatorAddressesQuery) => {
    const entries: Array<{
        consensusAddress: string;
        validator: {
            delegator: string;
            validator: string;
        };
    }> = [];
    const profileEntries: Array<{
        delegatorAddress: string;
        profile: {
            moniker: string;
            imageUrl?: string;
        };
    }> = [];

    data?.validator
        ?.filter((item) => item.validatorInfo)
        .forEach((item) => {
            const validatorAddress = item.validatorInfo.operatorAddress;
            const delegatorAddress = item.validatorInfo.selfDelegateAddress;
            const consensusAddress = item.validatorInfo.consensusAddress;
            const imageUrl = R.pathOr('', ['validatorDescriptions', 0, 'avatarUrl'], item);
            const moniker = R.pathOr('', ['validatorDescriptions', 0, 'moniker'], item);

            entries.push({
                consensusAddress,
                validator: {
                    delegator: delegatorAddress,
                    validator: validatorAddress
                }
            });

            profileEntries.push({
                delegatorAddress,
                profile: {
                    moniker,
                    imageUrl
                }
            });
        });

    useValidatorsStore.getState().setValidators(entries);
    useProfilesStore.getState().setProfileEntries(profileEntries);
};

const setProfiles = async (data: ValidatorAddressesQuery, fetchDesmosProfile: (address: string) => Promise<any>) => {
    if (!chainConfig.extra.profile) {
        return;
    }

    const profileRequests: Array<Promise<any>> = [];

    data?.validator
        ?.filter((item) => item.validatorInfo)
        .forEach((item) => {
            const delegatorAddress = item.validatorInfo.selfDelegateAddress;
            profileRequests.push(fetchDesmosProfile(delegatorAddress));
        });

    const profiles = await Promise.allSettled(profileRequests);
    const profileEntries: Array<{
        delegatorAddress: string;
        profile: {
            moniker: string;
            imageUrl?: string;
        };
    }> = [];

    data?.validator
        ?.filter((item) => item.validatorInfo)
        .forEach((item, index) => {
            const delegatorAddress = item.validatorInfo.selfDelegateAddress;
            const profile = R.pathOr(undefined, [index, 'value'], profiles);

            if (profile) {
                const moniker = R.pathOr(undefined, ['nickname'], profile) || R.pathOr('', ['validatorDescriptions', 0, 'moniker'], item);
                const imageUrl = R.pathOr('', ['imageUrl'], profile) || R.pathOr('', ['validatorDescriptions', 0, 'avatarUrl'], item);

                profileEntries.push({
                    delegatorAddress,
                    profile: {
                        moniker,
                        imageUrl
                    }
                });
            }
        });

    useProfilesStore.getState().setProfileEntries(profileEntries);
};

export const useValidatorRecoil = () => {
    const loading = useValidatorsStore((state) => state.loading);
    const setLoading = useValidatorsStore((state) => state.setLoading);

    const { fetchDesmosProfile, formatDesmosProfile } = useDesmosProfile({
        onComplete: (data) => {
            return formatDesmosProfile(data);
        }
    });

    useValidatorAddressesQuery({
        onError: (error) => {
            console.error(error.message);
            setLoading(false);
        },
        onCompleted: async (data) => {
            setLoading(false);
            formatAndSetValidatorsAddressList(data);
            await setProfiles(data, fetchDesmosProfile);
        }
    });

    return {
        loading
    };
};
