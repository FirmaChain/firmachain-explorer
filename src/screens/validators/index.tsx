import { Box } from '@mui/material';

import { List } from './components';

const Validators = () => {
    return (
        <Box
            sx={(theme) => ({
                ...theme.mixins.layout,
                '& a': {
                    color: theme.palette.custom.fonts.highlight
                }
            })}
        >
            <List />
        </Box>
    );
};

export default Validators;
