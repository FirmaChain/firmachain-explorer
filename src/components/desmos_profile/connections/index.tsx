import dynamic from '@/adapters/routing/dynamic';
import CloseIcon from '@assets/icon-close.svg?react';
import { Pagination } from '@components';
import { usePagination, useScreenSize } from '@hooks';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

interface Props {
    handleClose: () => void;
    open: boolean;
    data: ProfileConnectionType[];
}

const Connections = ({ handleClose, open, data }: Props) => {
    const { isDesktop } = useScreenSize();
    const { t } = useTranslation('accounts');
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, sliceItems } = usePagination({});
    const items = sliceItems(data);
    return (
        <Dialog
            maxWidth="xl"
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
            sx={{ '& .MuiDialog-paper': { width: '1000px' } }}
        >
            <DialogTitle
                disableTypography
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', '& .MuiIconButton-root': { p: 0 } }}
            >
                <Typography variant="h2">{t('connectionsTitle')}</Typography>
                <IconButton aria-label="close" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {isDesktop ? (
                    <div style={{ whiteSpace: 'nowrap' }}>
                        <Desktop items={items} />
                    </div>
                ) : (
                    <Mobile items={items} />
                )}
                <div style={{ marginTop: '16px' }}>
                    <Pagination
                        total={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        rowsPerPageOptions={[10, 25, 50, 100]}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Connections;
