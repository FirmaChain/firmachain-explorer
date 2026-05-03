import { Search } from '@components';
import { Box, Tab, Tabs } from '@mui/material';
import { a11yProps } from '@utils/allyProps';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { desktopSearchBarSx, tabsHeaderSx } from '@/styles/ui';

import { tabLabels } from './utils';

interface Props {
    className?: string;
    tab: number;
    handleTabChange: (event: any, newvalue: number) => void;
    handleSearch: (value: string) => void;
}

const TabsHeader = ({ className, tab, handleTabChange, handleSearch }: Props) => {
    const { t } = useTranslation('validators');

    return (
        <Box
            className={clsx(className)}
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
