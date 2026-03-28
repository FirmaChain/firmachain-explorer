import React from 'react';
import { Layout } from '@components';

import { Blocks, Consensus, DataBlocks, Hero, Tokenomics, Transactions } from './components';
import { useStyles } from './styles';

const Home = () => {
    const classes = useStyles();

    return (
        <Layout className={classes.root} navTitle="Block Explorer">
            <DataBlocks className={classes.dataBlocks} />
            <Hero className={classes.hero} />
            <Tokenomics className={classes.tokenomics} />
            <Consensus className={classes.consensus} />
            <Blocks className={classes.blocks} />
            <Transactions className={classes.transactions} />
        </Layout>
    );
};

export default Home;
