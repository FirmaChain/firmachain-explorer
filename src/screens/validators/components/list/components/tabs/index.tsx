import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { desktopSearchBarSx, tabsHeaderSx } from '@/styles/ui';
import { Search } from '@components';
import { Box, Tab, Tabs } from '@mui/material';
import { a11yProps } from '@utils/allyProps';
import classnames from 'classnames';

import { tabLabels } from './utils';

const TabsHeader: React.FC<{
    className?: string;
    tab: number;
    handleTabChange: (event: any, newvalue: number) => void;
    handleSearch: (value: string) => void;
}> = ({ className, tab, handleTabChange, handleSearch }) => {
    const { t } = useTranslation('validators');

    return (
        <Box
            className={classnames(className)}
            sx={(theme) => ({
                ...tabsHeaderSx,
                '& .searchBar': {
                    ...desktopSearchBarSx(theme)
                }
            })}
        >
            <Tabs variant="scrollable" scrollButtons={false} textColor="inherit" value={tab} onChange={handleTabChange}>
                {tabLabels.map((x, i) => (
                    <Tab key={x} label={t(x)} {...a11yProps(i)} />
                ))}
            </Tabs>
            <Search className="searchBar" callback={handleSearch} placeholder={t('searchValidator')} />
        </Box>
    );
};

export default TabsHeader;
