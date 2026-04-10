import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import dynamic from '@/adapters/routing/dynamic';
import { Box } from '@components';
import { usePagination } from '@hooks';
import { Typography } from '@mui/material';
import { useProfilesRecoil } from '@zustand/profiles';

import { Paginate } from './components';
import { useDeposits } from './hooks';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const Deposits: React.FC<ComponentDefault> = (props) => {
    const { t } = useTranslation('proposals');
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, sliceItems } = usePagination({});
    const { state } = useDeposits();

    let items = sliceItems(state.data);

    const dataProfiles = useProfilesRecoil(items.map((x) => x.user));
    items = items.map((x, i) => {
        return {
            ...x,
            user: dataProfiles[i]
        };
    });

    return (
        <Box
            className={props.className}
            sx={(theme) => ({
                overflow: 'hidden',
                '& .title': {
                    mb: 2
                },
                '& .list': {
                    flex: 1,
                    width: '100%'
                },
                '& .mobile': {
                    [theme.breakpoints.up('lg')]: {
                        display: 'none'
                    }
                },
                '& .desktop': {
                    display: 'none',
                    width: '100%',
                    [theme.breakpoints.up('lg')]: {
                        display: 'block'
                    }
                }
            })}
        >
            <Typography className="title" variant="h2">
                {t('deposits')}
            </Typography>
            <div className="list">
                <Desktop className="desktop" items={items} />
                <Mobile className="mobile" items={items} />
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
