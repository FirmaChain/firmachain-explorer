import React from 'react';
import { Box } from '@components';

import { OnlineVotingPower } from './components';

const Hero: React.FC<ComponentDefault> = (props) => {
    return (
        <Box className={props.className} sx={{ height: '100%' }}>
            <OnlineVotingPower />
        </Box>
    );
};

export default Hero;
