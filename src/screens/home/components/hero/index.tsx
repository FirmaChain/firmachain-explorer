import { Box } from '@components';

import { OnlineVotingPower } from './components';

const Hero = ({ className }: ComponentDefault) => {
    return (
        <Box className={className} sx={{ height: '100%' }}>
            <OnlineVotingPower />
        </Box>
    );
};

export default Hero;
