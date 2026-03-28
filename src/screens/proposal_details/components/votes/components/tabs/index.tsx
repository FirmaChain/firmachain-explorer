import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { Tab, Tabs } from '@mui/material';
import { a11yProps } from '@utils/allyProps';
import classnames from 'classnames';

import { useStyles } from './styles';
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
    const classes = useStyles();
    const { t } = useTranslation('proposals');

    return (
        <div className={classnames(className, classes.root)}>
            <Tabs variant="scrollable" scrollButtons="off" value={tab} onChange={handleTabChange}>
                {tabLabels(data).map((x, i) => (
                    <Tab key={x.key} label={`${t(x.key)} (${x.num})`} {...a11yProps(i)} />
                ))}
            </Tabs>
        </div>
    );
};

export default TabsHeader;
