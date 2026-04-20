import { DesmosProfile, LoadAndExist } from '@components';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Blocks, Profile, Staking, Transactions, ValidatorOverview, VotingPower } from './components';
import { useValidatorDetails } from './hooks';

const ValidatorDetails = () => {
    const { t } = useTranslation('validators');
    const { state } = useValidatorDetails();
    const { desmosProfile, status } = state;

    return (
        <LoadAndExist exists={state.exists} loading={state.loading}>
            <Box
                sx={(theme: any) => ({
                    ...theme.mixins.layout,
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gridTemplateRows: 'auto',
                    gridGap: theme.spacing(1),
                    '& a': {
                        color: theme.palette.custom.fonts.highlight
                    },
                    [theme.breakpoints.up('lg')]: {
                        gridGap: theme.spacing(2),
                        gridTemplateColumns: 'repeat(2, 1fr) 500px'
                    }
                })}
            >
                <Box sx={{ gridColumn: { lg: '1 / 4' } }}>
                    {desmosProfile ? <DesmosProfile {...desmosProfile} /> : <Profile profile={state.overview} />}
                </Box>
                <Box sx={{ gridColumn: { lg: '1 / 4' } }}>
                    <ValidatorOverview overview={state.overview} status={state.status} />
                </Box>
                <Box sx={{ gridColumn: { lg: '1 / 3' } }}>
                    <VotingPower data={state.votingPower} status={status.status} />
                </Box>
                <Box sx={{ gridColumn: { lg: '3 / 4' } }}>
                    <Blocks />
                </Box>
                <Box sx={{ gridColumn: { lg: '1 / 4' } }}>
                    <Staking />
                </Box>
                <Box sx={{ gridColumn: { lg: '1 / 4' } }}>
                    <Transactions />
                </Box>
            </Box>
        </LoadAndExist>
    );
};

export default ValidatorDetails;
