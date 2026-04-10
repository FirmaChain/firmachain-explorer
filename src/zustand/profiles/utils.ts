import { chainConfig } from '@configs';
import { DesmosProfileQuery } from '@graphql/desmos_profile';
import { DesmosProfileDocument, DesmosProfileLinkDocument } from '@graphql/desmos_profile_graphql';
import { bech32 } from 'bech32';
import axios from 'axios';

import { useValidatorsStore } from '../validators/store';
import { AtomState, ValidatorsIdentityList } from './types';

const PROFILE_API = 'https://gql.mainnet.desmos.network/v1/graphql';

const isConsensusAddress = (address: string) => {
    return new RegExp(`^(${chainConfig.prefix.consensus})`).test(address);
};

const isValidatorAddress = (address: string) => {
    return new RegExp(`^(${chainConfig.prefix.validator})`).test(address);
};

const isDelegatorAddress = (address: string) => {
    return new RegExp(`^(${chainConfig.prefix.account})`).test(address);
};

export const validatorToDelegatorAddress = (address: string) => {
    const decode = bech32.decode(address).words;
    return bech32.encode(chainConfig.prefix.account, decode);
};

export const resolveDelegatorAddress = (address: string): string => {
    let selectedAddress = '';

    if (isConsensusAddress(address)) {
        const validator = useValidatorsStore.getState().validators[address] ?? null;

        if (validator) {
            selectedAddress = validator.delegator;
        }
    } else if (isValidatorAddress(address)) {
        selectedAddress = validatorToDelegatorAddress(address);
    } else if (isDelegatorAddress(address)) {
        selectedAddress = address;
    }

    return selectedAddress;
};

export const resolveReturnAddress = (address: string): string => {
    let selectedAddress = address;

    if (isConsensusAddress(address)) {
        const validator = useValidatorsStore.getState().validators[address] ?? null;

        if (validator) {
            selectedAddress = validator.validator;
        }
    }

    return selectedAddress;
};

export const createProfileView = (address: string, state: AtomState): AvatarName => {
    const returnAddress = resolveReturnAddress(address);
    const moniker = state && state !== false ? state.moniker : address;
    const imageUrl = state && state !== false ? state.imageUrl || '' : '';

    return {
        address: returnAddress,
        name: moniker && moniker.length ? moniker : address,
        imageUrl
    };
};

export const applyValidatorIdentity = (
    profile: AvatarName,
    operatorAddress: string,
    validatorsIdentityList: ValidatorsIdentityList | null
): AvatarName => {
    if (!validatorsIdentityList?.profileInfos) {
        return profile;
    }

    const profileInfo = validatorsIdentityList.profileInfos.find((item) => item.operatorAddress === operatorAddress);

    if (!profileInfo?.url) {
        return profile;
    }

    return {
        ...profile,
        imageUrl: profileInfo.url
    };
};

export const toProfileAtomState = (profile: DesmosProfile | null, fallbackAddress: string): AtomState => {
    if (profile === null) {
        return false;
    }

    return {
        moniker: profile.dtag ? `@${profile.dtag}` : fallbackAddress,
        imageUrl: profile.imageUrl
    };
};

const fetchDesmos = async (address: string) => {
    const { data } = await axios.post(PROFILE_API, {
        variables: {
            address
        },
        query: DesmosProfileDocument
    });

    return data.data;
};

const fetchLink = async (address: string) => {
    const { data } = await axios.post(PROFILE_API, {
        variables: {
            address
        },
        query: DesmosProfileLinkDocument
    });

    return data.data;
};

const fetchDesmosProfile = async (address: string) => {
    let data: DesmosProfileQuery = {
        profile: []
    };

    try {
        if (address.includes('desmos')) {
            data = await fetchDesmos(address);
        }

        if (!data.profile.length) {
            data = await fetchLink(address);
        }

        return formatDesmosProfile(data);
    } catch (error) {
        return null;
    }
};

const formatDesmosProfile = (data: DesmosProfileQuery) => {
    if (!data.profile.length) {
        return null;
    }

    const profile = data.profile[0];

    const nativeData = {
        network: 'native',
        identifier: profile.address,
        creationTime: profile.creationTime
    };

    const applications = profile.applicationLinks.map((item) => ({
        network: item.application,
        identifier: item.username,
        creationTime: item.creationTime
    }));

    const chains = profile.chainLinks.map((item) => ({
        network: item.chainConfig.name,
        identifier: item.externalAddress,
        creationTime: item.creationTime
    }));

    const connectionsWithoutNativeSorted = [...applications, ...chains].sort((a, b) =>
        a.network.toLowerCase() > b.network.toLowerCase() ? 1 : -1
    );

    return {
        dtag: profile.dtag,
        nickname: profile.nickname,
        imageUrl: profile.profilePic,
        coverUrl: profile.coverPic,
        bio: profile.bio,
        connections: [nativeData, ...connectionsWithoutNativeSorted]
    };
};

export const getProfile = async (delegatorAddress: string): Promise<DesmosProfile | null> => {
    return fetchDesmosProfile(delegatorAddress);
};
