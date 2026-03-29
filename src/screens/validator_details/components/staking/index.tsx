import React from 'react';
import dynamic from '@/adapters/routing/dynamic';
import { Box, TabPanel } from '@components';

import { Tabs } from './components';
import { useStaking } from './hooks';

const Delegations = dynamic(() => import('./components/delegations'));
const Redelgations = dynamic(() => import('./components/redelegations'));
const Unbondings = dynamic(() => import('./components/unbondings'));

const Staking: React.FC<ComponentDefault> = (props) => {
    const { state, handleTabChange } = useStaking();

    const tabs = [
        {
            id: 0,
            key: 'delegations',
            component: <Delegations delegations={state.delegations} />,
            count: state.delegations.count
        },
        {
            id: 1,
            key: 'redelegations',
            component: <Redelgations redelegations={state.redelegations} />,
            count: state.redelegations.count
        },
        {
            id: 2,
            key: 'unbondings',
            component: <Unbondings unbondings={state.unbondings} />,
            count: state.unbondings.count
        }
    ];

    return (
        <Box className={props.className} sx={{ overflow: 'hidden' }}>
            <Tabs tab={state.tab} handleTabChange={handleTabChange} tabs={tabs} />
            {tabs.map((x) => {
                return (
                    <TabPanel key={x.id} index={x.id} value={state.tab}>
                        {x.component}
                    </TabPanel>
                );
            })}
        </Box>
    );
};

export default Staking;
