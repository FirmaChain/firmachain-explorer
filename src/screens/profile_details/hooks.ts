import { useEffect, useState } from 'react';
import { chainConfig } from '@/configs';
import { useDesmosProfile } from '@hooks';
import * as R from 'ramda';
import { useNavigate, useParams } from 'react-router';

import { ProfileDetailState } from './types';

const initialState: ProfileDetailState = {
    loading: true,
    exists: true,
    desmosProfile: null
};

export const useProfileDetails = () => {
    const { dtag } = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState<ProfileDetailState>(initialState);
    const handleSetState = (stateChange: any) => {
        setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
    };

    // ==========================
    // Desmos Profile
    // ==========================
    const { fetchDesmosProfile, formatDesmosProfile } = useDesmosProfile({
        onComplete: (data) => {
            handleSetState({
                loading: false,
                exists: !!data.profile.length,
                desmosProfile: formatDesmosProfile(data)
            });
        }
    });

    const shouldShowProfile = () => {
        const dtagConnections = state.desmosProfile.connections;
        const dtagConnectionsNetwork = dtagConnections.map((x) => {
            return x.identifier;
        });
        const chainPrefix = chainConfig.prefix.account;
        const containNetwork = dtagConnectionsNetwork.some((x) => x.startsWith(chainPrefix));
        if (containNetwork) {
            return true;
        }
    };

    useEffect(() => {
        const regex = /^@/;
        const profileDtag = dtag as string;
        const regexCheck = regex.test(profileDtag);
        const configProfile = chainConfig.extra.profile;
        handleSetState(initialState);

        if (!regexCheck || !configProfile) {
            navigate('/', { replace: true });
        }
        if (configProfile) {
            fetchDesmosProfile(dtag);
        }
    }, [dtag]);

    useEffect(() => {
        if (state.desmosProfile) {
            const showProfile = shouldShowProfile();

            if (showProfile) {
                const dtagInput = dtag as string;
                if (
                    `@${state.desmosProfile.dtag}` !== dtagInput &&
                    `@${state.desmosProfile.dtag.toUpperCase()}` === dtagInput.toUpperCase()
                ) {
                    navigate(`/@${state.desmosProfile.dtag}`);
                    // push({ pathname: `/@${state.desmosProfile.dtag}` }, `/@${state.desmosProfile.dtag}`);
                }
            } else {
                handleSetState({
                    exists: false
                });
            }
        }
    }, [state.desmosProfile]);

    return {
        state,
        shouldShowProfile
    };
};
