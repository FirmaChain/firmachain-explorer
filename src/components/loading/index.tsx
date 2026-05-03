import { Box, CircularProgress } from '@mui/material';

const Loading = ({ className }: { className?: string }) => {
    return (
        <Box className={className} sx={{ py: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    );
};

export default Loading;
