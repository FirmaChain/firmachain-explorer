import { DesmosProfile, LoadAndExist } from '@components';
import { Box } from '@mui/material';

import { Balance, OtherTokens, Overview, Staking, Transactions } from './components';
import { useAccountDetails } from './hooks';

const AccountDetails = () => {
    const { state } = useAccountDetails();

    return (
        <LoadAndExist loading={state.loading} exists={state.exists}>
            <Box
                sx={(theme: any) => ({
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
                {!!state.desmosProfile && (
                    <DesmosProfile
                        dtag={state.desmosProfile.dtag}
                        nickname={state.desmosProfile.nickname}
                        imageUrl={state.desmosProfile.imageUrl}
                        bio={state.desmosProfile.bio}
                        connections={state.desmosProfile.connections}
                        coverUrl={state.desmosProfile.coverUrl}
                    />
                )}
                <Overview withdrawalAddress={state.overview.withdrawalAddress} address={state.overview.address} />
                <Balance
                    available={state.balance.available}
                    delegate={state.balance.delegate}
                    unbonding={state.balance.unbonding}
                    reward={state.balance.reward}
                    commission={state.balance.commission}
                    total={state.balance.total}
                />
                <OtherTokens otherTokens={state.otherTokens} />
                <Staking rewards={state.rewards} />
                <Transactions />
            </Box>
        </LoadAndExist>
    );
};

export default AccountDetails;
