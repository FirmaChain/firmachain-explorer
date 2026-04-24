import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { a11yProps } from '@utils/allyProps';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { tabsHeaderSx } from '@/styles/ui';

import { tabLabels } from './utils';

const TabsHeader: React.FC<{
    className?: string;
    tab: number;
    handleTabChange: (_event: any, newValue: number) => void;
    data: {
        yes: number;
        no: number;
        abstain: number;
        veto: number;
        notVoted: number;
    };
}> = ({ className, tab, handleTabChange, data }) => {
    const { t } = useTranslation('proposals');

    return (
        <Box className={clsx(className)} sx={tabsHeaderSx}>
            <Tabs variant="scrollable" scrollButtons={false} textColor="inherit" value={tab} onChange={handleTabChange}>
                {tabLabels(data).map((x, i) => (
                    <Tab key={x.key} label={`${t(x.key)} (${x.num})`} {...a11yProps(i)} />
                ))}
            </Tabs>
        </Box>
    );
};

export default TabsHeader;
