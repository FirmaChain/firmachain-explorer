import React from 'react';
import dynamic from '@/adapters/routing/dynamic';
import { Loading, NoData, Pagination } from '@components';
import { usePagination, useScreenSize } from '@hooks';
import { useProfilesRecoil } from '@recoil/profiles';
import classnames from 'classnames';
import * as R from 'ramda';

import { UnbondingsType } from '../../types';
import { useStyles } from './styles';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const Unbondings: React.FC<
    {
        unbondings: UnbondingsType;
    } & ComponentDefault
> = (props) => {
    const classes = useStyles();
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination({});
    const { isDesktop } = useScreenSize();

    const pageItems = R.pathOr([], ['unbondings', 'data', page], props);
    const dataProfiles = useProfilesRecoil(pageItems.map((x) => x.validator));
    const mergedDataWithProfiles = pageItems.map((x, i) => {
        return {
            ...x,
            validator: dataProfiles[i]
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
            <Pagination
                className={classes.paginate}
                total={props.unbondings.count}
                rowsPerPage={rowsPerPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default Unbondings;
