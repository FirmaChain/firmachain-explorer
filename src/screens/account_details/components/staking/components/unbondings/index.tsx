import { Loading, NoData, Pagination } from '@components';
import { usePagination, useScreenSize } from '@hooks';
import { Box } from '@mui/material';
import { useProfilesRecoil } from '@zustand/profiles';
import clsx from 'clsx';
import * as R from 'ramda';

import { UnbondingsType } from '../../types';
import Desktop from './components/desktop';
import Mobile from './components/mobile';

interface Props extends ComponentDefault {
    unbondings: UnbondingsType;
}

const Unbondings = (props: Props) => {
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination({});
    const { isDesktop } = useScreenSize();

    const pageItems = R.pathOr([], ['unbondings', 'data', page], props);
    const dataProfiles = useProfilesRecoil(pageItems.map((x: any) => x.validator));
    const mergedDataWithProfiles = pageItems.map((x: any, i: number) => {
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
        <div className={clsx(props.className)}>
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
