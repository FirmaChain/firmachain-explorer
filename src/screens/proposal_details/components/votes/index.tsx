import { Box, NoData } from '@components';
import { usePagination, useScreenSize } from '@hooks';
import { useProfilesRecoil } from '@zustand/profiles';

import { Paginate, Tabs } from './components';
import Desktop from './components/desktop';
import Mobile from './components/mobile';
import { useVotes } from './hooks';
import { filterDataByTab } from './utils';

const Votes = (props: ComponentDefault) => {
    const { isDesktop } = useScreenSize();
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, sliceItems, resetPagination } = usePagination({});
    const { state, handleTabChange } = useVotes(resetPagination);
    const filteredItems = filterDataByTab({
        tab: state.tab,
        data: state.data,
        notVoted: state.validatorsNotVoted
    });

    const slicedItems = sliceItems(filteredItems);

    const userProfiles = useProfilesRecoil(slicedItems.map((x) => x.user));
    const items = slicedItems.map((x, i) => {
        return {
            ...x,
            user: userProfiles[i]
        };
    });

    return (
        <Box
            className={props.className}
            sx={(theme) => ({
                overflow: 'hidden',
                [theme.breakpoints.up('md')]: {
                    display: 'flex',
                    flexDirection: 'column'
                },
                '& .list': {
                    flex: 1,
                    [theme.breakpoints.up('md')]: {
                        overflow: 'auto'
                    }
                },
                '& .mobile': {
                    [theme.breakpoints.up('lg')]: {
                        display: 'none'
                    }
                },
                '& .desktop': {
                    display: 'none',
                    [theme.breakpoints.up('lg')]: {
                        display: 'flex'
                    }
                }
            })}
        >
            <Tabs
                data={{
                    yes: state.voteCount.yes,
                    no: state.voteCount.no,
                    abstain: state.voteCount.abstain,
                    veto: state.voteCount.veto,
                    notVoted: state.voteCount.didNotVote
                }}
                tab={state.tab}
                handleTabChange={handleTabChange}
            />
            <div className="list">
                {items.length ? (
                    <>{isDesktop ? <Desktop className="desktop" items={items} /> : <Mobile className="mobile" items={items} />}</>
                ) : (
                    <NoData />
                )}
            </div>
            <Paginate
                total={filteredItems.length}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default Votes;
