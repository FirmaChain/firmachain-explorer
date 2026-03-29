import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Box, Typography } from '@mui/material';

const QuorumExplanation = (props: { quorum: number }) => {
    return (
        <Box sx={{ height: '100%' }}>
            <Typography>
                <Trans
                    i18nKey="proposals:quorumExplanation"
                    components={[<b />]}
                    values={{
                        quorum: props.quorum
                    }}
                />
            </Typography>
        </Box>
    );
};

export default QuorumExplanation;
