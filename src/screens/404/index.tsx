import React from 'react';
import { Layout, NotFound as NotFoundLogo } from '@components';
import { Box } from '@mui/material';

const NotFound = () => {
    return (
        <Layout>
            <Box
                sx={(theme: any) => ({
                    ...theme.mixins.layout,
                    '& a': {
                        color: theme.palette.custom.fonts.highlight
                    }
                })}
            >
                <NotFoundLogo />
            </Box>
        </Layout>
    );
};

export default NotFound;
