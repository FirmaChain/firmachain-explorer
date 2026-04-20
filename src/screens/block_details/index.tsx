import { LoadAndExist } from '@components';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Overview, Signatures, Transactions } from './components';
import { useBlockDetails } from './hooks';

const BlockDetails = () => {
    const { t } = useTranslation('blocks');
    const { state } = useBlockDetails();
    const { overview, signatures, transactions } = state;

    return (
        <LoadAndExist loading={state.loading} exists={state.exists}>
            <Box
                sx={(theme: any) => ({
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
                <Box sx={{ height: '450px' }}>
                    <Signatures signatures={signatures} />
                </Box>
                <Transactions transactions={transactions} />
            </Box>
        </LoadAndExist>
    );
};

export default BlockDetails;
