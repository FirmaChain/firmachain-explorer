import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { TablePagination } from '@mui/material';

import { Actions } from './components';

const Pagination: React.FC<{
    className?: string;
    total: number;
    rowsPerPage: number;
    rowsPerPageOptions?: number[];
    page: number;
    handleChangePage: (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => void;
    handleChangeRowsPerPage: (selectedRowsPerPage: number) => void;
}> = ({ className, total, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, rowsPerPageOptions }) => {
    const { t } = useTranslation('common');

    // hides pagination if the total items is less than
    // the rows per page option (default 10)
    if (total <= rowsPerPage) {
        return null;
    }

    return (
        <TablePagination
            className={className}
            sx={(theme) => ({
                '& .MuiTablePagination-spacer': {
                    display: 'none'
                },
                '& .MuiTablePagination-toolbar, & .MuiToolbar-gutters': {
                    p: 0,
                    m: 0,
                    flexDirection: 'column-reverse',
                    height: 'auto',
                    minHeight: 'initial'
                },
                '& .MuiTablePagination-displayedRows, & .MuiTablePagination-caption': {
                    flexShrink: 'initial',
                    alignSelf: 'flex-end',
                    mt: 2,
                    color: theme.palette.custom.fonts.fontThree,
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    lineHeight: 1.66,
                    letterSpacing: '0.03333em'
                },
                '& .pagination-mobile': {
                    [theme.breakpoints.up('md')]: {
                        display: 'none'
                    }
                },
                '& .pagination-tablet': {
                    display: 'none',
                    [theme.breakpoints.up('md')]: {
                        display: 'flex'
                    }
                },
                [theme.breakpoints.up('md')]: {
                    '& .MuiTablePagination-toolbar, & .MuiToolbar-gutters': {
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    },
                    '& .MuiTablePagination-displayedRows, & .MuiTablePagination-caption': {
                        mt: 0,
                        mr: 2
                    }
                }
            })}
            rowsPerPageOptions={[]}
            labelRowsPerPage=""
            labelDisplayedRows={({ from, to, count }) =>
                t('paginationLabelOne', {
                    from,
                    to,
                    count
                })
            }
            colSpan={6}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            ActionsComponent={(subProps) => {
                const additionalProps = {
                    rowsPerPageOptions,
                    handleChangeRowsPerPage
                };

                return (
                    <>
                        <Actions {...subProps} {...additionalProps} className="pagination-mobile" />
                        <Actions {...subProps} {...additionalProps} className="pagination-tablet" pageNeighbors={2} />
                    </>
                );
            }}
        />
    );
};

export default Pagination;
