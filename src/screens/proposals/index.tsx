import { Box } from '@mui/material';

import { List } from './components';
import { useProposals } from './hooks';

const Proposals = () => {
    const { state, loadMoreItems } = useProposals();

    return (
        <Box
            sx={(theme) => ({
                ...theme.mixins.layout,
                '& a': {
                    color: theme.palette.custom.fonts.highlight
                }
            })}
        >
            <List items={state.items} rawDataTotal={state.rawDataTotal} hasNextPage={state.hasNextPage} loadMoreItems={loadMoreItems} />
        </Box>
    );
};

export default Proposals;
