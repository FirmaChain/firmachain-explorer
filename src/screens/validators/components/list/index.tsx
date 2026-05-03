import dynamic from '@/adapters/routing/dynamic';
import { Box, LoadAndExist, NoData } from '@components';
import { Box as MuiBox } from '@mui/material';
import { useProfilesRecoil } from '@zustand/profiles';
import clsx from 'clsx';

import { Tabs } from './components';
import { useValidators } from './hooks';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

interface Props {
    className?: string;
}

const List = ({ className }: Props) => {
    const { state, handleTabChange, handleSearch, handleSort, sortItems } = useValidators();
    const dataProfiles = useProfilesRecoil(state.items.map((x) => x.validator));
    const mergedDataWithProfiles = state.items.map((x, i) => {
        return {
            ...x,
            validator: dataProfiles[i]
        };
    });
    const items = sortItems(mergedDataWithProfiles);

    return (
        <LoadAndExist loading={state.loading} exists={state.exists}>
            <Box className={clsx(className)}>
                <Tabs tab={state.tab} handleTabChange={handleTabChange} handleSearch={handleSearch} />
                <MuiBox
                    sx={(theme) => ({
                        minHeight: { xs: '500px', lg: '65vh' },
                        height: '50vh'
                    })}
                >
                    {items.length ? (
                        <>
                            <MuiBox sx={{ display: { xs: 'none', lg: 'block' }, height: '100%' }}>
                                <Desktop
                                    sortDirection={state.sortDirection}
                                    sortKey={state.sortKey}
                                    handleSort={handleSort}
                                    items={items}
                                />
                            </MuiBox>
                            <MuiBox sx={{ display: { lg: 'none' }, height: '100%' }}>
                                <Mobile items={items} />
                            </MuiBox>
                        </>
                    ) : (
                        <NoData />
                    )}
                </MuiBox>
            </Box>
        </LoadAndExist>
    );
};

export default List;
