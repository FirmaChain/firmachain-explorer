import React from 'react';
import dynamic from '@/adapters/routing/dynamic';
import { Loading, NoData, Pagination } from '@components';
import { usePagination, useScreenSize } from '@hooks';
import { useProfilesRecoil } from '@recoil/profiles';
import classnames from 'classnames';
import * as R from 'ramda';

import { RedelegationsType } from '../../types';
import { useStyles } from './styles';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const Redelegations: React.FC<
    {
        redelegations: RedelegationsType;
    } & ComponentDefault
> = (props) => {
    const { isDesktop } = useScreenSize();
    const classes = useStyles();
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination({});

    const pageItems = R.pathOr([], ['redelegations', 'data', page], props);

    const toProfiles = useProfilesRecoil(pageItems.map((x) => x.to));
    const addressProfiles = useProfilesRecoil(pageItems.map((x) => x.address));
    const mergedDataWithProfiles = pageItems.map((x, i) => {
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
        <div className={classnames(props.className)}>
            {component}
            <Pagination
                className={classes.paginate}
                total={props.redelegations.count}
                rowsPerPage={rowsPerPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 25, 50, 100]}
            />
        </div>
    );
};

export default Redelegations;
