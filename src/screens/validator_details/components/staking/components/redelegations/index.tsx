import { Loading, NoData, Pagination } from '@components';
import { usePagination, useScreenSize } from '@hooks';
import { Box } from '@mui/material';
import { useProfilesRecoil } from '@zustand/profiles';
import clsx from 'clsx';
import * as R from 'ramda';

import { RedelegationsType } from '../../types';
import Desktop from './components/desktop';
import Mobile from './components/mobile';

interface Props extends ComponentDefault {
    redelegations: RedelegationsType;
}

const Redelegations = (props: Props) => {
    const { isDesktop } = useScreenSize();
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination({});

    const pageItems = R.pathOr([], ['redelegations', 'data', page], props);

    const toProfiles = useProfilesRecoil(pageItems.map((x: any) => x.to));
    const addressProfiles = useProfilesRecoil(pageItems.map((x: any) => x.address));
    const mergedDataWithProfiles = pageItems.map((x: any, i: number) => {
        return {
            ...x,
            to: toProfiles[i],
            address: addressProfiles[i]
        };
    });

    const items = mergedDataWithProfiles;

    let component = null;

    if (props.redelegations.loading) {
        component = <Loading />;
    } else if (!items.length) {
        component = <NoData />;
    } else if (isDesktop) {
        component = <Desktop items={items} />;
    } else {
        component = <Mobile items={items} />;
    }

    return (
        <div className={clsx(props.className)}>
            {component}
            <Box sx={{ mt: 3 }}>
                <Pagination
                    total={props.redelegations.count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                />
            </Box>
        </div>
    );
};

export default Redelegations;
