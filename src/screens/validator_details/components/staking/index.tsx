import { Box, TabPanel } from '@components';

import { Tabs } from './components';
import Delegations from './components/delegations';
import Redelgations from './components/redelegations';
import Unbondings from './components/unbondings';
import { useStaking } from './hooks';

const Staking = (props: ComponentDefault) => {
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
