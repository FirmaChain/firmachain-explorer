import React from 'react';
import dynamic from '@/adapters/routing/dynamic';
import { Loading, NoData, Pagination } from '@components';
import { Box } from '@mui/material';
import { usePagination, useScreenSize } from '@hooks';
import { useProfilesRecoil } from '@zustand/profiles';
import classnames from 'classnames';
import * as R from 'ramda';

import { RedelegationsType } from '../../types';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const Redelegations: React.FC<
    {
        redelegations: RedelegationsType;
    } & ComponentDefault
> = (props) => {
    const { isDesktop } = useScreenSize();
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination({});

    const pageItems = R.pathOr([], ['redelegations', 'data', page], props);

    const fromProfiles = useProfilesRecoil(pageItems.map((x: any) => x.from));
    const toProfiles = useProfilesRecoil(pageItems.map((x: any) => x.to));
    const mergedDataWithProfiles = pageItems.map((x: any, i: number) => {
        return {
            ...x,
            from: fromProfiles[i],
            to: toProfiles[i]
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
        <div className={classnames(props.className)}>
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
