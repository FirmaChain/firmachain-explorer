import React from 'react';
import { Box, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

const SingleBlock: React.FC<{
    sx?: SxProps<Theme>;
    label: string;
    value: string;
    description?: string;
}> = ({ sx, label, value, description }) => {
    return (
        <Box
            sx={[
                (theme) => ({
                    p: 2,
                    background: theme.palette.primary.main,
                    borderRadius: `${theme.shape.borderRadius}px`,
                    height: '110px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    color: theme.palette.custom.fonts.fontFive,
                    '& .label': {
                        mb: 2
                    },
                    '& .content': {
                        width: '100%',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between'
                    },
                    '& .description': {
                        display: 'none',
                        [theme.breakpoints.up('md')]: {
                            display: 'block'
                        }
                    }
                }),
                ...(Array.isArray(sx) ? sx : sx ? [sx] : [])
            ]}
        >
            <Typography variant="body2" className="label">
                {label}
            </Typography>
            <div className="content">
                <Typography variant="h1">{value}</Typography>
                {!!description && (
                    <Typography variant="caption" className="description">
                        {description}
                    </Typography>
                )}
            </div>
        </Box>
    );
};

export default SingleBlock;
