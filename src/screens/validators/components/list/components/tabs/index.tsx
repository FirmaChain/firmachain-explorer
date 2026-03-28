import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { Search } from '@components';
import { Tab, Tabs } from '@material-ui/core';
import { a11yProps } from '@utils/allyProps';
import classnames from 'classnames';

import { useStyles } from './styles';
import { tabLabels } from './utils';

const TabsHeader: React.FC<{
    className?: string;
    tab: number;
    handleTabChange: (event: any, newvalue: number) => void;
    handleSearch: (value: string) => void;
}> = ({ className, tab, handleTabChange, handleSearch }) => {
    const classes = useStyles();
    const { t } = useTranslation('validators');

    return (
        <div className={classnames(className, classes.root)}>
            <Tabs variant="scrollable" scrollButtons="off" value={tab} onChange={handleTabChange}>
                {tabLabels.map((x, i) => (
                    <Tab key={x} label={t(x)} {...a11yProps(i)} />
                ))}
            </Tabs>
            <Search className={classes.searchBar} callback={handleSearch} placeholder={t('searchValidator')} />
        </div>
    );
};

export default TabsHeader;
