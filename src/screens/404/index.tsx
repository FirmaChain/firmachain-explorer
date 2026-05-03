import { NotFound as NotFoundLogo } from '@components';
import { Box } from '@mui/material';

const NotFound = () => {
    return (
        <Box
            sx={(theme) => ({
                ...theme.mixins.layout,
                '& a': {
                    color: theme.palette.custom.fonts.highlight
                }
            })}
        >
            <NotFoundLogo />
        </Box>
    );
};

export default NotFound;
