import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { Tab, Tabs } from '@mui/material';
import { a11yProps } from '@utils/allyProps';
import classnames from 'classnames';
import numeral from 'numeral';

import { useStyles } from './styles';

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
    const classes = useStyles();
    const { t } = useTranslation('accounts');

    return (
        <div className={classnames(className, classes.root)}>
            <Tabs variant="scrollable" scrollButtons="off" value={tab} onChange={handleTabChange}>
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
        </div>
    );
};

export default TabsHeader;
