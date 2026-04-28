import dynamic from '@/adapters/routing/dynamic';
import { Box, LoadAndExist, NoData } from '@components';
import { useScreenSize } from '@hooks';
import { Box as MuiBox } from '@mui/material';
import { useProfilesRecoil } from '@zustand/profiles';

import { useBlocks } from './hooks';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const Blocks = () => {
    const { isDesktop } = useScreenSize();
    const { state, loadMoreItems, itemCount, isItemLoaded } = useBlocks();

    const proposerProfiles = useProfilesRecoil(state.items.map((x) => x.proposer));
    const mergedDataWithProfiles = state.items.map((x, i) => {
        return {
            ...x,
            proposer: proposerProfiles[i]
        };
    });

    return (
        <MuiBox
            sx={(theme) => ({
                ...theme.mixins.layout,
                '& a': {
                    color: theme.palette.custom.fonts.highlight
                }
            })}
        >
            <LoadAndExist loading={state.loading} exists={state.exists}>
                <Box
                    sx={(theme) => ({
                        minHeight: '500px',
                        height: {
                            xs: '50vh',
                            lg: '100%'
                        },
                        [theme.breakpoints.up('lg')]: {
                            minHeight: '65vh'
                        }
                    })}
                >
                    {!state.items.length ? (
                        <NoData />
                    ) : (
                        <>
                            {isDesktop ? (
                                <Desktop
                                    items={mergedDataWithProfiles}
                                    itemCount={itemCount}
                                    loadMoreItems={loadMoreItems}
                                    isItemLoaded={isItemLoaded}
                                    isNextPageLoading={state.isNextPageLoading}
                                />
                            ) : (
                                <Mobile
                                    items={mergedDataWithProfiles}
                                    itemCount={itemCount}
                                    loadMoreItems={loadMoreItems}
                                    isNextPageLoading={state.isNextPageLoading}
                                />
                            )}
                        </>
                    )}
                </Box>
            </LoadAndExist>
        </MuiBox>
    );
};

export default Blocks;
