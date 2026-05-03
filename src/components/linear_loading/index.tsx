import { Box, LinearProgress } from '@mui/material';

interface Props {
    className?: string;
}

const LinearLoading = ({ className }: Props) => {
    return (
        <Box
            className={className}
            sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: '150px',
                p: 2,
                '& > *': {
                    width: {
                        xs: '70%',
                        md: '40%'
                    }
                }
            }}
        >
            <LinearProgress />
        </Box>
    );
};

export default LinearLoading;
