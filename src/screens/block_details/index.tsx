import { LoadAndExist } from '@components';
import { Box } from '@mui/material';

import { Overview, Signatures, Transactions } from './components';
import { useBlockDetails } from './hooks';

const BlockDetails = () => {
    const { state } = useBlockDetails();
    const { overview, signatures, transactions } = state;

    return (
        <LoadAndExist loading={state.loading} exists={state.exists}>
            <Box
                sx={(theme) => ({
                    ...theme.mixins.layout,
                    '& a': {
                        color: theme.palette.custom.fonts.highlight
                    },
                    display: 'grid',
                    gridTemplateRows: 'auto auto 1fr',
                    gridTemplateColumns: '1fr',
                    gridGap: theme.spacing(1),
                    [theme.breakpoints.up('lg')]: {
                        gridGap: theme.spacing(2)
                    }
                })}
            >
                <Overview
                    height={overview.height}
                    hash={overview.hash}
                    proposer={overview.proposer}
                    timestamp={overview.timestamp}
                    txs={overview.txs}
                />
                <Signatures signatures={signatures} />
                <Transactions transactions={transactions} />
            </Box>
        </LoadAndExist>
    );
};

export default BlockDetails;
