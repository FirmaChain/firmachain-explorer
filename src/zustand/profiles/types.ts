export type AtomState =
    | {
          moniker: string;
          imageUrl?: string;
      }
    | null
    | false;

export type Profile = {
    moniker: string;
    imageUrl?: string;
};

export type ValidatorsIdentityList = {
    profileInfos?: Array<{
        operatorAddress: string;
        url?: string;
    }>;
};

export type ProfilesStoreState = {
    profiles: Record<string, AtomState | undefined>;
    pendingProfiles: Record<string, boolean | undefined>;
    validatorsIdentityList: ValidatorsIdentityList | null;
    validatorsIdentityListLoaded: boolean;
    validatorsIdentityListLoading: boolean;
    validatorsVersion: number;
    setProfileEntry: (delegatorAddress: string, profile: AtomState) => void;
    setProfileEntries: (entries: Array<{ delegatorAddress: string; profile: AtomState }>) => void;
    setProfileFromAvatar: (address: string, profile: AvatarName | null) => void;
    fetchProfileByDelegatorAddress: (delegatorAddress: string, fallbackAddress?: string) => Promise<AtomState>;
    fetchProfileByAddress: (address: string) => Promise<AtomState>;
    fetchProfilesByAddress: (addresses: string[]) => Promise<void>;
    fetchValidatorsIdentityList: () => Promise<void>;
    bumpValidatorsVersion: () => void;
    reset: () => void;
};
