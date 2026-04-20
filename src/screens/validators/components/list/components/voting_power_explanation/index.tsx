import { Box, Typography } from '@mui/material';
import { Trans } from 'react-i18next';

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
