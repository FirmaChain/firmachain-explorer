import React from 'react';
import dynamic from '@/adapters/routing/dynamic';
import { Loading, NoData, Pagination } from '@components';
import { Box } from '@mui/material';
import { usePagination, useScreenSize } from '@hooks';
import { useProfilesRecoil } from '@recoil/profiles';
import classnames from 'classnames';
import * as R from 'ramda';

import { UnbondingsType } from '../../types';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const Unbondings: React.FC<
    {
        unbondings: UnbondingsType;
    } & ComponentDefault
> = (props) => {
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination({});
    const { isDesktop } = useScreenSize();

    const pageItems = R.pathOr([], ['unbondings', 'data', page], props);
    const dataProfiles = useProfilesRecoil(pageItems.map((x: any) => x.address));
    const mergedDataWithProfiles = pageItems.map((x: any, i: number) => {
        return {
            ...x,
            address: dataProfiles[i]
        };
    });

    const items = mergedDataWithProfiles;

    let component = null;

    if (props.unbondings.loading) {
        component = <Loading />;
    } else if (!items.length) {
        component = <NoData />;
    } else if (isDesktop) {
        component = <Desktop items={items} />;
    } else {
        component = <Mobile items={items} />;
    }

    return (
        <div className={classnames(props.className)}>
            {component}
            <Box sx={{ mt: 3 }}>
                <Pagination
                    total={props.unbondings.count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Box>
        </div>
    );
};

export default Unbondings;
