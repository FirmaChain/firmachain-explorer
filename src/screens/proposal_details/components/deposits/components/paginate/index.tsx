import { MouseEvent } from 'react';
import { Pagination } from '@components';
import { Box } from '@mui/material';

type Props = {
    total: number;
    page: number;
    rowsPerPage: number;
    handleChangePage: (_event: MouseEvent<HTMLButtonElement> | null, selectedRowsPerPage: number) => void;
    handleChangeRowsPerPage: (rowsPerPage: number) => void;
};

const Paginate = ({ total, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }: Props) => {
    return (
        <Box sx={{ mt: 3 }}>
            <Pagination
                total={total}
                rowsPerPage={rowsPerPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 25, 50, 100]}
            />
        </Box>
    );
};

export default Paginate;
