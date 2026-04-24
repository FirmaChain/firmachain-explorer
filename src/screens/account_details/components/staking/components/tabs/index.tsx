import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { a11yProps } from '@utils/allyProps';
import clsx from 'clsx';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';

const TabsHeader: React.FC<{
    className?: string;
    tab: number;
    handleTabChange: (_event: any, newValue: number) => void;
    tabs: {
        id: number;
        key: string;
        count: number;
        component?: React.ReactNode;
    }[];
}> = ({ className, tab, handleTabChange, tabs }) => {
    const { t } = useTranslation('accounts');

    return (
        <Box className={clsx(className)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Tabs variant="scrollable" scrollButtons={false} value={tab} onChange={handleTabChange}>
                {tabs.map((x) => (
                    <Tab
                        key={x.key}
                        label={t(x.key, {
                            num: numeral(x.count ?? 0).format('0,0')
                        })}
                        {...a11yProps(x.id)}
                    />
                ))}
            </Tabs>
        </Box>
    );
};

export default TabsHeader;
