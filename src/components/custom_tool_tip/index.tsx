import React from 'react';
import { Box } from '@mui/material';
import clsx from 'clsx';

import { defaultTooltipSx } from '@/styles/ui';

/**
 * Custom tooltips for recharts
 */
const CustomToolTip: React.FC<{
    className?: string;
    children: (data: any) => React.ReactNode;
    active?: boolean;
    payload?: any;
}> = (props) => {
    const { active, payload, className, children } = props;
    const firstPayload = Array.isArray(payload) && payload.length ? payload[0] : null;
    const data = firstPayload?.payload;

    if (data && active) {
        return (
            <Box className={clsx(className)} sx={(theme) => defaultTooltipSx(theme)}>
                {children(data)}
            </Box>
        );
    }

    return null;
};

export default CustomToolTip;
