import React from 'react';
import { Box } from '@mui/material';

const Condition: React.FC<{
    className?: string;
}> = ({ className }) => {
    return (
        <Box
            className={className}
            sx={(theme) => ({
                width: '10px',
                height: '10px',
                background: theme.palette.custom.condition.zero,
                margin: '0 auto',
                borderRadius: '50%',
                '&.green': {
                    background: theme.palette.custom.condition.one
                },
                '&.yellow': {
                    background: theme.palette.custom.condition.two
                },
                '&.red': {
                    background: theme.palette.custom.condition.three
                }
            })}
        />
    );
};

export default Condition;
