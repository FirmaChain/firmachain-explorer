import { Box, Pagination } from '@components';
import { usePagination, useScreenSize } from '@hooks';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Desktop from './components/desktop';
import Mobile from './components/mobile';

const Connections = ({ data }: { data: ProfileConnectionType[] }) => {
    const { isDesktop } = useScreenSize();
    const { t } = useTranslation('accounts');
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, sliceItems } = usePagination({});
    const items = sliceItems(data);

    return (
        <Box
            sx={(theme) => ({
                '& .noWrap': {
                    whiteSpace: 'nowrap'
                },
                '& .paginate': {
                    mt: theme.spacing(2)
                }
            })}
        >
            <Typography variant="h2">{t('connectionsTitle')}</Typography>

            {isDesktop ? <Desktop items={items} className="noWrap" /> : <Mobile items={items} />}
            <Pagination
                className="paginate"
                total={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 25, 50, 100]}
            />
        </Box>
    );
};

export default Connections;
