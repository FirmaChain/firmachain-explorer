import React from 'react';
import dynamic from '@/adapters/routing/dynamic';
import { Box, Pagination } from '@components';
import { usePagination, useScreenSize } from '@hooks';
import { Box as MuiBox, Typography } from '@mui/material';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { OtherTokenType } from '../../types';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

export const OtherTokens: React.FC<{
    className?: string;
    otherTokens: {
        data: OtherTokenType[];
        count: number;
    };
}> = ({ className, otherTokens }) => {
    const { t } = useTranslation('accounts');
    const { isDesktop } = useScreenSize();
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, sliceItems } = usePagination({});

    const { data } = otherTokens;
    const count = data.length;
    if (!data.length) {
        return null;
    }

    const items = sliceItems(data);

    return (
        <Box className={classnames(className)}>
            <Typography variant="h2">{t('otherTokens')}</Typography>

            {isDesktop ? (
                <MuiBox sx={{ display: { xs: 'none', lg: 'flex' }, width: '100%' }}>
                    <Desktop items={items} />
                </MuiBox>
            ) : (
                <MuiBox sx={{ display: { lg: 'none' } }}>
                    <Mobile items={items} />
                </MuiBox>
            )}
            <MuiBox sx={{ mt: 3 }}>
                <Pagination
                    total={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                />
            </MuiBox>
        </Box>
    );
};

export default OtherTokens;
