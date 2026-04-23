import { DesmosProfile, LoadAndExist } from '@components';
import { Box } from '@mui/material';

import { Connections } from './components';
import { useProfileDetails } from './hooks';

const ProfileDetails = () => {
    const { state } = useProfileDetails();

    return (
        <LoadAndExist loading={state.loading} exists={state.exists}>
            {!!state.desmosProfile && (
                <Box
                    sx={(theme) => ({
                        ...theme.mixins.layout,
                        display: 'grid',
                        gridTemplateRows: 'auto',
                        gridGap: theme.spacing(1),
                        '& a': {
                            color: theme.palette.custom.fonts.highlight
                        },
                        [theme.breakpoints.up('lg')]: {
                            gridGap: theme.spacing(2)
                        }
                    })}
                >
                    <DesmosProfile
                        dtag={state.desmosProfile.dtag}
                        nickname={state.desmosProfile.nickname}
                        imageUrl={state.desmosProfile.imageUrl}
                        bio={state.desmosProfile.bio}
                        connections={[]}
                        coverUrl={state.desmosProfile.coverUrl}
                    />
                    <Connections data={state.desmosProfile.connections} />
                </Box>
            )}
        </LoadAndExist>
    );
};

export default ProfileDetails;
