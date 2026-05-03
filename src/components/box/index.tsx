import { ReactNode } from 'react';
import { Box as MuiBox } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

interface Props {
    className?: string;
    children: ReactNode;
    sx?: SxProps<Theme>;
}

const Box = ({ className, children, sx }: Props) => {
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
