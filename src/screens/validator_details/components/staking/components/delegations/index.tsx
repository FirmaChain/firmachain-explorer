import dynamic from '@/adapters/routing/dynamic';
import { Loading, NoData, Pagination } from '@components';
import { usePagination, useScreenSize } from '@hooks';
import { Box } from '@mui/material';
import { useProfilesRecoil } from '@zustand/profiles';
import clsx from 'clsx';
import * as R from 'ramda';

import { DelegationsType } from '../../types';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

interface Props extends ComponentDefault {
    delegations: DelegationsType;
}

const Delegations = (props: Props) => {
    const { isDesktop } = useScreenSize();
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination({});

    const pageItems = R.pathOr([], ['delegations', 'data', page], props);

    const dataProfiles = useProfilesRecoil(pageItems.map((x: any) => x.address));

    const mergedDataWithProfiles = pageItems.map((x: any, i: number) => {
        return {
            ...x,
            address: dataProfiles[i]
        };
    });

    const items = mergedDataWithProfiles;

    let component = null;

    if (props.delegations.loading) {
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
                    total={props.delegations.count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Box>
        </div>
    );
};

export default Delegations;
