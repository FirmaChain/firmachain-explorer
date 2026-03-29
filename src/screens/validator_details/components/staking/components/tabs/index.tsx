import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { tabsHeaderSx } from '@/styles/ui';
import { Box, Tab, Tabs } from '@mui/material';
import { a11yProps } from '@utils/allyProps';
import classnames from 'classnames';
import numeral from 'numeral';

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
        <Box className={classnames(className)} sx={tabsHeaderSx}>
            <Tabs
                variant="scrollable"
                scrollButtons={false}
                textColor="inherit"
                value={tab}
                onChange={handleTabChange}
                sx={{
                    '& .MuiTab-root': {
                        minHeight: '40px',
                        padding: '6px 12px'
                    }
                }}
            >
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
