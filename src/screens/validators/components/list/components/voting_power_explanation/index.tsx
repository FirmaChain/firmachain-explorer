import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Box, Typography } from '@mui/material';

const VotingPowerExplanation = () => {
    return (
        <Box sx={{ height: '100%' }}>
            <Typography>
                <Trans i18nKey="validators:votingPowerExplanation" components={[<b />]} />
            </Typography>
        </Box>
    );
};

export default VotingPowerExplanation;
