import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import dynamic from '@/adapters/routing/dynamic';
import { Box } from '@components';
import { usePagination, useScreenSize } from '@hooks';
import { Typography } from '@mui/material';
import { useProfilesRecoil } from '@recoil/profiles';
import classnames from 'classnames';

import { Paginate } from './components';
import { useDeposits } from './hooks';
import { useStyles } from './styles';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const Deposits: React.FC<ComponentDefault> = (props) => {
    const { isDesktop } = useScreenSize();
    const { t } = useTranslation('proposals');
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, sliceItems } = usePagination({});
    const { state } = useDeposits();

    const classes = useStyles();

    let items = sliceItems(state.data);

    const dataProfiles = useProfilesRecoil(items.map((x) => x.user));
    items = items.map((x, i) => {
        return {
            ...x,
            user: dataProfiles[i]
        };
    });

    return (
        <Box className={classnames(props.className, classes.root)}>
            <Typography className={classes.title} variant="h2">
                {t('deposits')}
            </Typography>
            <div className={classes.list}>
                {isDesktop ? <Desktop className={classes.desktop} items={items} /> : <Mobile className={classes.mobile} items={items} />}
            </div>
            <Paginate
                total={state.data.length}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default Deposits;
