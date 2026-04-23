import { Box } from '@mui/material';

import { Blocks, Consensus, DataBlocks, Hero, Tokenomics, Transactions } from './components';

const Home = () => {
    return (
        <Box
            sx={(theme) => ({
                ...theme.mixins.layout,
                display: 'grid',
                gap: theme.spacing(1),
                gridTemplateRows: 'auto auto 1fr',
                gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
                '& a': {
                    color: theme.palette.custom.fonts.highlight
                },
                '& > *': {
                    minWidth: 0 /* allow grid items to shrink */
                },
                [theme.breakpoints.up('md')]: {
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
                },
                [theme.breakpoints.up('lg')]: {
                    gap: theme.spacing(2),
                    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
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
    );
};

export default Home;
