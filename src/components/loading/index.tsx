import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loading: React.FC<{
    className?: string;
}> = ({ className }) => {
    return (
        <Box className={className} sx={{ py: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    );
};

export default Loading;
