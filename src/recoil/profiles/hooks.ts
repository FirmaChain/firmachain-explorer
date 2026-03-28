/* eslint-disable max-len */
import {
  useEffect,
  useState,
} from 'react';
import {
  useRecoilValue,
  useRecoilCallback,
} from 'recoil';
import { chainConfig } from '@configs';
import { ENV } from '@configs/env';
import {
  writeProfile,
  readProfilesExist,
  readProfileExist,
  readProfile,
  readProfiles,
  readDelegatorAddress,
  readDelegatorAddresses,
} from '@recoil/profiles';
import { AtomState as ProfileAtomState } from '@recoil/profiles/types';
import { getProfile } from './utils';

/**
 * Accepts a delegator address and returns the appropriate profile
 * @param address
 */
export const useProfileRecoil = (address: string): AvatarName | null => {
  const delegatorAddress = useRecoilValue(readDelegatorAddress(address));
  const rawProfile = useRecoilValue(readProfileExist(address));
  const profile = useRecoilValue(readProfile(address));
  const [validatorsIdentityList, setValidatorsIdentityList] = useState<any>(null);

  useEffect(() => {
    const fetchValidatorsIdentityList = async () => {
      const validatorsIdentityListUrl = ENV.VALIDATORS_IDENTITY_LIST_URL;

      if (!validatorsIdentityListUrl) {
        return;
      }

      try {
        const response = await fetch(validatorsIdentityListUrl);
        if (!response.ok) {
          throw new Error(`Failed to load validators identity list: ${response.status}`);
        }
        const data = await response.json();
        setValidatorsIdentityList(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching validators identity list:', error);
      }
    };

    fetchValidatorsIdentityList();
  }, []);

  const fetchProfile = useRecoilCallback(({ set }) => async () => {
    const fetchedProfile = await getProfile(delegatorAddress);

    if (fetchedProfile === null) {
      set(writeProfile(delegatorAddress), null);
    } else {
      set(writeProfile(delegatorAddress), {
        address: delegatorAddress,
        // name: fetchedProfile.nickname || address,
        name: `@${fetchedProfile.dtag}` || address,
        imageUrl: fetchedProfile.imageUrl,
      });
    }
  });

  useEffect(() => {
    if (chainConfig.extra.profile
      && delegatorAddress
      && rawProfile === null) {
      fetchProfile();
    }
  }, [address]);

  // Apply validator identity list to profile
  if (!profile) {
    return profile;
  }

  if (validatorsIdentityList?.profileInfos) {
    const profileInfo = validatorsIdentityList.profileInfos.find(
      (p: any) => p.operatorAddress === address,
    );

    if (profileInfo?.url) {
      return {
        ...profile,
        imageUrl: profileInfo.url,
      };
    }
  }

  return profile;
};

/**
 * Accepts a list of addresses and returns the appropriate profiles
 * @param address
 */
export const useProfilesRecoil = (addresses: string[]): AvatarName[] => {
  const delegatorAddresses = useRecoilValue(readDelegatorAddresses(addresses));
  const rawProfiles: ProfileAtomState[] = useRecoilValue(readProfilesExist(addresses));
  const profiles = useRecoilValue(readProfiles(addresses));
  const [validatorsIdentityList, setValidatorsIdentityList] = useState<any>(null);

  useEffect(() => {
    const fetchValidatorsIdentityList = async () => {
      const validatorsIdentityListUrl = ENV.VALIDATORS_IDENTITY_LIST_URL;

      if (!validatorsIdentityListUrl) {
        return;
      }

      try {
        const response = await fetch(validatorsIdentityListUrl);
        if (!response.ok) {
          throw new Error(`Failed to load validators identity list: ${response.status}`);
        }
        const data = await response.json();
        setValidatorsIdentityList(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching validators identity list:', error);
      }
    };

    fetchValidatorsIdentityList();
  }, []);

  const fetchProfiles = useRecoilCallback(({ set }) => async () => {
    const fetchedProfiles = await Promise.all(rawProfiles.map(async (x, i) => {
      const delegatorAddress = delegatorAddresses[i];
      if (delegatorAddresses[i] && x === null) {
        const fetchedProfile = await getProfile(delegatorAddresses[i]);
        if (fetchedProfile === null) {
          set(writeProfile(delegatorAddress), null);
        } else {
          set(writeProfile(delegatorAddress), {
            address: delegatorAddress,
            // name: fetchedProfile.nickname || addresses[i],
            name: `@${fetchedProfile.dtag}` || addresses[i],
            imageUrl: fetchedProfile.imageUrl,
          });
        }
      }
    }));

    return fetchedProfiles;
  });

  useEffect(() => {
    if (chainConfig.extra.profile) {
      fetchProfiles();
    }
  }, []);

  // Apply validator identity list to profiles
  const profilesWithIdentity = profiles.map((profile, i) => {
    if (!validatorsIdentityList?.profileInfos) {
      return profile;
    }

    const operatorAddress = addresses[i];
    const profileInfo = validatorsIdentityList.profileInfos.find(
      (p: any) => p.operatorAddress === operatorAddress,
    );

    if (profileInfo?.url) {
      return {
        ...profile,
        imageUrl: profileInfo.url,
      };
    }

    return profile;
  });

  return profilesWithIdentity;
};
