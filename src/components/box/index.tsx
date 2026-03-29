import React from 'react';
import { Box as MuiBox } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

const Box: React.FC<{
    className?: string;
    children: React.ReactNode;
    sx?: SxProps<Theme>;
}> = ({ className, children, sx }) => {
    return (
        <MuiBox
            className={className}
            sx={[
                (theme) => ({
                    overflow: 'auto',
                    p: 2,
                    borderRadius: `${theme.shape.borderRadius}px`,
                    background: theme.palette.background.paper
                }),
                ...(Array.isArray(sx) ? sx : sx ? [sx] : [])
            ]}
        >
            {children}
        </MuiBox>
    );
};

export default Box;
