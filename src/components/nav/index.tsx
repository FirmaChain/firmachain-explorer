import React from 'react';
import dynamic from '@/adapters/routing/dynamic';
import { Box } from '@mui/material';
import { useScreenSize } from '@hooks';

import { Mobile } from './components';

const Desktop = dynamic(() => import('./components/desktop'));

const Nav: React.FC<{
    title?: string;
}> = ({ title }) => {
    const { isDesktop } = useScreenSize();
    return (
        <>
            {isDesktop ? (
                <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                    <Desktop title={title} />
                </Box>
            ) : (
                <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
                    <Mobile title={title} />
                </Box>
            )}
        </>
    );
};

export default Nav;
