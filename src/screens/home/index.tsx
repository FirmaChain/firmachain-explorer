import React from 'react';
import { Layout } from '@components';
import { Box } from '@mui/material';

import { Blocks, Consensus, DataBlocks, Hero, Tokenomics, Transactions } from './components';

const Home = () => {
    return (
        <Layout navTitle="Block Explorer">
            <Box
                sx={(theme: any) => ({
                    ...theme.mixins.layout,
                    display: 'grid',
                    gridGap: theme.spacing(1),
                    gridTemplateRows: 'auto auto 1fr',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    '& a': {
                        color: theme.palette.custom.fonts.highlight
                    },
                    [theme.breakpoints.up('md')]: {
                        gridTemplateColumns: 'repeat(2, 1fr)'
                    },
                    [theme.breakpoints.up('lg')]: {
                        gridGap: theme.spacing(2),
                        gridTemplateColumns: 'repeat(4, 1fr)'
                    }
                })}
            >
                <Box sx={{ gridColumn: { md: '1 / 3', lg: '1 / 5' } }}>
                    <DataBlocks />
                </Box>
                <Box sx={{ gridColumn: { md: '1 / 3', lg: '1 / 3' }, height: { lg: '350px' } }}>
                    <Hero />
                </Box>
                <Box sx={{ height: { xs: '375px', lg: '100%' }, gridColumn: { md: '1 / 2', lg: '3 / 4' } }}>
                    <Tokenomics />
                </Box>
                <Box sx={{ height: { xs: '375px', lg: '100%' }, gridColumn: { md: '2 / 3', lg: '4 / 5' } }}>
                    <Consensus />
                </Box>
                <Box sx={{ gridColumn: { md: '1 / 3', lg: '1 / 3' } }}>
                    <Blocks />
                </Box>
                <Box sx={{ gridColumn: { md: '1 / 3', lg: '3 / 5' } }}>
                    <Transactions />
                </Box>
            </Box>
        </Layout>
    );
};

export default Home;
