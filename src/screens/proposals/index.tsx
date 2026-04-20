import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { List } from './components';
import { useProposals } from './hooks';

const Proposals = () => {
    const { t } = useTranslation('proposals');
    const { state, loadMoreItems, itemCount, isItemLoaded } = useProposals();

    return (
        <Box
            sx={(theme: any) => ({
                ...theme.mixins.layout,
                '& a': {
                    color: theme.palette.custom.fonts.highlight
                }
            })}
        >
            <List
                items={state.items}
                rawDataTotal={state.rawDataTotal}
                isItemLoaded={isItemLoaded}
                itemCount={itemCount}
                loadMoreItems={loadMoreItems}
            />
        </Box>
    );
};

export default Proposals;
